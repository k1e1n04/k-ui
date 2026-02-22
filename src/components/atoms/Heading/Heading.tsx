"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "xl" | "lg" | "md" | "sm";
export type HeadingTone = "default" | "muted" | "inverse";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** レンダリングする見出しタグ */
  as?: HeadingAs;
  /** 見出しサイズ */
  size?: HeadingSize;
  /** 見出しカラー */
  tone?: HeadingTone;
}

const sizeStyles: Record<HeadingSize, React.CSSProperties> = {
  xl: {
    fontSize: "var(--kui-font-size-2xl)",
    lineHeight: "var(--kui-line-height-tight)",
  },
  lg: {
    fontSize: "var(--kui-font-size-xl)",
    lineHeight: "var(--kui-line-height-tight)",
  },
  md: {
    fontSize: "var(--kui-font-size-lg)",
    lineHeight: "var(--kui-line-height-normal)",
  },
  sm: {
    fontSize: "var(--kui-font-size-base)",
    lineHeight: "var(--kui-line-height-normal)",
  },
};

const toneStyles: Record<HeadingTone, React.CSSProperties> = {
  default: { color: "var(--kui-color-text)" },
  muted: { color: "var(--kui-color-text-muted)" },
  inverse: { color: "var(--kui-color-text-inverse)" },
};

/**
 * Heading コンポーネント
 *
 * ページ・セクション見出しの階層表現を統一するためのコンポーネント
 */
export const Heading: React.FC<HeadingProps> = ({
  as = "h2",
  size = "md",
  tone = "default",
  className,
  style,
  ...props
}) => {
  const Component = as as React.ElementType;

  return (
    <Component
      className={cn(className)}
      style={{
        fontWeight: "var(--kui-font-weight-semibold)",
        ...sizeStyles[size],
        ...toneStyles[tone],
        ...style,
      }}
      {...props}
    />
  );
};
