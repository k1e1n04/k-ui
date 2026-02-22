"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";

/** チェックボックスのサイズ */
export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps {
  /** 現在のチェック状態 */
  checked: boolean;
  /** 変更ハンドラー */
  onChange: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 表示ラベル */
  label?: string;
  /** サイズ */
  size?: CheckboxSize;
  /** 追加のクラス名 */
  className?: string;
}

/** ボックスのサイズスタイル */
const boxSizeStyles: Record<CheckboxSize, string> = {
  small: "w-4 h-4",
  medium: "w-5 h-5",
  large: "w-6 h-6",
};

/** チェックマークのサイズスタイル */
const checkmarkSizeStyles: Record<CheckboxSize, string> = {
  small: "w-2.5 h-2.5",
  medium: "w-3 h-3",
  large: "w-3.5 h-3.5",
};

/** ラベルのサイズスタイル */
const labelSizeStyles: Record<CheckboxSize, string> = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};

/**
 * チェックボックスコンポーネント
 *
 * ON/OFFの選択に使用するチェックボックスUI
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = "medium",
  className,
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      {/* 隠しチェックボックス（アクセシビリティ対応） */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        aria-checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
        aria-label={label}
      />
      {/* カスタムチェックボックス外観 */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center shrink-0 rounded border-2 transition-colors duration-150",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
          boxSizeStyles[size],
          checked
            ? "bg-primary-main border-primary-main dark:bg-blue-600 dark:border-blue-600"
            : "bg-white border-gray-400 dark:bg-gray-800 dark:border-gray-500",
        )}
      >
        {/* チェックマーク */}
        {checked && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn("text-white", checkmarkSizeStyles[size])}
          >
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </span>
      {/* ラベル */}
      {label && (
        <span
          className={cn(
            "select-none text-gray-700 dark:text-gray-300",
            labelSizeStyles[size],
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};
