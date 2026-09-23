"use client";

import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../../utils/cn";
import {
  clampZoom,
  type LatLng,
  type Point,
  project,
  TILE_SIZE,
  unproject,
} from "../../../utils/geo";
import {
  GSI_ATTRIBUTION,
  GSI_PALE_TILE_URL,
  type TileUrlBuilder,
} from "../../../utils/tiles";
import { MapContext, type MapContextValue } from "./MapContext";

/** 地図の中心座標の初期値（東京駅） */
export const DEFAULT_MAP_CENTER: LatLng = { lat: 35.681236, lng: 139.767125 };

/** タップ判定の移動許容ピクセル */
const TAP_THRESHOLD = 5;

export interface MapViewProps {
  /** 中心座標（制御用） */
  center?: LatLng;
  /** 中心座標の初期値（非制御用） */
  defaultCenter?: LatLng;
  /** ズームレベル（制御用） */
  zoom?: number;
  /** ズームレベルの初期値（非制御用） @default 14 */
  defaultZoom?: number;
  /** 最小ズーム。 @default 3 */
  minZoom?: number;
  /** 最大ズーム。 @default 19 */
  maxZoom?: number;
  /** 中心座標変更時 */
  onCenterChange?: (center: LatLng) => void;
  /** ズーム変更時 */
  onZoomChange?: (zoom: number) => void;
  /** 地図タップ時 */
  onTap?: (latlng: LatLng) => void;
  /**
   * タイル画像URLの生成関数。
   * 省略時は地理院タイル（淡色）を使用し、`null` でグリッド背景になる。
   * @default GSI_PALE_TILE_URL
   */
  tileUrl?: TileUrlBuilder | null;
  /** 出典表示。省略時はタイルに応じた既定値（地理院タイルなら「国土地理院」） */
  attribution?: React.ReactNode;
  /** 出典表示を表示するか。 @default true */
  showAttribution?: boolean;
  /** ドラッグ・ズーム操作を有効にするか。 @default true */
  interactive?: boolean;
  /** 高さ。 @default 400 */
  height?: number | string;
  /** マーカーなどの子要素 */
  children?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** アクセシブルなラベル。 @default "地図" */
  ariaLabel?: string;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  startOffset: Point;
  moved: boolean;
}

const resolveDimension = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

/**
 * 子要素（マーカーなど）を再レンダリングせずに親の transform だけで動かすための境界。
 *
 * ドラッグ中は `MapView` の offset が毎フレーム変化するが、`children` は参照が変わらないため
 * この `memo` が再レンダリングを抑止する。マーカー層は transform でまとめて移動する。
 */
const MapChildren = memo(function MapChildren({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
});

interface TileLayerGeometry {
  tileZoom: number;
  scale: number;
  minTileX: number;
  minTileY: number;
  layerX: number;
  layerY: number;
  cols: number;
  rows: number;
}

/**
 * タイル層の配置を計算する。
 *
 * タイルは常に TILE_SIZE(256px) の等身で層内に並べ、拡大縮小は層全体の `scale()` に任せる。
 * 各タイルを毎フレーム拡大縮小（小数px の width/height/left/top）していた旧実装では、
 * ピンチ中に「レイヤーの transform（コンポジタ）」と「タイルの再配置（メインスレッド）」が
 * 1 フレームずれて、高解像度のスマホ/PWA でタイルが裂ける・白く抜ける・縮尺が飛ぶ問題があった。
 */
function computeTileLayerGeometry(
  tileZoom: number,
  currentZoom: number,
  originX: number,
  originY: number,
  width: number,
  height: number,
): TileLayerGeometry {
  const scale = 2 ** (currentZoom - tileZoom);
  const scaledTile = TILE_SIZE * scale;
  const minTileX = Math.floor(originX / scaledTile);
  const minTileY = Math.floor(originY / scaledTile);
  return {
    tileZoom,
    scale,
    minTileX,
    minTileY,
    layerX: minTileX * scaledTile - originX,
    layerY: minTileY * scaledTile - originY,
    cols: Math.ceil(width / scaledTile) + 1,
    rows: Math.ceil(height / scaledTile) + 1,
  };
}

/**
 * タイル画像を 1 枚の GPU レイヤーに並べる。
 *
 * - タイル自身は 256px 固定。拡大縮小は親の `translate3d(...) scale(...)` 1つで表現する。
 * - `pointer-events: none` と `-webkit-touch-callout: none` で、iOS の画像長押し
 *   （保存メニュー）によるジェスチャ中断（pointercancel）を防ぐ。
 */
const TileLayer = memo(function TileLayer({
  url,
  geometry,
  testId,
}: {
  url: TileUrlBuilder;
  geometry: TileLayerGeometry;
  testId: string;
}) {
  const { tileZoom, scale, minTileX, minTileY, layerX, layerY, cols, rows } =
    geometry;

  const tiles = useMemo(() => {
    const count = 2 ** tileZoom;
    const result: React.ReactNode[] = [];
    for (let row = 0; row < rows; row += 1) {
      const y = minTileY + row;
      if (y < 0 || y >= count) continue;
      for (let col = 0; col < cols; col += 1) {
        const x = minTileX + col;
        const wrappedX = ((x % count) + count) % count;
        result.push(
          <img
            key={`${tileZoom}-${x}-${y}`}
            src={url(wrappedX, y, tileZoom)}
            alt=""
            draggable={false}
            className="pointer-events-none absolute select-none [-webkit-touch-callout:none]"
            style={{
              left: col * TILE_SIZE,
              top: row * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
          />,
        );
      }
    }
    return result;
  }, [url, tileZoom, minTileX, minTileY, cols, rows]);

  if (tiles.length === 0) return null;

  return (
    <div
      data-testid={testId}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 will-change-transform"
      style={{
        transform: `translate3d(${layerX}px, ${layerY}px, 0) scale(${scale})`,
        transformOrigin: "0 0",
      }}
    >
      {tiles}
    </div>
  );
});

/**
 * MapView コンポーネント
 *
 * 依存ライブラリなしで動作する地図キャンバス。
 * ドラッグでの移動（なぞる）、タップでの座標取得、ズーム操作に対応する。
 * 子要素に MapMarker を配置すると、緯度経度に追従して表示される。
 *
 * @example
 * <MapView
 *   center={{ lat: 35.68, lng: 139.76 }}
 *   onTap={(latlng) => console.log(latlng)}
 * >
 *   <MapMarker position={{ lat: 35.68, lng: 139.76 }} label="8.5万円" />
 * </MapView>
 */
export const MapView: React.FC<MapViewProps> = ({
  center,
  defaultCenter = DEFAULT_MAP_CENTER,
  zoom,
  defaultZoom = 14,
  minZoom = 3,
  maxZoom = 19,
  onCenterChange,
  onZoomChange,
  onTap,
  tileUrl,
  attribution,
  showAttribution = true,
  interactive = true,
  height = 400,
  children,
  className,
  ariaLabel = "地図",
}) => {
  const resolvedTileUrl = tileUrl === undefined ? GSI_PALE_TILE_URL : tileUrl;
  const resolvedAttribution =
    attribution !== undefined
      ? attribution
      : tileUrl === undefined || tileUrl === GSI_PALE_TILE_URL
        ? GSI_ATTRIBUTION
        : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const [innerCenter, setInnerCenter] = useState<LatLng>(defaultCenter);
  const [innerZoom, setInnerZoom] = useState<number>(defaultZoom);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const centerControlled = center !== undefined;
  const zoomControlled = zoom !== undefined;
  const currentCenter = center ?? innerCenter;
  const currentZoom = zoom ?? innerZoom;
  const centerControlledRef = useRef(centerControlled);
  centerControlledRef.current = centerControlled;
  const zoomControlledRef = useRef(zoomControlled);
  zoomControlledRef.current = zoomControlled;

  const viewRef = useRef({ center: currentCenter, zoom: currentZoom });
  viewRef.current = { center: currentCenter, zoom: currentZoom };
  const sizeRef = useRef(size);
  sizeRef.current = size;
  const offsetRef = useRef(offset);
  offsetRef.current = offset;
  const dragRef = useRef<DragState | null>(null);
  const pointersRef = useRef<Map<number, Point>>(new Map());
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);
  const boundsRef = useRef({ minZoom, maxZoom });
  boundsRef.current = { minZoom, maxZoom };
  const callbacksRef = useRef({
    onCenterChange,
    onZoomChange,
    onTap,
    interactive,
  });
  callbacksRef.current = { onCenterChange, onZoomChange, onTap, interactive };

  const worldCenter = useMemo(
    () => project(currentCenter, currentZoom),
    [currentCenter, currentZoom],
  );
  const worldCenterRef = useRef(worldCenter);
  worldCenterRef.current = worldCenter;

  const projectToScreen = useCallback((latlng: LatLng): Point => {
    const { center: c, zoom: z } = viewRef.current;
    const { width, height: h } = sizeRef.current;
    const wc = project(c, z);
    const wp = project(latlng, z);
    // ドラッグ中の offset は子要素を包むレイヤーの transform で表現するため、ここでは含めない。
    // これによりドラッグ中にマーカーを再計算せず、1つの transform で滑らかに追従できる。
    return {
      x: wp.x - wc.x + width / 2,
      y: wp.y - wc.y + h / 2,
    };
  }, []);

  const unprojectFromScreen = useCallback((point: Point): LatLng => {
    const { center: c, zoom: z } = viewRef.current;
    const { width, height: h } = sizeRef.current;
    const wc = project(c, z);
    const off = offsetRef.current;
    return unproject(
      {
        x: wc.x + point.x - width / 2 - off.x,
        y: wc.y + point.y - h / 2 - off.y,
      },
      z,
    );
  }, []);

  const commitView = useCallback(
    (nextCenter: LatLng | null, nextZoom: number | null) => {
      const { center: c, zoom: z } = viewRef.current;
      if (nextZoom !== null && nextZoom !== z && Number.isFinite(nextZoom)) {
        if (!zoomControlledRef.current) setInnerZoom(nextZoom);
        callbacksRef.current.onZoomChange?.(nextZoom);
      }
      if (
        nextCenter &&
        (nextCenter.lat !== c.lat || nextCenter.lng !== c.lng)
      ) {
        if (!centerControlledRef.current) setInnerCenter(nextCenter);
        callbacksRef.current.onCenterChange?.(nextCenter);
      }
    },
    [],
  );

  const panBy = useCallback(
    (dx: number, dy: number) => {
      const { center: c, zoom: z } = viewRef.current;
      const wc = project(c, z);
      const next = unproject({ x: wc.x + dx, y: wc.y + dy }, z);
      commitView(next, null);
    },
    [commitView],
  );

  const zoomAt = useCallback(
    (anchor: Point, nextZoomRaw: number) => {
      const { zoom: z } = viewRef.current;
      const { width, height: h } = sizeRef.current;
      const { minZoom: min, maxZoom: max } = boundsRef.current;
      const nextZoom = clampZoom(nextZoomRaw, min, max);
      if (nextZoom === z) return;
      const anchorLatLng = unprojectFromScreen(anchor);
      const anchorWorld = project(anchorLatLng, nextZoom);
      const nextCenter = unproject(
        {
          x: anchorWorld.x + width / 2 - anchor.x,
          y: anchorWorld.y + h / 2 - anchor.y,
        },
        nextZoom,
      );
      commitView(nextCenter, nextZoom);
    },
    [commitView, unprojectFromScreen],
  );

  const zoomBy = useCallback(
    (delta: number) => {
      const { zoom: z } = viewRef.current;
      const { width, height: h } = sizeRef.current;
      zoomAt({ x: width / 2, y: h / 2 }, z + delta);
    },
    [zoomAt],
  );

  const setZoomLevel = useCallback(
    (next: number) => {
      const { width, height: h } = sizeRef.current;
      zoomAt({ x: width / 2, y: h / 2 }, next);
    },
    [zoomAt],
  );

  // 表示サイズの計測
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize((prev) =>
        prev.width === rect.width && prev.height === rect.height
          ? prev
          : { width: rect.width, height: rect.height },
      );
    };
    update();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update);
      observer.observe(element);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ホイールズーム（passive:false で登録する）
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !interactive) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = element.getBoundingClientRect();
      const anchor = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      const { zoom: z } = viewRef.current;
      zoomAt(anchor, z + (event.deltaY < 0 ? 1 : -1));
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [interactive, zoomAt]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      // 進行中のドラッグ移動量を中心座標へ確定してからピンチを開始する
      const pending = offsetRef.current;
      if (pending.x !== 0 || pending.y !== 0) {
        const wc = worldCenterRef.current;
        commitView(
          unproject(
            { x: wc.x - pending.x, y: wc.y - pending.y },
            viewRef.current.zoom,
          ),
          null,
        );
        offsetRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
      }
      pinchRef.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        zoom: viewRef.current.zoom,
      };
      dragRef.current = null;
      return;
    }
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: { ...offsetRef.current },
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
    }
    // ピンチズーム
    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = Array.from(pointersRef.current.values());
      const nextDistance = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchRef.current.distance > 0) {
        const ratio = nextDistance / pinchRef.current.distance;
        const rect = containerRef.current?.getBoundingClientRect();
        const anchor = {
          x: (a.x + b.x) / 2 - (rect?.left ?? 0),
          y: (a.y + b.y) / 2 - (rect?.top ?? 0),
        };
        zoomAt(anchor, pinchRef.current.zoom + Math.log2(ratio));
      }
      return;
    }
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > TAP_THRESHOLD) drag.moved = true;
    const nextOffset = {
      x: drag.startOffset.x + dx,
      y: drag.startOffset.y + dy,
    };
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;

    if (!drag || drag.pointerId !== event.pointerId) {
      dragRef.current = null;
      if (offsetRef.current.x !== 0 || offsetRef.current.y !== 0) {
        offsetRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
      }
      return;
    }
    dragRef.current = null;
    const currentOffset = offsetRef.current;
    offsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });

    if (drag.moved) {
      const wc = worldCenterRef.current;
      commitView(
        unproject(
          { x: wc.x - currentOffset.x, y: wc.y - currentOffset.y },
          viewRef.current.zoom,
        ),
        null,
      );
      return;
    }
    // タップ判定
    if (!callbacksRef.current.interactive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const point = {
      x: event.clientX - (rect?.left ?? 0),
      y: event.clientY - (rect?.top ?? 0),
    };
    callbacksRef.current.onTap?.(unprojectFromScreen(point));
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    dragRef.current = null;
    offsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const step = 100;
    switch (event.key) {
      case "ArrowUp":
        panBy(0, -step);
        break;
      case "ArrowDown":
        panBy(0, step);
        break;
      case "ArrowLeft":
        panBy(-step, 0);
        break;
      case "ArrowRight":
        panBy(step, 0);
        break;
      case "+":
      case "=":
        zoomBy(1);
        break;
      case "-":
      case "_":
        zoomBy(-1);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  // タイルの描画範囲を計算
  // ドラッグ中の offset は「指の移動量」で、確定後の中心は worldCenter - offset になる。
  // プレビューを確定後と一致させる（＝離した瞬間に飛ばないようにする）ため、ここでは offset を引く。
  const originX = worldCenter.x - size.width / 2 - offset.x;
  const originY = worldCenter.y - size.height / 2 - offset.y;

  // タイルの解像度は最寄りの整数ズーム。小数ズームは層全体の scale で表現する。
  const tileZoom = clampZoom(Math.round(currentZoom), 0, 19);
  const baseTileZoom = Math.max(0, tileZoom - 1);
  const hasSize = size.width > 0 && size.height > 0;
  const detailLayer = hasSize
    ? computeTileLayerGeometry(
        tileZoom,
        currentZoom,
        originX,
        originY,
        size.width,
        size.height,
      )
    : null;
  // 1 段低いズームを下敷きに描く。上位ズームのタイルが届くまでの一瞬の白抜けを埋める。
  const baseLayer =
    hasSize && baseTileZoom < tileZoom
      ? computeTileLayerGeometry(
          baseTileZoom,
          currentZoom,
          originX,
          originY,
          size.width,
          size.height,
        )
      : null;

  const contextValue = useMemo<MapContextValue>(
    () => ({
      center: currentCenter,
      zoom: currentZoom,
      size,
      project: projectToScreen,
      unproject: unprojectFromScreen,
      panBy,
      zoomBy,
      setZoom: setZoomLevel,
    }),
    [
      currentCenter,
      currentZoom,
      size,
      projectToScreen,
      unprojectFromScreen,
      panBy,
      zoomBy,
      setZoomLevel,
    ],
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        role="application"
        aria-label={ariaLabel}
        tabIndex={interactive ? 0 : -1}
        data-testid="map-view"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        style={{ height: resolveDimension(height) }}
        className={cn(
          "relative w-full select-none overflow-hidden bg-surface-sunken outline-none",
          "[-webkit-touch-callout:none]",
          "focus-visible:ring-2 focus-visible:ring-info-main",
          interactive ? "cursor-grab touch-none" : "cursor-default",
          className,
        )}
      >
        {/* 背景グリッド（タイルを null にした場合） */}
        {!resolvedTileUrl && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--kui-color-border) 1px, transparent 1px), linear-gradient(90deg, var(--kui-color-border) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              backgroundPosition: `${-originX}px ${-originY}px`,
            }}
          />
        )}
        {resolvedTileUrl && baseLayer && (
          <TileLayer
            url={resolvedTileUrl}
            geometry={baseLayer}
            testId="map-tiles-base"
          />
        )}
        {resolvedTileUrl && detailLayer && (
          <TileLayer
            url={resolvedTileUrl}
            geometry={detailLayer}
            testId="map-tiles"
          />
        )}
        {/*
          マーカーなどの子要素は offset を transform でまとめて移動する。
          MapChildren は memo 化されているため、ドラッグ中に offset が変わっても
          子要素は再レンダリングされず、1つの transform だけで滑らかに追従する。
        */}
        <div
          data-testid="map-content"
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          }}
        >
          <MapChildren>{children}</MapChildren>
        </div>
        {showAttribution && resolvedTileUrl && resolvedAttribution && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 bg-surface/80 px-1.5 py-0.5 text-[10px] leading-tight text-muted">
            出典: {resolvedAttribution}
          </div>
        )}
      </div>
    </MapContext.Provider>
  );
};
