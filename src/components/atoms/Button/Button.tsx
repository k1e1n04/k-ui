"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** ボタンのバリアント */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "outline"
  | "ghost"
  | "danger";

/** ボタンのサイズ */
export type ButtonSize = "small" | "medium" | "large";

/** ボタンのトーン */
export type ButtonTone = "solid" | "plain" | "subtle";

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
  /** ボタンのトーン */
  tone?: ButtonTone;
}

/** バリアントに応じたスタイル */
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary-main hover:bg-primary-light text-inverse",
  secondary: "bg-secondary-light hover:bg-surface-sunken text-primary-main",
  success: "bg-success-main hover:opacity-90 text-inverse",
  info: "bg-info-main hover:opacity-90 text-inverse",
  outline:
    "bg-transparent border border-primary-main text-primary-main hover:bg-surface-sunken",
  ghost: "bg-transparent hover:bg-surface-sunken text-primary-main",
  danger: "bg-danger-main hover:opacity-90 text-inverse",
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

type SemanticVariant = Extract<ButtonVariant, "success" | "info" | "danger">;

const semanticToneStyles: Record<
  SemanticVariant,
  Record<Exclude<ButtonTone, "solid">, string>
> = {
  success: {
    plain: "bg-transparent text-success-main hover:bg-success-subtle",
    subtle: "bg-success-subtle text-success-main hover:opacity-90",
  },
  info: {
    plain: "bg-transparent text-info-main hover:bg-info-subtle",
    subtle: "bg-info-subtle text-info-main hover:opacity-90",
  },
  danger: {
    plain: "bg-transparent text-danger-main hover:bg-danger-subtle",
    subtle: "bg-danger-subtle text-danger-main hover:opacity-90",
  },
};

const isSemanticVariant = (
  variant: ButtonVariant,
): variant is SemanticVariant => {
  return variant === "success" || variant === "info" || variant === "danger";
};

/**
 * 汎用ボタンコンポーネント
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  tone = "solid",
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const toneStyles =
    tone === "solid" || !isSemanticVariant(variant)
      ? variantStyles[variant]
      : semanticToneStyles[variant][tone];

  return (
    <button
      className={cn(
        "font-medium transition-colors",
        iconOnly ? "rounded-full" : "rounded-md",
        toneStyles,
        iconOnly ? iconSizeStyles[size] : sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      disabled={disabled}
      onClick={disabled ? undefined : props.onClick}
      {...props}
    >
      {children}
    </button>
  );
};
