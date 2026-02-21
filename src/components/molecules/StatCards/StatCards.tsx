"use client";

import React from "react";

import { cn } from "../../../utils/cn";

/** カードの色テーマ */
export type StatCardColor = "blue" | "green" | "purple" | "red" | "yellow" | "gray";

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
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200 dark:border-green-800",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-200 dark:border-purple-800",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-200",
    border: "border-red-200 dark:border-red-800",
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-200",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  gray: {
    bg: "bg-gray-50 dark:bg-gray-800",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-gray-200 dark:border-gray-700",
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
              "border rounded-lg p-4",
              styles.bg,
              styles.border
            )}
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
