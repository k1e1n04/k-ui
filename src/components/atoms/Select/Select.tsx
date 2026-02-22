"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";

/** セレクトのサイズ */
export type SelectSize = "small" | "medium" | "large";

/** セレクトの選択肢 */
export interface SelectOption {
  /** 表示ラベル */
  label: string;
  /** 値 */
  value: string;
  /** 無効状態 */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "size" | "value"
  > {
  /** 選択肢リスト */
  options: SelectOption[];
  /** ラベルテキスト */
  label?: string;
  /** 必須フラグ（ラベルに * を付与する） */
  required?: boolean;
  /** 補助説明 */
  description?: string;
  /** プレースホルダー（未選択時に表示される） */
  placeholder?: string;
  /** エラーメッセージ（指定されるとエラー状態を表示する） */
  error?: string;
  /** 現在の値 */
  value?: string;
  /** 変更ハンドラー */
  onChange?: (value: string) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** サイズ */
  size?: SelectSize;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
  /** clear 可能か（placeholder を再選択できる） */
  clearable?: boolean;
}

/** セレクトのサイズスタイル */
const selectSizeStyles: Record<SelectSize, string> = {
  small: "text-xs px-2 py-1 pr-7",
  medium: "text-sm px-3 py-2 pr-8",
  large: "text-base px-4 py-2.5 pr-10",
};

/** シェブロンアイコンのサイズスタイル */
const chevronSizeStyles: Record<SelectSize, string> = {
  small: "size-3 right-2",
  medium: "size-4 right-2.5",
  large: "size-5 right-3",
};

/**
 * セレクトコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するドロップダウン選択UI
 */
export const Select: React.FC<SelectProps> = ({
  options,
  label,
  required = false,
  description,
  placeholder,
  error,
  value,
  onChange,
  size = "medium",
  className,
  clearable = false,
  id,
  "aria-describedby": ariaDescribedBy,
  ...selectProps
}) => {
  const baseId = useId();
  const selectId = id ?? `${baseId}-select`;
  const selectValueProps =
    value !== undefined ? { value } : placeholder ? { defaultValue: "" } : {};

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      error={error}
      size={size}
      className={className}
      htmlFor={selectId}
      aria-describedby={ariaDescribedBy}
    >
      {({ describedBy }) => (
        <div className="relative">
          <select
            id={selectId}
            {...selectValueProps}
            onChange={(e) => onChange?.(e.target.value)}
            required={required}
            {...selectProps}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              "w-full appearance-none rounded-md border bg-white transition-colors duration-150",
              "text-gray-900",
              "dark:bg-gray-800 dark:text-gray-100",
              selectSizeStyles[size],
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
              selectProps.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {placeholder && (
              <option value="" disabled={!clearable}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",
              chevronSizeStyles[size],
              selectProps.disabled && "opacity-50",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}
    </FormField>
  );
};
