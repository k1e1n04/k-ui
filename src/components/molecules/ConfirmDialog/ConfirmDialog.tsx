"use client";

import type React from "react";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Heading, Typography } from "../../atoms";
import { Dialog } from "../Dialog";

/** 確認ダイアログのバリアント */
export type ConfirmDialogVariant = "danger" | "warning" | "info";

export interface ConfirmDialogProps {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
  /** 確認関数 */
  onConfirm: () => void;
  /** ダイアログのタイトル */
  title: string;
  /** 確認メッセージ */
  message: ReactNode;
  /** 補助メッセージ */
  description?: string;
  /** バリアント */
  variant?: ConfirmDialogVariant;
  /** 処理中かどうか */
  isProcessing?: boolean;
  /** キャンセルボタンのラベル */
  cancelLabel?: string;
  /** 確認ボタンのラベル */
  confirmLabel?: string;
  /** 処理中のラベル */
  processingLabel?: string;
  /** アイコン（カスタム） */
  icon?: ReactNode;
}

/** バリアントに応じたスタイル */
const variantStyles: Record<
  ConfirmDialogVariant,
  { iconBg: string; iconColor: string; buttonBg: string; buttonHover: string }
> = {
  danger: {
    iconBg: "bg-danger-subtle",
    iconColor: "text-danger-main",
    buttonBg: "bg-danger-main",
    buttonHover: "hover:opacity-90",
  },
  warning: {
    iconBg: "bg-warning-subtle",
    iconColor: "text-warning-main",
    buttonBg: "bg-warning-main",
    buttonHover: "hover:opacity-90",
  },
  info: {
    iconBg: "bg-info-subtle",
    iconColor: "text-info-main",
    buttonBg: "bg-info-main",
    buttonHover: "hover:opacity-90",
  },
};

/** デフォルトのアイコン（ExclamationTriangle インラインSVG） */
const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

/**
 * 汎用確認ダイアログコンポーネント
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  description,
  variant = "danger",
  isProcessing = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  processingLabel = "Processing...",
  icon,
}) => {
  const styles = variantStyles[variant];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      disableOutsideClick={isProcessing}
    >
      <div className="flex items-center mb-4">
        <div
          className={cn("rounded-full p-2 mr-3 flex-shrink-0", styles.iconBg)}
        >
          {icon || <DefaultIcon className={cn("h-6 w-6", styles.iconColor)} />}
        </div>
        <Heading
          as="h3"
          size="md"
          style={{ fontWeight: "var(--kui-font-weight-medium)" }}
        >
          {title}
        </Heading>
      </div>

      <div className="mb-6">
        <Typography as="div">{message}</Typography>
        {description && (
          <Typography className="mt-2" variant="body-sm" tone="muted">
            {description}
          </Typography>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="px-4 py-2 text-sm font-medium text-foreground bg-surface-sunken hover:bg-border text rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border-strong disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isProcessing}
          className={cn(
            "px-4 py-2 text-sm font-medium text-inverse rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            styles.buttonBg,
            styles.buttonHover,
          )}
        >
          {isProcessing ? processingLabel : confirmLabel}
        </button>
      </div>
    </Dialog>
  );
};
