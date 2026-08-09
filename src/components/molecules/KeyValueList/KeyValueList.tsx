"use client";

import type React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../utils/cn";

/** KeyValueList のレイアウト */
export type KeyValueListLayout = "horizontal" | "vertical";

/** KeyValueList のサイズ */
export type KeyValueListSize = "sm" | "md";

/** KeyValueList のトーン */
export type KeyValueListTone = "default" | "success" | "danger";

/** キー・バリューの項目 */
export interface KeyValueItem {
  /** ラベル */
  key: ReactNode;
  /** 値 */
  value: ReactNode;
  /** トーン（値のスタイリングに適用） */
  tone?: KeyValueListTone;
}

export interface KeyValueListProps {
  /** 表示する項目リスト */
  items: KeyValueItem[];
  /** レイアウト */
  layout?: KeyValueListLayout;
  /** サイズ */
  size?: KeyValueListSize;
  /** 区切り線を表示するか */
  separator?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

/** トーンに応じた値のスタイル */
const toneStyles: Record<KeyValueListTone, string> = {
  default: "text-foreground",
  success: "text-success-main",
  danger: "text-danger-main",
};

/** サイズに応じたフォントスタイル */
const keySizeStyles: Record<KeyValueListSize, string> = {
  sm: "text-xs",
  md: "text-sm",
};

const valueSizeStyles: Record<KeyValueListSize, string> = {
  sm: "text-xs",
  md: "text-sm",
};

/** サイズに応じたパディング */
const itemPaddingStyles: Record<KeyValueListSize, string> = {
  sm: "py-1.5",
  md: "py-2",
};

/**
 * キー・バリューリストコンポーネント
 *
 * label/value 行を統一的に表示するためのリスト。
 * 比較・サマリー表示などに使用する。
 */
export const KeyValueList: React.FC<KeyValueListProps> = ({
  items,
  layout = "horizontal",
  size = "md",
  separator = false,
  className,
}) => {
  return (
    <dl
      className={cn("w-full", separator && "divide-y divide-border", className)}
    >
      {items.map((item) => (
        <div
          key={String(item.key)}
          className={cn(
            itemPaddingStyles[size],
            layout === "horizontal"
              ? "flex items-baseline justify-between gap-4"
              : "flex flex-col gap-0.5",
          )}
        >
          <dt className={cn("text-muted shrink-0", keySizeStyles[size])}>
            {item.key}
          </dt>
          <dd
            className={cn(
              "font-medium",
              valueSizeStyles[size],
              toneStyles[item.tone ?? "default"],
              layout === "horizontal" && "text-right",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
