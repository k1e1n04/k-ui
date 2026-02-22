"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
import { Heading, Typography } from "../../atoms";

export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateAlign = "left" | "center";
export type EmptyStateActionPlacement = "below" | "inline";

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
  /**
   * コンポーネント全体のサイズ
   */
  size?: EmptyStateSize;
  /**
   * コンテンツの水平方向の配置
   */
  align?: EmptyStateAlign;
  /**
   * action の配置
   */
  actionPlacement?: EmptyStateActionPlacement;
}

const containerSizeClassMap: Record<EmptyStateSize, string> = {
  sm: "gap-2 rounded-lg px-4 py-6",
  md: "gap-3 rounded-xl px-6 py-10",
  lg: "gap-4 rounded-2xl px-8 py-14",
};

const headingSizeMap: Record<EmptyStateSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const descriptionVariantMap: Record<EmptyStateSize, "body-sm" | "body-md"> = {
  sm: "body-sm",
  md: "body-sm",
  lg: "body-md",
};

const descriptionWidthClassMap: Record<EmptyStateSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const iconSizeClassMap: Record<EmptyStateSize, string> = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

const contentAlignClassMap: Record<EmptyStateAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const actionWrapAlignClassMap: Record<EmptyStateAlign, string> = {
  left: "justify-start",
  center: "justify-center",
};

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
  size = "md",
  align = "center",
  actionPlacement = "below",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-center border border-[--kui-color-border] bg-[--kui-color-surface]",
        containerSizeClassMap[size],
        contentAlignClassMap[align],
        className,
      )}
      {...props}
    >
      {icon ? (
        <div
          className={cn(
            "flex items-center justify-center text-[--kui-color-text-muted]",
            iconSizeClassMap[size],
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}
      <Heading as="h2" size={headingSizeMap[size]}>
        {title}
      </Heading>
      {description ? (
        <Typography
          className={descriptionWidthClassMap[size]}
          variant={descriptionVariantMap[size]}
          tone="muted"
        >
          {description}
        </Typography>
      ) : null}
      {action && actionPlacement === "inline" ? <div>{action}</div> : null}
      {action && actionPlacement === "below" ? (
        <div className={cn("flex w-full pt-1", actionWrapAlignClassMap[align])}>
          {action}
        </div>
      ) : null}
    </div>
  );
};
