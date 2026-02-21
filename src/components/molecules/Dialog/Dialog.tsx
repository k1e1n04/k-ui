"use client";

import type { ReactNode } from "react";
import React, { useEffect, useRef } from "react";

import { cn } from "../../../utils/cn";

/** ダイアログの最大幅 */
export type DialogMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";

export interface DialogProps {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログを閉じる関数 */
  onClose: () => void;
  /** ダイアログのタイトル */
  title?: string;
  /** ダイアログのコンテンツ */
  children: ReactNode;
  /** ダイアログの最大幅 */
  maxWidth?: DialogMaxWidth;
  /** 閉じるボタンを非表示にするかどうか */
  hideCloseButton?: boolean;
  /** 外クリックで閉じることを無効にするかどうか */
  disableOutsideClick?: boolean;
  /** 閉じるボタンのaria-label */
  closeButtonLabel?: string;
  /** 追加のクラス名 */
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

/**
 * 共通ダイアログコンポーネント
 *
 * - 背景をぼかして元のコンテンツが見える
 * - 外クリックでダイアログを閉じる
 * - ESCキーでダイアログを閉じる
 * - ダークモード対応
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
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESCキーでダイアログを閉じる
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  // 外クリックでダイアログを閉じる
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !disableOutsideClick &&
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4"
      style={{
        backgroundColor: "var(--kui-color-overlay)",
        backdropFilter: "blur(2px)",
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        className={cn(
          "bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full transform transition-all duration-200 ease-out",
          maxWidthClasses[maxWidth],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        {(title || !hideCloseButton) && (
          <div className="flex justify-between items-center p-6 pb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {!hideCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 transition-colors p-1"
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
