"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";

/** カレンダーのプロパティ。 @default undefined */
export interface CalendarProps {
  /** 選択中の日付（YYYY-MM-DD）。 @default undefined */
  value?: string;
  /** 日付選択時の通知。 @default undefined */
  onChange: (value: string) => void;
  /** 表示する初期月（YYYY-MM-DD）。 @default undefined */
  defaultMonth?: string;
  /** 選択可能な最小日付（YYYY-MM-DD）。 @default undefined */
  minDate?: string;
  /** 選択可能な最大日付（YYYY-MM-DD）。 @default undefined */
  maxDate?: string;
  /** 個別に日付を無効化する関数。 @default undefined */
  disabledDate?: (date: string) => boolean;
  /** 曜日の先頭。 @default 0 */
  weekStartsOn?: 0 | 1;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];
const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const toMonthDate = (value?: string) =>
  value ? new Date(`${value}T00:00:00`) : new Date();

/**
 * 月送りと日付範囲制限に対応するカレンダー。
 *
 * @default undefined
 */
export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  defaultMonth,
  minDate,
  maxDate,
  disabledDate,
  weekStartsOn = 0,
  className,
}) => {
  const [month, setMonth] = useState(() => toMonthDate(value ?? defaultMonth));
  useEffect(() => {
    if (value) setMonth(toMonthDate(value));
  }, [value]);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const offset = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const days = Array.from(
    { length: 42 },
    (_, index) => new Date(year, monthIndex, index - offset + 1),
  );
  const isDisabled = (key: string) =>
    Boolean(
      (minDate && key < minDate) ||
        (maxDate && key > maxDate) ||
        disabledDate?.(key),
    );
  const canMove = (delta: number) => {
    const target = new Date(year, monthIndex + delta, 1);
    const start = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}-01`;
    const end = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}-31`;
    return !(minDate && end < minDate) && !(maxDate && start > maxDate);
  };
  const labels = Array.from(
    { length: 7 },
    (_, index) => weekLabels[(index + weekStartsOn) % 7],
  );
  return (
    <div
      className={cn("w-72 rounded-md bg-surface text-foreground", className)}
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="前の月"
          disabled={!canMove(-1)}
          onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}
          className="rounded p-2 hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50"
        >
          ‹
        </button>
        <span className="font-medium">
          {year}年{monthIndex + 1}月
        </span>
        <button
          type="button"
          aria-label="次の月"
          disabled={!canMove(1)}
          onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}
          className="rounded p-2 hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-muted">
        {labels.map((label) => (
          <span key={label} className="py-1">
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => {
          const key = toDateKey(date);
          const outside = date.getMonth() !== monthIndex;
          const disabled = isDisabled(key);
          return (
            <button
              key={key}
              type="button"
              aria-label={key}
              aria-pressed={key === value}
              disabled={disabled}
              onClick={() => !disabled && onChange(key)}
              className={cn(
                "rounded p-2 text-sm transition-colors hover:bg-surface-sunken focus:outline-none focus:ring-2 focus:ring-info-main",
                outside && "text-muted",
                key === value &&
                  "bg-primary-main text-inverse hover:bg-primary-main",
                disabled &&
                  "cursor-not-allowed opacity-40 hover:bg-transparent",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
