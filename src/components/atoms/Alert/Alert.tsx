"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/**
 * Alertコンポーネントのバリアント
 */
export type AlertVariant = "success" | "info" | "warning" | "error";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * アラートの種別
   * @default 'info'
   */
  variant?: AlertVariant;
  /**
   * 表示するメッセージ
   */
  message: string;
}

const variantStyles: Record<AlertVariant, string> = {
  error:
    "bg-[--kui-color-danger-subtle] border border-[--kui-color-danger-subtle] text-[--kui-color-danger]",
  warning:
    "bg-[--kui-color-warning-subtle]/30 border border-[--kui-color-warning-subtle] text-[--kui-color-warning]",
  info: "bg-[--kui-color-info-subtle]/20 border border-[--kui-color-info-subtle] text-[--kui-color-info]",
  success:
    "bg-[--kui-color-success-subtle] border border-[--kui-color-success-subtle] text-[--kui-color-success]",
};

/**
 * Alert コンポーネント
 *
 * エラー、警告、情報、成功のメッセージを表示するインラインアラート
 *
 * @example
 * <Alert variant="error" message="エラーが発生しました" />
 *
 * @example
 * <Alert variant="success" message="保存しました" />
 */
export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  message,
  className,
  ...props
}) => {
  return (
    <div
      role="alert"
      className={cn("px-4 py-3 rounded-md", variantStyles[variant], className)}
      {...props}
    >
      {message}
    </div>
  );
};
