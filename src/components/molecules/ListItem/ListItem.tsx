"use client";

import type React from "react";
import type { ReactNode } from "react";

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
        "px-4 py-3 bg-surface rounded-lg",
        hoverable && "hover:bg-surface-raised transition-colors",
        bordered && "border border-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
