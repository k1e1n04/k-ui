"use client";
import type React from "react";
import { cn } from "../../../utils/cn";
/** ボタングループのプロパティ。 @default undefined */
export interface ButtonGroupProps extends React.ComponentPropsWithRef<"div"> {
  /** 並びの方向。 @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** 幅いっぱいに表示するか。 @default false */
  fullWidth?: boolean;
}
/** ボタンを連続したグループとして表示するコンポーネント。 @default undefined */
export function ButtonGroup({
  orientation = "horizontal",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: ボタン群の任意の子要素を受け入れる視覚的グループ
    <div
      {...props}
      role="group"
      className={cn(
        "inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md",
        orientation === "vertical" &&
          "flex-col [&>button:first-child]:rounded-t-md [&>button:first-child]:rounded-l-none [&>button:last-child]:rounded-b-md [&>button:last-child]:rounded-r-none",
        fullWidth && "flex w-full [&>button]:flex-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
