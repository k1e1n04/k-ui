"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { useOptionalMap } from "../MapView/MapContext";

/** コントロールの配置位置 */
export type MapControlsPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface MapControlsProps {
  /** ズームイン時の処理（省略時は MapView に連携） */
  onZoomIn?: () => void;
  /** ズームアウト時の処理（省略時は MapView に連携） */
  onZoomOut?: () => void;
  /** リセット時の処理 */
  onReset?: () => void;
  /** 現在地取得時の処理（指定時のみボタンを表示） */
  onLocate?: () => void;
  /** リセットボタンを表示するか。 @default false */
  showReset?: boolean;
  /** 配置位置。 @default "bottom-right" */
  position?: MapControlsPosition;
  /** 追加のクラス名 */
  className?: string;
}

const positionStyles: Record<MapControlsPosition, string> = {
  "top-left": "left-3 top-3",
  "top-right": "right-3 top-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

const buttonClass = cn(
  "inline-flex h-9 w-9 items-center justify-center bg-surface text-foreground transition-colors",
  "hover:bg-surface-sunken focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info-main",
  "disabled:cursor-not-allowed disabled:opacity-40",
);

const iconClass = "h-4 w-4";

/**
 * MapControls コンポーネント
 *
 * 地図のズーム・リセット・現在地ボタンをまとめたコントロール。
 * MapView の子要素として置くと、操作が自動で連携される。
 *
 * @example
 * <MapView center={center}>
 *   <MapControls showReset onReset={reset} onLocate={locate} />
 * </MapView>
 */
export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onLocate,
  showReset = false,
  position = "bottom-right",
  className,
}) => {
  const map = useOptionalMap();
  const handleZoomIn = onZoomIn ?? (map ? () => map.zoomBy(1) : undefined);
  const handleZoomOut = onZoomOut ?? (map ? () => map.zoomBy(-1) : undefined);

  return (
    <fieldset
      aria-label="地図操作"
      className={cn(
        "absolute z-20 m-0 inline-flex min-w-0 flex-col overflow-hidden rounded-md border border-border p-0 shadow-md",
        positionStyles[position],
        className,
      )}
    >
      <button
        type="button"
        aria-label="拡大"
        disabled={!handleZoomIn}
        onClick={handleZoomIn}
        className={cn(buttonClass, "border-b border-border")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          className={iconClass}
        >
          <path strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="縮小"
        disabled={!handleZoomOut}
        onClick={handleZoomOut}
        className={cn(
          buttonClass,
          showReset || onLocate ? "border-b border-border" : "",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          className={iconClass}
        >
          <path strokeLinecap="round" d="M5 12h14" />
        </svg>
      </button>
      {showReset && (
        <button
          type="button"
          aria-label="表示をリセット"
          disabled={!onReset}
          onClick={onReset}
          className={cn(buttonClass, onLocate ? "border-b border-border" : "")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
            className={iconClass}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
            />
          </svg>
        </button>
      )}
      {onLocate && (
        <button
          type="button"
          aria-label="現在地へ移動"
          onClick={onLocate}
          className={buttonClass}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
            className={iconClass}
          >
            <circle cx="12" cy="12" r="3.5" />
            <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>
      )}
    </fieldset>
  );
};
