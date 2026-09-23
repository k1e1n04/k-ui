"use client";
import type React from "react";
import { cn } from "../../../utils/cn";
/** 区切り線のプロパティ。 @default undefined */
export interface DividerProps {
  /** 方向。 @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** 線種。 @default "solid" */
  variant?: "solid" | "dashed";
  /** 表示ラベル。 @default undefined */
  label?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLDivElement>;
}
/** 内容を視覚的に分ける区切り線。 @default undefined */
export function Divider({
  orientation = "horizontal",
  variant = "solid",
  label,
  className,
  ref,
}: DividerProps) {
  if (orientation === "vertical")
    return (
      // biome-ignore lint/a11y/useSemanticElements: 縦方向区切り線を表現するため
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={0}
        ref={ref}
        className={cn(
          "self-stretch border-l border-border",
          variant === "dashed" && "border-dashed",
          className,
        )}
      />
    );
  return (
    // biome-ignore lint/a11y/useSemanticElements: ラベルを含む横方向区切り線を表現するため
    <div
      role="separator"
      aria-orientation="horizontal"
      aria-valuenow={0}
      ref={ref}
      className={cn("flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "flex-1 border-t border-border",
          variant === "dashed" && "border-dashed",
        )}
      />
      {label && <span className="text-sm text-muted">{label}</span>}
      {label && (
        <span
          className={cn(
            "flex-1 border-t border-border",
            variant === "dashed" && "border-dashed",
          )}
        />
      )}
    </div>
  );
}
