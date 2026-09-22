"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** お気に入りボタンのサイズ */
export type FavoriteButtonSize = "sm" | "md" | "lg";

export interface FavoriteButtonProps {
  /** お気に入り状態 */
  favorite: boolean;
  /** 状態変更時の処理 */
  onChange: (favorite: boolean) => void;
  /** アクセシブルなラベル（対象名） */
  label?: string;
  /** サイズ。 @default "md" */
  size?: FavoriteButtonSize;
  /** 無効状態 */
  disabled?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

const sizeStyles: Record<FavoriteButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

const iconSizeStyles: Record<FavoriteButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

/**
 * FavoriteButton コンポーネント
 *
 * 物件のお気に入り登録をトグルするハートボタン。
 *
 * @example
 * <FavoriteButton favorite={favorite} onChange={setFavorite} label="この物件" />
 */
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  favorite,
  onChange,
  label = "お気に入り",
  size = "md",
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={favorite}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        if (!disabled) onChange(!favorite);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border bg-surface/90 transition-colors",
        "hover:bg-surface-sunken focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main",
        sizeStyles[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
        className={cn(
          iconSizeStyles[size],
          favorite ? "text-accent-main" : "text-muted",
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.6c0 5.25-7.5 10.15-9 11.4-1.5-1.25-9-6.15-9-11.4a5 5 0 0 1 9-3.16A5 5 0 0 1 21 8.6Z"
        />
      </svg>
    </button>
  );
};
