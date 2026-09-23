"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** 星評価のサイズ */
export type RatingSize = "sm" | "md" | "lg";

export interface RatingProps {
  /** 現在の評価値 */
  value: number;
  /** 最大値 */
  max?: number;
  /** 値変更時の処理（指定すると操作可能になる） */
  onChange?: (value: number) => void;
  /** 読み取り専用にするか */
  readOnly?: boolean;
  /** サイズ */
  size?: RatingSize;
  /** アクセシブルなラベル */
  label?: string;
  /** 数値を併記するか */
  showValue?: boolean;
  /** 追加のクラス名 */
  className?: string;
  /** ルート要素への ref */
  ref?: React.Ref<HTMLElement>;
}

const sizeStyles: Record<RatingSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const textSizeStyles: Record<RatingSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({
  filled,
  className,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11 5.52.44a.56.56 0 0 1 .32.99l-4.2 3.6 1.28 5.38a.56.56 0 0 1-.84.61L12 16.94l-4.73 2.69a.56.56 0 0 1-.84-.61l1.28-5.38-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44Z"
    />
  </svg>
);

/**
 * Rating コンポーネント
 *
 * 物件のレビュー評価などを星で表示・入力する。
 *
 * @example
 * <Rating value={4} readOnly />
 *
 * @example
 * <Rating value={value} onChange={setValue} />
 */
export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  size = "md",
  label = "評価",
  showValue = false,
  className,
  ref,
}) => {
  const interactive = Boolean(onChange) && !readOnly;
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  const content = stars.map((star) => {
    const filled = star <= Math.round(value);
    const starIcon = (
      <StarIcon
        filled={filled}
        className={cn(
          sizeStyles[size],
          filled ? "text-accent-main" : "text-border-strong",
        )}
      />
    );

    if (!interactive) {
      return (
        <span key={star} className="inline-flex" aria-hidden="true">
          {starIcon}
        </span>
      );
    }

    return (
      <button
        key={star}
        type="button"
        aria-label={`${label} ${star}`}
        aria-pressed={star <= Math.round(value)}
        onClick={() => onChange?.(star)}
        className="inline-flex rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main"
      >
        {starIcon}
      </button>
    );
  });

  const valueLabel = showValue ? (
    <span
      className={cn("ml-1 font-medium text-foreground", textSizeStyles[size])}
    >
      {value.toFixed(1)}
    </span>
  ) : null;

  if (interactive) {
    return (
      <fieldset
        ref={ref as React.Ref<HTMLFieldSetElement>}
        className={cn(
          "m-0 inline-flex items-center gap-1 border-0 p-0",
          className,
        )}
      >
        <legend className="sr-only">{label}</legend>
        {content}
        {valueLabel}
      </fieldset>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`${label} ${value} / ${max}`}
    >
      {content}
      {valueLabel}
    </span>
  );
};
