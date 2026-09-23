"use client";
import type React from "react";
import { cn } from "../../../utils/cn";
/** スケルトンのプロパティ。 @default undefined */
export interface SkeletonProps {
  /** 形状。 @default "text" */
  variant?: "text" | "circular" | "rectangular";
  /** アニメーション。 @default "pulse" */
  animation?: "none" | "pulse";
  /** 幅。 @default undefined */
  width?: string | number;
  /** 高さ。 @default undefined */
  height?: string | number;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLOutputElement>;
}
/** 読み込み中のプレースホルダー。 @default undefined */
export function Skeleton({
  variant = "text",
  animation = "pulse",
  width,
  height,
  className,
  ref,
}: SkeletonProps) {
  return (
    <output
      aria-label="Loading"
      ref={ref}
      style={{ width, height }}
      className={cn(
        "block bg-surface-sunken",
        variant === "text" && "h-4 w-full rounded",
        variant === "circular" && "h-10 w-10 rounded-full",
        variant === "rectangular" && "h-24 w-full rounded-md",
        animation === "pulse" && "animate-pulse",
        className,
      )}
    />
  );
}
