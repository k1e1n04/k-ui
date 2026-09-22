"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import type { LatLng } from "../../../utils/geo";
import { MapPin, type MapPinSize, type MapPinTone } from "../../atoms/MapPin";
import { useMap } from "../MapView/MapContext";

export interface MapMarkerProps {
  /** マーカーの位置 */
  position: LatLng;
  /** ピンに表示するラベル（価格など） */
  label?: React.ReactNode;
  /** カスタムマーカー内容（指定時は MapPin を置き換える） */
  children?: React.ReactNode;
  /** トーン */
  tone?: MapPinTone;
  /** サイズ */
  size?: MapPinSize;
  /** 選択状態 */
  selected?: boolean;
  /** クリック時の処理 */
  onClick?: () => void;
  /** アクセシブルなラベル */
  ariaLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * MapMarker コンポーネント
 *
 * MapView の子要素として配置し、緯度経度に追従するマーカー。
 *
 * @example
 * <MapView center={center}>
 *   <MapMarker position={center} label="8.5万円" onClick={handleClick} />
 * </MapView>
 */
export const MapMarker: React.FC<MapMarkerProps> = ({
  position,
  label,
  children,
  tone = "accent",
  size = "md",
  selected = false,
  onClick,
  ariaLabel,
  className,
}) => {
  const map = useMap();
  const point = map.project(position);
  const accessibleName =
    ariaLabel ?? (typeof label === "string" ? label : "マーカー");

  return (
    <button
      type="button"
      aria-label={accessibleName}
      aria-pressed={selected}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      style={{
        left: point.x,
        top: point.y,
        transform: "translate(-50%, -100%)",
      }}
      className={cn(
        "absolute z-10 inline-flex cursor-pointer flex-col items-center border-0 bg-transparent p-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main focus-visible:ring-offset-2",
        className,
      )}
    >
      {children ?? (
        <MapPin label={label} tone={tone} size={size} selected={selected} />
      )}
    </button>
  );
};
