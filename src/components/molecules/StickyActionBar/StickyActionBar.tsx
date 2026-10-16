"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** 固定アクションバーの位置指定。 @default undefined */
export type StickyActionBarPosition = "sticky" | "fixed";

/** 固定アクションバーのプロパティ。 @default undefined */
export interface StickyActionBarProps
  extends React.ComponentPropsWithRef<"div"> {
  /** 固定方法。 @default "sticky" */
  position?: StickyActionBarPosition;
  /** 表示内容。 @default undefined */
  children: React.ReactNode;
}

/**
 * 画面下部に主要操作を固定するバー。
 * ホームインジケータを避けるため safe-area を足す（§7.4）。
 */
export const StickyActionBar: React.FC<StickyActionBarProps> = ({
  position = "sticky",
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex items-center gap-2 border-t border-border bg-surface px-4 pt-3 pb-[calc(var(--kui-safe-area-bottom)+0.75rem)]",
      position === "fixed"
        ? "fixed inset-x-0 bottom-0 z-[var(--kui-z-drawer)]"
        : "sticky bottom-0 z-[var(--kui-z-drawer)]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
