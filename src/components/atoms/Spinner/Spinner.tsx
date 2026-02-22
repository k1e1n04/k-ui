"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** スピナーのサイズ */
export type SpinnerSize = "small" | "medium" | "large";

export interface SpinnerProps {
  /** スピナーのサイズ */
  size?: SpinnerSize;
  /** スピナー下部に表示するラベル */
  label?: string;
  /** 追加のクラス名 */
  className?: string;
}

/** サイズに応じたスタイル */
const sizeStyles: Record<SpinnerSize, string> = {
  small: "h-5 w-5",
  medium: "h-8 w-8",
  large: "h-12 w-12",
};

/**
 * ローディングスピナーコンポーネント
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-full min-h-[200px]",
        className,
      )}
    >
      <div className="text-center">
        <div
          className={cn(
            "animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-2",
            sizeStyles[size],
          )}
        />
        {label && (
          <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
        )}
      </div>
    </div>
  );
};
