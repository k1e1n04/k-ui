"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** AppBarのポジション */
export type AppBarPosition =
  | "fixed"
  | "static"
  | "absolute"
  | "relative"
  | "sticky";

/** AppBarのカラー */
export type AppBarColor = "primary" | "secondary" | "success" | "transparent";

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  /** ポジション */
  position?: AppBarPosition;
  /** カラーバリアント */
  color?: AppBarColor;
}

/** ポジションに応じたクラス */
const positionStyles: Record<AppBarPosition, string> = {
  fixed: "fixed top-0 left-0 right-0",
  static: "static",
  absolute: "absolute",
  relative: "relative",
  sticky: "sticky top-0",
};

/** カラーに応じたクラス */
const colorStyles: Record<AppBarColor, string> = {
  primary: "bg-primary-main text-white",
  secondary:
    "bg-secondary-main text-primary-main dark:bg-gray-800 dark:text-white",
  success: "bg-success-main text-white",
  transparent: "bg-transparent",
};

/**
 * アプリケーションバーコンポーネント
 */
export const AppBar: React.FC<AppBarProps> = ({
  position = "static",
  color = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        "z-50 transition-all duration-200 ease-in-out w-full",
        positionStyles[position],
        colorStyles[color],
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
};
