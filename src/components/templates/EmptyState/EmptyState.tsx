"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 空状態を表すアイコン
   */
  icon?: React.ReactNode;
  /**
   * 空状態のタイトル
   */
  title: string;
  /**
   * 補足説明テキスト
   */
  description?: string;
  /**
   * アクション要素（ボタン等）
   */
  action?: React.ReactNode;
}

/**
 * EmptyState コンポーネント
 *
 * データが存在しない状態を統一した見た目で表示するテンプレート
 *
 * @example
 * <EmptyState title="No data" description="Please add items." />
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-[--kui-color-border] bg-[--kui-color-surface] px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      {icon ? (
        <div
          className="flex h-12 w-12 items-center justify-center text-[--kui-color-text-muted]"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}
      <h2 className="text-lg font-semibold text-[--kui-color-text]">{title}</h2>
      {description ? (
        <p className="max-w-md text-sm text-[--kui-color-text-muted]">
          {description}
        </p>
      ) : null}
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
};
