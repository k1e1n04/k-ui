"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** 生成ログの状態。 @default undefined */
export type GenerationLogStatus = "pending" | "done" | "error";

/** 生成ログの行。 @default undefined */
export interface GenerationLogItem {
  /** 一意な識別子。 @default undefined */
  id: string;
  /** 表示メッセージ。 @default undefined */
  message: React.ReactNode;
  /** 進行状況。 @default "pending" */
  status?: GenerationLogStatus;
}

/** 生成ログのプロパティ。 @default undefined */
export interface GenerationLogProps {
  /** 行一覧。 @default undefined */
  items: GenerationLogItem[];
  /** ラベル。 @default "生成の進捗" */
  ariaLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

const StatusIcon: React.FC<{ status: GenerationLogStatus }> = ({ status }) => {
  if (status === "done") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4 shrink-0 text-success-main"
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
    );
  }
  if (status === "error") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4 shrink-0 text-danger-main"
      >
        <path d="M12 8v5" />
        <path d="M12 17h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="size-4 shrink-0 animate-kui-spin rounded-full border-2 border-border border-t-primary-main"
    />
  );
};

/**
 * 生成中のツールログ。レイアウトがガタつかないよう高さを先に確保する（§7.1）。
 * スクリーンリーダーには polite で読み上げる（§7.3）。
 */
export const GenerationLog: React.FC<GenerationLogProps> = ({
  items,
  ariaLabel = "生成の進捗",
  className,
}) => (
  <div
    role="log"
    aria-live="polite"
    aria-label={ariaLabel}
    className={cn(
      "flex min-h-28 flex-col gap-2 rounded-md border border-border bg-surface-raised p-3",
      className,
    )}
  >
    {items.map((item) => {
      const status = item.status ?? "pending";
      return (
        <p
          key={item.id}
          className="flex items-center gap-2 text-sm text-foreground"
        >
          <StatusIcon status={status} />
          <span className="min-w-0">{item.message}</span>
        </p>
      );
    })}
  </div>
);
