"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** オフライン通知バナーのプロパティ。 @default undefined */
export interface OfflineBannerProps {
  /** オフラインかどうか。 @default undefined */
  offline: boolean;
  /** 表示メッセージ。 @default "オフラインです。変更は接続後に送信されます。" */
  message?: string;
  /** 再試行時の処理。 @default undefined */
  onRetry?: () => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** オフライン中であることと、未送信の扱いを伝えるバナー（§7.3）。 */
export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  offline,
  message = "オフラインです。変更は接続後に送信されます。",
  onRetry,
  className,
}) => {
  if (!offline) return null;
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-3 rounded-md border border-warning-main/25 bg-warning-subtle px-3 py-2 text-sm text-foreground",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-5 shrink-0 text-warning-main"
      >
        <path d="M3 3l18 18" />
        <path d="M8.5 16.5a5 5 0 0 1 7 0" />
        <path d="M5 12.5a10 10 0 0 1 3-2" />
        <path d="M16 10.5a10 10 0 0 1 3 2" />
        <path d="M12 20h.01" />
      </svg>
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 rounded-md px-3 font-medium text-warning-main transition-colors hover:bg-warning-subtle"
        >
          再試行
        </button>
      )}
    </div>
  );
};
