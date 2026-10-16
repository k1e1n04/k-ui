"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** 選択カードのプロパティ。 @default undefined */
export interface ChoiceCardProps {
  /** 選択肢の値。 @default undefined */
  value: string;
  /** 見出し。 @default undefined */
  title: React.ReactNode;
  /** 補足説明。 @default undefined */
  description?: React.ReactNode;
  /** アイコン。 @default undefined */
  icon?: React.ReactNode;
  /** 選択状態。 @default false */
  selected?: boolean;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 選択時の処理。 @default undefined */
  onSelect?: (value: string) => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * AI プランナーの選択肢などに使う大きいタップカード（§7.1）。
 * タップ領域は 44px 以上を確保する。
 */
export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  value,
  title,
  description,
  icon,
  selected = false,
  disabled = false,
  onSelect,
  className,
  ref,
}) => (
  <button
    type="button"
    ref={ref}
    aria-pressed={selected}
    disabled={disabled}
    onClick={() => onSelect?.(value)}
    className={cn(
      "flex min-h-11 w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
      selected
        ? "border-accent-main bg-accent-subtle"
        : "border-border bg-surface hover:bg-surface-raised",
      disabled && "cursor-not-allowed opacity-50",
      className,
    )}
  >
    {icon && (
      <span aria-hidden="true" className="shrink-0 text-2xl">
        {icon}
      </span>
    )}
    <span className="min-w-0">
      <span className="block font-medium text-foreground">{title}</span>
      {description && (
        <span className="mt-1 block text-sm text-muted">{description}</span>
      )}
    </span>
  </button>
);
