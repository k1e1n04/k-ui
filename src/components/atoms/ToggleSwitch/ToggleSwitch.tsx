"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** トグルスイッチのサイズ */
export type ToggleSwitchSize = "small" | "medium" | "large";

export interface ToggleSwitchProps {
  /** 現在の状態 */
  checked: boolean;
  /** 変更ハンドラー */
  onChange: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 表示ラベル */
  label?: string;
  /** サイズ */
  size?: ToggleSwitchSize;
  /** 追加のクラス名 */
  className?: string;
}

/** トラックのサイズスタイル */
const trackSizeStyles: Record<ToggleSwitchSize, string> = {
  small: "w-8 h-4",
  medium: "w-11 h-6",
  large: "w-14 h-7",
};

/** つまみのサイズスタイル */
const thumbSizeStyles: Record<ToggleSwitchSize, string> = {
  small: "w-3 h-3",
  medium: "w-5 h-5",
  large: "w-6 h-6",
};

/** つまみの移動量 */
const thumbTranslateStyles: Record<ToggleSwitchSize, string> = {
  small: "translate-x-4",
  medium: "translate-x-5",
  large: "translate-x-7",
};

/** ラベルのサイズスタイル */
const labelSizeStyles: Record<ToggleSwitchSize, string> = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};

/**
 * トグルスイッチコンポーネント
 *
 * ON/OFFの切り替えに使用するスイッチUI
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = "medium",
  className,
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      {/* 隠しチェックボックス（アクセシビリティ対応） */}
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        aria-checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
        aria-label={label}
      />
      {/* トラック */}
      <div
        aria-hidden="true"
        className={cn(
          "relative inline-flex items-center rounded-full transition-colors duration-200",
          trackSizeStyles[size],
          checked
            ? "bg-primary-main dark:bg-blue-600"
            : "bg-gray-300 dark:bg-gray-600",
        )}
      >
        {/* つまみ */}
        <span
          className={cn(
            "inline-block rounded-full bg-white shadow transform transition-transform duration-200",
            thumbSizeStyles[size],
            checked ? thumbTranslateStyles[size] : "translate-x-0.5",
          )}
        />
      </div>
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
