"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";

/** 日付ピッカーのプロパティ。 @default undefined */
export interface DatePickerProps {
  /** 選択中の日付。 @default "" */
  value?: string;
  /** 日付変更時の処理。 @default undefined */
  onChange: (value: string) => void;
  /** 選択可能な最小日付。 @default undefined */
  minDate?: string;
  /** 選択可能な最大日付。 @default undefined */
  maxDate?: string;
  /** 個別に日付を無効化する関数。 @default undefined */
  disabledDate?: (date: string) => boolean;
  /** 未選択時の表示。 @default "YYYY-MM-DD" */
  placeholder?: string;
  /** クリアボタンを表示するか。 @default false */
  clearable?: boolean;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** カレンダー選択と入力表示をまとめた日付ピッカー。 @default undefined */
export const DatePicker: React.FC<DatePickerProps> = ({
  value = "",
  onChange,
  minDate,
  maxDate,
  disabledDate,
  placeholder = "YYYY-MM-DD",
  clearable = false,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button
            type="button"
            aria-label="カレンダーを開く"
            disabled={disabled}
            className="flex min-w-44 items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 text-left text-foreground hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={value ? undefined : "text-muted"}>
              {value || placeholder}
            </span>
            <span aria-hidden="true">▣</span>
          </button>
        }
      >
        <Calendar
          value={value || undefined}
          onChange={(next) => {
            onChange(next);
            setOpen(false);
          }}
          minDate={minDate}
          maxDate={maxDate}
          disabledDate={disabledDate}
        />
      </Popover>
      {clearable && value && (
        <button
          type="button"
          aria-label="クリア"
          onClick={() => onChange("")}
          className="rounded p-2 text-muted hover:bg-surface-sunken hover:text-foreground"
        >
          ×
        </button>
      )}
    </div>
  );
};
