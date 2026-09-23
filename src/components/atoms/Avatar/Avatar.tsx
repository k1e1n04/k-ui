"use client";
import type React from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
/** アバターのサイズ。 @default undefined */
export type AvatarSize = "small" | "medium" | "large";
/** アバターのプロパティ。 @default undefined */
export interface AvatarProps {
  /** 画像URL。 @default undefined */
  src?: string;
  /** 名前。 @default "" */
  name?: string;
  /** 代替テキスト。 @default name */
  alt?: string;
  /** サイズ。 @default "medium" */
  size?: AvatarSize;
  /** 形状。 @default "circle" */
  shape?: "circle" | "square";
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLElement>;
}
const sizeStyles: Record<AvatarSize, string> = {
  small: "h-8 w-8 text-xs",
  medium: "h-10 w-10 text-sm",
  large: "h-14 w-14 text-base",
};
/** アバターを表示するコンポーネント。 @default undefined */
export function Avatar({
  src,
  name = "",
  alt = name,
  size = "medium",
  shape = "circle",
  className,
  ref,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";
  const common = cn(
    "inline-flex shrink-0 items-center justify-center overflow-hidden bg-secondary-light font-medium text-primary-main",
    sizeStyles[size],
    shape === "circle" ? "rounded-full" : "rounded-md",
    className,
  );
  if (src && !failed)
    return (
      <img
        src={src}
        alt={alt}
        ref={ref as React.Ref<HTMLImageElement>}
        onError={() => setFailed(true)}
        className={common}
      />
    );
  return (
    <span
      role="img"
      aria-label={alt}
      ref={ref as React.Ref<HTMLSpanElement>}
      className={common}
    >
      {initials}
    </span>
  );
}
