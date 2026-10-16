"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** フローティングボタンの位置。 @default undefined */
export type FloatingActionButtonPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

/** フローティングボタンのプロパティ。 @default undefined */
export interface FloatingActionButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "aria-label"> {
  /** アクセシブルな名前。 @default undefined */
  label: string;
  /** アイコン。 @default undefined */
  icon?: React.ReactNode;
  /** テキスト付きの横長表示にする。 @default false */
  extended?: boolean;
  /** 表示位置。 @default "bottom-right" */
  position?: FloatingActionButtonPosition;
  /** 拡張表示時のテキスト。 @default undefined */
  children?: React.ReactNode;
}

const positionStyles: Record<FloatingActionButtonPosition, string> = {
  "bottom-right": "right-4 bottom-[calc(var(--kui-safe-area-bottom)+1rem)]",
  "bottom-left": "left-4 bottom-[calc(var(--kui-safe-area-bottom)+1rem)]",
  "bottom-center":
    "left-1/2 -translate-x-1/2 bottom-[calc(var(--kui-safe-area-bottom)+1rem)]",
};

/** 主要操作を右下などに固定表示するボタン。タップ領域は 44px 以上。 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  label,
  icon,
  extended = false,
  position = "bottom-right",
  className,
  children,
  ...props
}) => (
  <button
    type="button"
    aria-label={label}
    className={cn(
      "fixed z-[var(--kui-z-toast)] inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent-main text-inverse shadow-lg transition-colors hover:opacity-90",
      extended ? "px-5" : "w-14",
      positionStyles[position],
      className,
    )}
    {...props}
  >
    {icon && (
      <span aria-hidden="true" className="flex items-center">
        {icon}
      </span>
    )}
    {extended && children}
  </button>
);
