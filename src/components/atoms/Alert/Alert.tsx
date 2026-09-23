"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
import { Typography } from "../Typography";

/**
 * Alertコンポーネントのバリアント
 */
export type AlertVariant = "success" | "info" | "warning" | "error";

export interface AlertProps extends React.ComponentPropsWithRef<"div"> {
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

/**
 * バリアントごとの配色。
 * 背景は subtle、枠はメインカラーを薄く、左のアクセントだけメインカラーを効かせる。
 * 本文は foreground にして可読性と落ち着きを優先する。
 */
const variantStyles: Record<AlertVariant, string> = {
  success:
    "border-success-main/25 border-l-success-main bg-success-subtle text-foreground",
  info: "border-info-main/25 border-l-info-main bg-info-subtle text-foreground",
  warning:
    "border-warning-main/25 border-l-warning-main bg-warning-subtle text-foreground",
  error:
    "border-danger-main/25 border-l-danger-main bg-danger-subtle text-foreground",
};

const iconColorStyles: Record<AlertVariant, string> = {
  success: "text-success-main",
  info: "text-info-main",
  warning: "text-warning-main",
  error: "text-danger-main",
};

const AlertIcon: React.FC<{
  variant: AlertVariant;
  className?: string;
}> = ({ variant, className }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  if (variant === "success") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.5 2.5 4.5-5" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg {...common}>
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (variant === "error") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
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
      className={cn(
        "flex items-start gap-3 rounded-lg border border-l-4 px-4 py-3",
        variantStyles[variant],
        className,
      )}
      style={style}
      {...props}
    >
      <AlertIcon
        variant={variant}
        className={cn("mt-0.5 h-5 w-5 shrink-0", iconColorStyles[variant])}
      />
      <Typography as="span" variant="body-sm">
        {message}
      </Typography>
    </div>
  );
};
