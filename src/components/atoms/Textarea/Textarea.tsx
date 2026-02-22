"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";

/** テキストエリアのサイズ */
export type TextareaSize = "small" | "medium" | "large";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ（指定されるとエラー状態を表示する） */
  error?: string;
  /** 現在の値 */
  value?: string;
  /** 変更ハンドラー */
  onChange?: (value: string) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** サイズ */
  size?: TextareaSize;
  /** 行数 */
  rows?: number;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
}

/** ラベルのサイズスタイル */
const labelSizeStyles: Record<TextareaSize, string> = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5",
};

/** テキストエリアのサイズスタイル */
const textareaSizeStyles: Record<TextareaSize, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5",
};

/** エラーテキストのサイズスタイル */
const errorSizeStyles: Record<TextareaSize, string> = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5",
};

/**
 * テキストエリアコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理する複数行テキスト入力UI
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  required = false,
  error,
  value,
  onChange,
  size = "medium",
  rows = 3,
  className,
  id,
  "aria-describedby": ariaDescribedBy,
  ...textareaProps
}) => {
  const baseId = useId();
  const textareaId = id ?? `${baseId}-textarea`;
  const errorId = `${baseId}-error`;
  const mergedAriaDescribedBy = [ariaDescribedBy, error ? errorId : undefined]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className={cn("flex flex-col", className)}>
      {/* ラベル */}
      {label && (
        <label
          htmlFor={textareaId}
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
      {/* テキストエリア */}
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        rows={rows}
        {...textareaProps}
        aria-invalid={!!error}
        aria-describedby={mergedAriaDescribedBy || undefined}
        className={cn(
          "w-full rounded-md border bg-white transition-colors duration-150",
          "text-gray-900 placeholder:text-gray-400",
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          "resize-y",
          textareaSizeStyles[size],
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
          textareaProps.disabled && "cursor-not-allowed opacity-50",
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
