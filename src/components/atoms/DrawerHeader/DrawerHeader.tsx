"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 追加のクラス名 */
  className?: string;
}

/**
 * ドロワーのヘッダー部分のコンポーネント
 */
export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end min-h-[56px] sm:min-h-[64px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
