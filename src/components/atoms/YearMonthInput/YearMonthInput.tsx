"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";

/** YearMonthInput のサイズ */
export type YearMonthInputSize = "small" | "medium" | "large";

export interface YearMonthInputProps {
  /** 現在の値（YYYY-MM 形式） */
  value?: string;
  /** 値変更ハンドラー */
  onChange?: (value: string | undefined) => void;
  /** 最小値（YYYY-MM 形式） */
  min?: string;
  /** 最大値（YYYY-MM 形式） */
  max?: string;
  /** クリアボタンを表示するか */
  allowClear?: boolean;
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
  /** 補助説明 */
  description?: string;
  /** 必須フラグ */
  required?: boolean;
  /** 無効化 */
  disabled?: boolean;
  /** サイズ */
  size?: YearMonthInputSize;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
  /** input の id */
  id?: string;
  /** input の name */
  name?: string;
  /** aria-invalid の上書き */
  "aria-invalid"?: boolean;
  /** aria-describedby の上書き */
  "aria-describedby"?: string;
}

/** インプットのサイズスタイル */
const inputSizeStyles: Record<YearMonthInputSize, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5",
};

/** クリアボタンのサイズスタイル */
const clearButtonSizeStyles: Record<YearMonthInputSize, string> = {
  small: "text-xs w-5 h-5",
  medium: "text-sm w-6 h-6",
  large: "text-base w-7 h-7",
};

/**
 * 年月入力コンポーネント
 *
 * YYYY-MM 形式の年月を入力するための専用インプット。
 * ネイティブの type="month" を使用し、ブラウザ間の差異を吸収する。
 */
export const YearMonthInput: React.FC<YearMonthInputProps> = ({
  value,
  onChange,
  min,
  max,
  allowClear = false,
  label,
  error,
  description,
  required = false,
  disabled = false,
  size = "medium",
  className,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}) => {
  const baseId = useId();
  const inputId = id ?? `${baseId}-year-month-input`;
  const resolvedAriaInvalid = error ? true : (ariaInvalid ?? false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange?.(val === "" ? undefined : val);
  };

  const handleClear = () => {
    onChange?.(undefined);
  };

  const showClear = allowClear && !disabled && value;

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      error={error}
      size={size}
      className={className}
      htmlFor={inputId}
      aria-describedby={ariaDescribedBy}
    >
      {({ describedBy }) => (
        <div className="relative flex items-center">
          <input
            id={inputId}
            type="month"
            name={name}
            value={value ?? ""}
            onChange={handleChange}
            min={min}
            max={max}
            disabled={disabled}
            required={required}
            aria-invalid={resolvedAriaInvalid}
            aria-describedby={describedBy}
            className={cn(
              "w-full rounded-md border bg-white transition-colors duration-150",
              "text-gray-900",
              "dark:bg-gray-800 dark:text-gray-100",
              inputSizeStyles[size],
              showClear && "pr-8",
              error
                ? [
                    "border-[var(--kui-color-danger)]",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-danger)] focus:ring-offset-1",
                  ]
                : [
                    "border-[var(--kui-color-border-strong)]",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
                    "dark:border-gray-600",
                  ],
              disabled && "cursor-not-allowed opacity-50",
            )}
          />
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear"
              className={cn(
                "absolute right-1 flex items-center justify-center rounded-full",
                "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
                "dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700",
                "transition-colors duration-150",
                clearButtonSizeStyles[size],
              )}
            >
              ×
            </button>
          )}
        </div>
      )}
    </FormField>
  );
};
