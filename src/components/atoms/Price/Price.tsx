"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** 価格の表示形式 */
export type PriceFormat = "man" | "yen";

/** 価格のサイズ */
export type PriceSize = "sm" | "md" | "lg";

/** 価格のトーン */
export type PriceTone = "default" | "primary" | "accent" | "muted";

export interface PriceProps {
  /** 金額（円） */
  value: number;
  /** 表示形式。man は「万円」、yen は「¥」表記。 @default "man" */
  format?: PriceFormat;
  /** サイズ。 @default "md" */
  size?: PriceSize;
  /** トーン。 @default "default" */
  tone?: PriceTone;
  /** 金額の後ろに付ける単位（例: /月） */
  unit?: React.ReactNode;
  /** 補足テキスト（管理費など） */
  caption?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** ルート要素への ref */
  ref?: React.Ref<HTMLSpanElement>;
}

const sizeStyles: Record<PriceSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

const toneStyles: Record<PriceTone, string> = {
  default: "text-foreground",
  primary: "text-primary-main",
  accent: "text-accent-main",
  muted: "text-muted",
};

/** 金額を「万円」表記へ変換する */
export function formatManYen(value: number): string {
  const man = value / 10000;
  const rounded = Math.round(man * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${text}万円`;
}

/** 金額を「¥」表記へ変換する */
export function formatYen(value: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Price コンポーネント
 *
 * 賃料・管理費などの金額を統一フォーマットで表示する。
 *
 * @example
 * <Price value={85000} caption="管理費 5,000円" />
 */
export const Price: React.FC<PriceProps> = ({
  value,
  format = "man",
  size = "md",
  tone = "default",
  unit,
  caption,
  className,
  ref,
}) => {
  const formatted = format === "yen" ? formatYen(value) : formatManYen(value);

  return (
    <span ref={ref} className={cn("inline-flex flex-col", className)}>
      <span
        className={cn(
          "font-bold tabular-nums leading-tight",
          sizeStyles[size],
          toneStyles[tone],
        )}
      >
        {formatted}
        {unit && (
          <span className="ml-0.5 text-xs font-medium text-muted">{unit}</span>
        )}
      </span>
      {caption && <span className="text-xs text-muted">{caption}</span>}
    </span>
  );
};
