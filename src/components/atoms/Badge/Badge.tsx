"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/**
 * Badgeコンポーネントのバリアント
 */
export type BadgeVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * バッジの種別
   * @default 'info'
   */
  variant?: BadgeVariant;
  /**
   * 表示内容
   */
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  info: "bg-[--kui-color-info-subtle] text-[--kui-color-info]",
  success: "bg-[--kui-color-success-subtle] text-[--kui-color-success]",
  warning: "bg-[--kui-color-warning-subtle] text-[--kui-color-warning]",
  danger: "bg-[--kui-color-danger-subtle] text-[--kui-color-danger]",
  neutral:
    "bg-[--kui-color-surface-raised] text-[--kui-color-text-muted] border border-[--kui-color-border]",
};

/**
 * Badge コンポーネント
 *
 * 小さなステータスラベルを表示するためのコンポーネント
 *
 * @example
 * <Badge variant="info">Planned</Badge>
 *
 * @example
 * <Badge variant="neutral">Archived</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
