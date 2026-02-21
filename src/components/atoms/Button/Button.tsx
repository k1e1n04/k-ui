"use client";

import React from "react";

import { cn } from "../../../utils/cn";

/** ボタンのバリアント */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "outline"
  | "ghost"
  | "danger";

/** ボタンのサイズ */
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンの種類 */
  variant?: ButtonVariant;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** フルサイズ（幅いっぱい）表示 */
  fullWidth?: boolean;
  /** アイコンのみのボタン */
  iconOnly?: boolean;
}

/** バリアントに応じたスタイル */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-main hover:bg-primary-light text-white dark:bg-blue-700 dark:hover:bg-blue-800",
  secondary:
    "bg-secondary-light hover:bg-gray-200 text-primary-main dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
  success:
    "bg-success-main hover:opacity-90 text-white dark:bg-green-700 dark:hover:bg-green-800",
  outline:
    "bg-transparent border border-primary-main text-primary-main hover:bg-primary-main/5 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20",
  ghost:
    "bg-transparent hover:bg-gray-100 text-primary-main dark:hover:bg-gray-700 dark:text-gray-300",
  danger:
    "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800",
};

/** サイズに応じたスタイル */
const sizeStyles: Record<ButtonSize, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-4 py-2",
  large: "text-base px-6 py-3",
};

/** アイコンのみの場合のサイズスタイル */
const iconSizeStyles: Record<ButtonSize, string> = {
  small: "p-1",
  medium: "p-2",
  large: "p-3",
};

/**
 * 汎用ボタンコンポーネント
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "font-medium rounded-md transition-colors",
        variantStyles[variant],
        iconOnly ? iconSizeStyles[size] : sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={disabled ? undefined : props.onClick}
      {...props}
    >
      {children}
    </button>
  );
};
