"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export type PaddingSize = "none" | "sm" | "md" | "lg";
export type ShadowSize = "none" | "sm" | "md";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * パディングのサイズ
   * @default 'md'
   */
  padding?: PaddingSize;
  /**
   * シャドウのサイズ
   * @default 'md'
   */
  shadow?: ShadowSize;
  /**
   * ボーダーの表示
   * @default false
   */
  border?: boolean;
  children?: React.ReactNode;
}

const paddingMap: Record<PaddingSize, string> = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

const shadowMap: Record<ShadowSize, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow",
};

/**
 * Card コンポーネント
 *
 * コンテンツを囲むカードコンポーネント
 *
 * @example
 * // 基本的な使用
 * <Card>
 *   <p>Content here</p>
 * </Card>
 *
 * @example
 * // カスタマイズ例
 * <Card padding="lg" shadow="sm" border>
 *   <p>Custom content</p>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  padding = "md",
  shadow = "md",
  border = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg",
        paddingMap[padding],
        shadowMap[shadow],
        border && "border border-gray-200 dark:border-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
