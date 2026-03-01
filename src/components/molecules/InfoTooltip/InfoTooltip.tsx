"use client";

import type React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../utils/cn";
import { Tooltip } from "../Tooltip";

/** InfoTooltip のサイズ */
export type InfoTooltipSize = "sm" | "md";

/** InfoTooltip の表示位置 */
export type InfoTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface InfoTooltipProps {
  /** ツールチップの内容 */
  content: ReactNode;
  /** トリガーラベル（aria-label 用） */
  label?: string;
  /** サイズ */
  size?: InfoTooltipSize;
  /** 追加のクラス名 */
  className?: string;
}

/** アイコンのサイズスタイル */
const iconSizeStyles: Record<InfoTooltipSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
};

/**
 * インフォメーションツールチップコンポーネント
 *
 * Tooltip のユースケース特化ラッパー。
 * 情報アイコン (i) とアクセシビリティ属性を内包し、
 * 説明補助のツールチップを簡単に配置できる。
 */
export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  label = "Info",
  size = "md",
  className,
}) => {
  return (
    <Tooltip content={content} triggerLabel={label} className={className}>
      <svg
        className={cn(iconSizeStyles[size])}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
  );
};
