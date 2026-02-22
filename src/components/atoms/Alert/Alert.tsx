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

const variantStyles: Record<AlertVariant, React.CSSProperties> = {
  error: {
    backgroundColor: "var(--kui-color-danger-subtle)",
    borderColor: "var(--kui-color-danger)",
    borderLeftColor: "var(--kui-color-danger)",
    color: "var(--kui-color-danger)",
  },
  warning: {
    backgroundColor: "var(--kui-color-warning-subtle)",
    borderColor: "var(--kui-color-warning)",
    borderLeftColor: "var(--kui-color-warning)",
    color: "var(--kui-color-warning)",
  },
  info: {
    backgroundColor: "var(--kui-color-info-subtle)",
    borderColor: "var(--kui-color-info)",
    borderLeftColor: "var(--kui-color-info)",
    color: "var(--kui-color-info)",
  },
  success: {
    backgroundColor: "var(--kui-color-success-subtle)",
    borderColor: "var(--kui-color-success)",
    borderLeftColor: "var(--kui-color-success)",
    color: "var(--kui-color-success)",
  },
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
  style,
  ...props
}) => {
  return (
    <div
      role="alert"
      className={cn("rounded-md border border-l-4 px-4 py-3", className)}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {message}
    </div>
  );
};
