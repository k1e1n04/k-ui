"use client";

import { createContext, useContext } from "react";

import type { LatLng, Point } from "../../../utils/geo";

/** MapView が子要素へ提供する地図操作コンテキスト */
export interface MapContextValue {
  /** 現在の中心座標 */
  center: LatLng;
  /** 現在のズームレベル */
  zoom: number;
  /** 地図の表示サイズ（px） */
  size: { width: number; height: number };
  /** 緯度経度をコンテナ基準のスクリーン座標へ変換する */
  project: (latlng: LatLng) => Point;
  /** コンテナ基準のスクリーン座標を緯度経度へ変換する */
  unproject: (point: Point) => LatLng;
  /** 画面を基準に移動する（px） */
  panBy: (dx: number, dy: number) => void;
  /** ズームを相対変更する */
  zoomBy: (delta: number) => void;
  /** 指定ズームレベルへ変更する */
  setZoom: (zoom: number) => void;
}

export const MapContext = createContext<MapContextValue | null>(null);

/**
 * MapView のコンテキストを取得する。
 * MapView の外で使うとエラーになる。
 */
export function useMap(): MapContextValue {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap は MapView の子要素でのみ使用できます。");
  }
  return context;
}

/**
 * MapView のコンテキストを取得する。
 * MapView の外では null を返すため、任意連携に使える。
 */
export function useOptionalMap(): MapContextValue | null {
  return useContext(MapContext);
}
