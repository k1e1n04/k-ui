"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";

/** インプットのタイプ */
export type InputType = "text" | "number" | "date" | "time" | "url" | "month";

/** インプットのサイズ */
export type InputSize = "small" | "medium" | "large";

export interface InputProps {
  /** インプットのタイプ */
  type?: InputType;
  /** ラベルテキスト */
  label?: string;
  /** 必須フラグ（ラベルに * を付与する） */
  required?: boolean;
  /** プレースホルダー */
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
  size?: InputSize;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
}

/** ラベルのサイズスタイル */
const labelSizeStyles: Record<InputSize, string> = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5",
};

/** インプットのサイズスタイル */
const inputSizeStyles: Record<InputSize, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5",
};

/** エラーテキストのサイズスタイル */
const errorSizeStyles: Record<InputSize, string> = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5",
};

/**
 * インプットコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するテキスト入力UI
 */
export const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  required = false,
  placeholder,
  error,
  value,
  onChange,
  disabled = false,
  size = "medium",
  className,
}) => {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* ラベル */}
      {label && (
        <label
          htmlFor={inputId}
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
      {/* インプット */}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "w-full rounded-md border bg-white transition-colors duration-150",
          "text-gray-900 placeholder:text-gray-400",
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          inputSizeStyles[size],
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
