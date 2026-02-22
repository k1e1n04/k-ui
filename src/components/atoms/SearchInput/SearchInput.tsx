"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export interface SearchInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value" | "className"
  > {
  /** 現在の検索キーワード */
  value?: string;
  /** 変更ハンドラー（入力値のみを受け取る） */
  onChange?: (value: string) => void;
  /** クリアボタン押下時のハンドラー */
  onClear?: () => void;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
  /** クリアボタンの aria-label */
  clearButtonAriaLabel?: string;
}

/**
 * 検索アイコン内包の検索入力コンポーネント
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className,
  disabled = false,
  clearButtonAriaLabel = "Clear search",
  ...rest
}) => {
  const hasValue = Boolean(value);

  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };

  return (
    <div className={cn("relative", className)}>
      <span
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        aria-hidden="true"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L16.65 16.65M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <input
        {...rest}
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border bg-white py-2 pl-10 transition-colors duration-150",
          "text-sm text-gray-900 placeholder:text-gray-400",
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          hasValue ? "pr-10" : "pr-3",
          "border-[var(--kui-color-border-strong)] dark:border-gray-600",
          "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
      {hasValue && !disabled && (
        <button
          type="button"
          aria-label={clearButtonAriaLabel}
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
