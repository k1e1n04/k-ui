"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export type TypographyAs = "p" | "span" | "div" | "label" | "small";
export type TypographyVariant =
  | "body-sm"
  | "body-md"
  | "body-lg"
  | "caption"
  | "label";
export type TypographyTone =
  | "default"
  | "muted"
  | "inverse"
  | "danger"
  | "success"
  | "info"
  | "warning";
export type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** レンダリングするHTML要素 */
  as?: TypographyAs;
  /** タイポグラフィの種別 */
  variant?: TypographyVariant;
  /** テキストのトーン */
  tone?: TypographyTone;
  /** 文字の太さ */
  weight?: TypographyWeight;
  /** 1行省略表示 */
  truncate?: boolean;
}

const variantStyles: Record<TypographyVariant, React.CSSProperties> = {
  "body-sm": {
    fontSize: "var(--kui-font-size-sm)",
    lineHeight: "var(--kui-line-height-normal)",
  },
  "body-md": {
    fontSize: "var(--kui-font-size-base)",
    lineHeight: "var(--kui-line-height-normal)",
  },
  "body-lg": {
    fontSize: "var(--kui-font-size-lg)",
    lineHeight: "var(--kui-line-height-relaxed)",
  },
  caption: {
    fontSize: "var(--kui-font-size-xs)",
    lineHeight: "var(--kui-line-height-normal)",
  },
  label: {
    fontSize: "var(--kui-font-size-sm)",
    lineHeight: "var(--kui-line-height-normal)",
  },
};

const toneStyles: Record<TypographyTone, React.CSSProperties> = {
  default: { color: "var(--kui-color-text)" },
  muted: { color: "var(--kui-color-text-muted)" },
  inverse: { color: "var(--kui-color-text-inverse)" },
  danger: { color: "var(--kui-color-danger)" },
  success: { color: "var(--kui-color-success)" },
  info: { color: "var(--kui-color-info)" },
  warning: { color: "var(--kui-color-warning)" },
};

const weightStyles: Record<TypographyWeight, React.CSSProperties> = {
  normal: { fontWeight: "var(--kui-font-weight-normal)" },
  medium: { fontWeight: "var(--kui-font-weight-medium)" },
  semibold: { fontWeight: "var(--kui-font-weight-semibold)" },
  bold: { fontWeight: "var(--kui-font-weight-bold)" },
};

const variantDefaultWeight: Record<TypographyVariant, TypographyWeight> = {
  "body-sm": "normal",
  "body-md": "normal",
  "body-lg": "normal",
  caption: "normal",
  label: "medium",
};

/**
 * Typography コンポーネント
 *
 * 本文・補助テキスト・ラベルなどの文字スタイルを統一するための基本コンポーネント
 */
export const Typography: React.FC<TypographyProps> = ({
  as = "p",
  variant = "body-md",
  tone = "default",
  weight,
  truncate = false,
  className,
  style,
  ...props
}) => {
  const Component = as as React.ElementType;
  const resolvedWeight = weight ?? variantDefaultWeight[variant];

  return (
    <Component
      className={cn(truncate && "truncate", className)}
      style={{
        ...variantStyles[variant],
        ...toneStyles[tone],
        ...weightStyles[resolvedWeight],
        ...style,
      }}
      {...props}
    />
  );
};
