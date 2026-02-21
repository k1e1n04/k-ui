"use client";

import type { ReactNode } from "react";
import React from "react";

import { cn } from "../../../utils/cn";

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** リストアイテムの内容 */
  children: ReactNode;
  /** ホバーエフェクトを有効にするか */
  hoverable?: boolean;
  /** 下部ボーダーを表示するか */
  bordered?: boolean;
}

/**
 * リストアイテムコンポーネント
 */
export const ListItem: React.FC<ListItemProps> = ({
  children,
  hoverable = true,
  bordered = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "px-4 py-3 bg-white dark:bg-gray-800 rounded-lg",
        hoverable && "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
        bordered && "border border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
