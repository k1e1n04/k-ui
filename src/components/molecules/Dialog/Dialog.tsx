"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { cn } from "../../../utils/cn";

/** ダイアログの最大幅。 @default undefined */
export type DialogMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";

/** ダイアログのプロパティ。 @default undefined */
export interface DialogProps {
  /** ダイアログの開閉状態。 @default undefined */
  open: boolean;
  /** ダイアログを閉じる関数。 @default undefined */
  onClose: () => void;
  /** ダイアログのタイトル。 @default undefined */
  title?: string;
  /** ダイアログのコンテンツ。 @default undefined */
  children: ReactNode;
  /** ダイアログの最大幅。 @default "md" */
  maxWidth?: DialogMaxWidth;
  /** 閉じるボタンを非表示にするか。 @default false */
  hideCloseButton?: boolean;
  /** 外クリックで閉じることを無効にするか。 @default false */
  disableOutsideClick?: boolean;
  /** 閉じるボタンの aria-label。 @default "Close dialog" */
  closeButtonLabel?: string;
  /** タイトルがない場合のダイアログの aria-label。 @default "Dialog" */
  ariaLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 最大幅に応じたクラス */
const maxWidthClasses: Record<DialogMaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

let activeDialogScrollLocks = 0;
let originalBodyOverflow: string | null = null;

const lockBodyScroll = (): (() => void) => {
  if (activeDialogScrollLocks === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  activeDialogScrollLocks += 1;

  let released = false;
  return () => {
    if (released) return;

    released = true;
    activeDialogScrollLocks -= 1;
    if (activeDialogScrollLocks === 0) {
      document.body.style.overflow = originalBodyOverflow ?? "";
      originalBodyOverflow = null;
    }
  };
};

/**
 * 共通ダイアログコンポーネント
 *
 * - 背景をぼかして元のコンテンツが見える
 * - 外クリックでダイアログを閉じる
 * - ESCキーでダイアログを閉じる
 * - ダークモード対応
 *
 * @default undefined
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
  hideCloseButton = false,
  disableOutsideClick = false,
  closeButtonLabel = "Close dialog",
  ariaLabel = "Dialog",
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEscapeKey(onClose, open);
  useFocusTrap(dialogRef, open, { initialFocusRef: closeButtonRef });

  useEffect(() => {
    if (!open) return;

    return lockBodyScroll();
  }, [open]);

  // 外クリックでダイアログを閉じる
  const handleBackdropClick = () => {
    if (!disableOutsideClick) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--kui-z-modal)] overflow-y-auto flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4"
      style={{
        backgroundColor: "var(--kui-color-overlay)",
        backdropFilter: "blur(2px)",
      }}
    >
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 cursor-default"
        disabled={disableOutsideClick}
        onClick={handleBackdropClick}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : ariaLabel}
        aria-labelledby={title ? titleId : undefined}
        ref={dialogRef}
        className={cn(
          "relative bg-surface rounded-lg shadow-xl w-full transform transition-all duration-200 ease-out",
          maxWidthClasses[maxWidth],
          className,
        )}
      >
        {/* ヘッダー */}
        {(title || !hideCloseButton) && (
          <div className="flex justify-between items-center p-6 pb-4">
            {title && (
              <h3
                id={titleId}
                className="text-lg font-semibold text-foreground"
              >
                {title}
              </h3>
            )}
            {!hideCloseButton && (
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="text-muted hover:text-foreground transition-colors p-1"
                aria-label={closeButtonLabel}
              >
                {/* XMarkIcon インラインSVG */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* コンテンツ */}
        <div className={title || !hideCloseButton ? "px-6 pb-6" : "p-6"}>
          {children}
        </div>
      </div>
    </div>
  );
};
