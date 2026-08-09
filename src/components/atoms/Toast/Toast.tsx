"use client";
import type React from "react";
import { cn } from "../../../utils/cn";
/** トーストのバリアント。 @default undefined */
export type ToastVariant = "success" | "info" | "warning" | "danger";
/** トーストアクション。 @default undefined */
export interface ToastAction {
  /** 表示ラベル。 @default undefined */
  label: string;
  /** 実行時の処理。 @default undefined */
  onClick: () => void;
}
/** トーストのプロパティ。 @default undefined */
export interface ToastProps {
  /** バリアント。 @default "info" */
  variant?: ToastVariant;
  /** タイトル。 @default undefined */
  title?: string;
  /** メッセージ。 @default undefined */
  message?: string;
  /** 閉じる時の処理。 @default undefined */
  onDismiss?: () => void;
  /** アクション。 @default undefined */
  action?: ToastAction;
  /** ホバー開始時の処理。 @default undefined */
  onMouseEnter?: React.MouseEventHandler<HTMLOutputElement>;
  /** ホバー終了時の処理。 @default undefined */
  onMouseLeave?: React.MouseEventHandler<HTMLOutputElement>;
  /** フォーカス時の処理。 @default undefined */
  onFocus?: React.FocusEventHandler<HTMLOutputElement>;
  /** フォーカス終了時の処理。 @default undefined */
  onBlur?: React.FocusEventHandler<HTMLOutputElement>;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
const toastStyles: Record<ToastVariant, string> = {
  success: "border-success-main bg-success-subtle",
  info: "border-info-main bg-info-subtle",
  warning: "border-warning-main bg-warning-subtle",
  danger: "border-danger-main bg-danger-subtle",
};
/** 一時的な通知を表示するトースト。 @default undefined */
export function Toast({
  variant = "info",
  title,
  message,
  onDismiss,
  action,
  className,
  ...events
}: ToastProps) {
  return (
    <output
      {...events}
      className={cn(
        "flex min-w-72 items-start gap-3 rounded-md border p-3 text-foreground shadow-lg",
        toastStyles[variant],
        className,
      )}
    >
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {message && <p className="text-sm">{message}</p>}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-1 text-sm font-medium text-primary-main"
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onDismiss}
          className="text-foreground"
        >
          ×
        </button>
      )}
    </output>
  );
}
