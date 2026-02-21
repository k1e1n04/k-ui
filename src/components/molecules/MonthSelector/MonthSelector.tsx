"use client";

import React from "react";

import { cn } from "../../../utils/cn";

export interface MonthSelectorProps {
  /** 選択中の月（YYYY-MM形式） */
  selectedMonth: string;
  /** 月変更コールバック */
  onMonthChange: (month: string) => void;
  /** 選択可能な最小年 */
  minYear?: number;
  /** 選択可能な最大年 */
  maxYear?: number;
  /** 月ラベルのフォーマッター */
  formatLabel?: (year: number, month: number) => string;
  /** 前の月ボタンのaria-label */
  prevLabel?: string;
  /** 次の月ボタンのaria-label */
  nextLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

/** デフォルトのラベルフォーマッター */
const defaultFormatLabel = (year: number, month: number) =>
  `${year}-${String(month).padStart(2, "0")}`;

/**
 * 月選択コンポーネント
 */
export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
  minYear = 2020,
  maxYear,
  formatLabel = defaultFormatLabel,
  prevLabel = "Previous month",
  nextLabel = "Next month",
  className,
}) => {
  const [year, month] = selectedMonth.split("-");
  const resolvedMaxYear = maxYear ?? new Date().getFullYear() + 2;

  const generateMonthOptions = () => {
    const months = [];
    for (let y = minYear; y <= resolvedMaxYear; y++) {
      for (let m = 1; m <= 12; m++) {
        const monthStr = `${y}-${String(m).padStart(2, "0")}`;
        months.push({
          value: monthStr,
          label: formatLabel(y, m),
        });
      }
    }
    return months.reverse();
  };

  const monthOptions = generateMonthOptions();

  const handlePrevMonth = () => {
    const currentDate = new Date(`${year}-${month}-01`);
    currentDate.setMonth(currentDate.getMonth() - 1);
    const newMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

    if (currentDate.getFullYear() >= minYear) {
      onMonthChange(newMonth);
    }
  };

  const handleNextMonth = () => {
    const currentDate = new Date(`${year}-${month}-01`);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const newMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

    if (currentDate.getFullYear() <= resolvedMaxYear) {
      onMonthChange(newMonth);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={handlePrevMonth}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={prevLabel}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {monthOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleNextMonth}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={nextLabel}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
