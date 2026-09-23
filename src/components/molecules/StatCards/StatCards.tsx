"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** カードの色テーマ */
export type StatCardColor =
  | "blue"
  | "green"
  | "purple"
  | "red"
  | "yellow"
  | "gray";

/** 個々のカードデータ */
export interface StatCardItem {
  /** カードのラベル */
  label: string;
  /** 表示する値 */
  value: string | number;
  /** 色テーマ */
  color?: StatCardColor;
}

export interface StatCardsProps {
  /** カードデータの配列 */
  cards: StatCardItem[];
  /** 値のフォーマッター */
  formatValue?: (value: string | number) => string;
  /** グリッドのカラム数 */
  columns?: 1 | 2 | 3 | 4;
  /** 追加のクラス名 */
  className?: string;
}

/** カラーに応じたスタイル */
const colorStyles: Record<StatCardColor, { bg: string; accent: string }> = {
  blue: {
    bg: "bg-info-subtle",
    accent: "border-l-info-main",
  },
  green: {
    bg: "bg-success-subtle",
    accent: "border-l-success-main",
  },
  purple: {
    bg: "bg-accent-subtle",
    accent: "border-l-accent-main",
  },
  red: {
    bg: "bg-danger-subtle",
    accent: "border-l-danger-main",
  },
  yellow: {
    bg: "bg-warning-subtle",
    accent: "border-l-warning-main",
  },
  gray: {
    bg: "bg-surface-raised",
    accent: "border-l-border-strong",
  },
};

/** グリッドカラムクラス */
const columnStyles: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

/** デフォルトのフォーマッター */
const defaultFormatValue = (value: string | number) => String(value);

/**
 * 統計カードコンポーネント
 */
export const StatCards: React.FC<StatCardsProps> = ({
  cards,
  formatValue = defaultFormatValue,
  columns = 3,
  className,
}) => {
  return (
    <div className={cn("grid gap-4", columnStyles[columns], className)}>
      {cards.map((card) => {
        const color = card.color ?? "blue";
        const styles = colorStyles[color];
        return (
          <div
            key={card.label}
            className={cn(
              "rounded-lg border border-border border-l-4 p-4",
              styles.bg,
              styles.accent,
            )}
          >
            <h3 className="mb-1 text-sm font-medium text-muted">
              {card.label}
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {formatValue(card.value)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
