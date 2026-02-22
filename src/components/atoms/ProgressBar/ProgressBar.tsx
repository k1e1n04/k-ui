"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** プログレスバーのサイズ */
export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 現在の進捗値 */
  value: number;
  /** 進捗の最大値 */
  max?: number;
  /** スクリーンリーダー向けのラベル */
  label?: string;
  /** プログレスバーのサイズ */
  size?: ProgressBarSize;
}

const sizeStyles: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

/**
 * ProgressBar コンポーネント
 *
 * 進捗率を視覚的に表現するバーUI。
 * `role=progressbar` と ARIA 属性を自動付与する。
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  size = "md",
  className,
  ...props
}) => {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = Math.min(Math.max(value, 0), safeMax);
  const progressPercentage = (clampedValue / safeMax) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label}
      className={cn(
        "w-full overflow-hidden rounded-full bg-[--kui-color-surface-raised]",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      <div
        className="h-full rounded-full bg-[--kui-color-info] transition-all duration-500 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};
