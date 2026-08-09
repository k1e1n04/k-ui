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
const colorStyles: Record<
  StatCardColor,
  { bg: string; text: string; border: string }
> = {
  blue: {
    bg: "bg-info-subtle",
    text: "text-info-main",
    border: "border-info-main",
  },
  green: {
    bg: "bg-success-subtle",
    text: "text-success-main",
    border: "border-success-main",
  },
  purple: {
    bg: "bg-accent-subtle",
    text: "text-accent-main",
    border: "border-accent-main",
  },
  red: {
    bg: "bg-danger-subtle",
    text: "text-danger-main",
    border: "border-danger-main",
  },
  yellow: {
    bg: "bg-warning-subtle",
    text: "text-warning-main",
    border: "border-warning-main",
  },
  gray: {
    bg: "bg-surface-raised",
    text: "text-foreground",
    border: "border-border",
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
            className={cn("border rounded-lg p-4", styles.bg, styles.border)}
          >
            <h3 className={cn("text-sm font-medium mb-1", styles.text)}>
              {card.label}
            </h3>
            <p className={cn("text-2xl font-bold", styles.text)}>
              {formatValue(card.value)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
