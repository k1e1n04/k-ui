"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";

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

export interface SelectProps {
  /** 選択肢リスト */
  options: SelectOption[];
  /** ラベルテキスト */
  label?: string;
  /** 必須フラグ（ラベルに * を付与する） */
  required?: boolean;
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
  /** name 属性 */
  name?: string;
}

/** ラベルのサイズスタイル */
const labelSizeStyles: Record<SelectSize, string> = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5",
};

/** セレクトのサイズスタイル */
const selectSizeStyles: Record<SelectSize, string> = {
  small: "text-xs px-2 py-1 pr-7",
  medium: "text-sm px-3 py-2 pr-8",
  large: "text-base px-4 py-2.5 pr-10",
};

/** エラーテキストのサイズスタイル */
const errorSizeStyles: Record<SelectSize, string> = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5",
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
  placeholder,
  error,
  value,
  onChange,
  disabled = false,
  size = "medium",
  className,
  name,
}) => {
  const baseId = useId();
  const selectId = `${baseId}-select`;
  const errorId = `${baseId}-error`;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* ラベル */}
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "font-medium text-gray-700 dark:text-gray-300",
            labelSizeStyles[size],
          )}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="ml-0.5 text-[var(--kui-color-danger)]"
            >
              {" *"}
            </span>
          )}
        </label>
      )}
      {/* セレクト */}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
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
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {placeholder && (
            <option value="" disabled>
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
        {/* シェブロンアイコン */}
        <svg
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",
            chevronSizeStyles[size],
            disabled && "opacity-50",
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
      {/* エラーメッセージ */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "text-[var(--kui-color-danger)]",
            errorSizeStyles[size],
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};
