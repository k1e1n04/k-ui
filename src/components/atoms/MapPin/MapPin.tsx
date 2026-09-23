"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** ピンのトーン */
export type MapPinTone = "primary" | "accent" | "success" | "danger" | "muted";

/** ピンのサイズ */
export type MapPinSize = "sm" | "md" | "lg";

export interface MapPinProps {
  /** ピンに表示するラベル（価格など） */
  label?: React.ReactNode;
  /** トーン。 @default "primary" */
  tone?: MapPinTone;
  /** サイズ。 @default "md" */
  size?: MapPinSize;
  /** 選択状態 */
  selected?: boolean;
  /** 追加のクラス名 */
  className?: string;
  /** ルート要素への ref */
  ref?: React.Ref<HTMLSpanElement>;
}

const toneStyles: Record<MapPinTone, string> = {
  primary: "bg-primary-main text-inverse",
  accent: "bg-accent-main text-inverse",
  success: "bg-success-main text-inverse",
  danger: "bg-danger-main text-inverse",
  muted: "bg-surface text-foreground border border-border-strong",
};

const dotToneStyles: Record<MapPinTone, string> = {
  primary: "bg-primary-main",
  accent: "bg-accent-main",
  success: "bg-success-main",
  danger: "bg-danger-main",
  muted: "bg-surface-sunken border border-border-strong",
};

const sizeStyles: Record<MapPinSize, string> = {
  sm: "min-w-7 h-6 px-2 text-xs",
  md: "min-w-9 h-8 px-2.5 text-sm",
  lg: "min-w-11 h-10 px-3 text-base",
};

const dotSizeStyles: Record<MapPinSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

/**
 * MapPin コンポーネント
 *
 * 地図上のマーカーに使う吹き出し型のピン。価格などをラベル表示できる。
 *
 * @example
 * <MapPin label="8.5万円" tone="accent" selected />
 */
export const MapPin: React.FC<MapPinProps> = ({
  label,
  tone = "primary",
  size = "md",
  selected = false,
  className,
  ref,
}) => {
  return (
    <span
      ref={ref}
      className={cn("relative inline-flex flex-col items-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold shadow-md transition-transform",
          toneStyles[tone],
          sizeStyles[size],
          selected && "ring-2 ring-accent-main ring-offset-1 scale-105",
        )}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "-mt-1 h-2 w-2 rotate-45",
          tone === "muted" ? "bg-surface" : dotToneStyles[tone],
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 rounded-full shadow-sm",
          dotSizeStyles[size],
          dotToneStyles[tone],
        )}
      />
    </span>
  );
};
