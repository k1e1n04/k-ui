"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** タイムライン項目。 @default undefined */
export interface TimelineItem {
  /** 項目の一意な識別子。 @default undefined */
  id?: string;
  /** 見出し。 @default undefined */
  title: React.ReactNode;
  /** 時刻表示。 @default undefined */
  timestamp?: React.ReactNode;
  /** 詳細内容。 @default undefined */
  content?: React.ReactNode;
  /** アイコン。 @default undefined */
  icon?: React.ReactNode;
}

/** タイムライン項目の配置。 @default undefined */
export type TimelineAlign = "left" | "right" | "alternate";

/** 縦方向タイムラインのプロパティ。 @default undefined */
export interface TimelineProps {
  /** 項目一覧。 @default undefined */
  items: TimelineItem[];
  /** 項目の配置。 @default "left" */
  align?: TimelineAlign;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 項目を縦の接続線に沿って配置するタイムライン。 @default undefined */
export const Timeline: React.FC<TimelineProps> = ({
  items,
  align = "left",
  className,
}) => (
  <ol
    aria-label="タイムライン"
    className={cn(
      "flex flex-col",
      align === "alternate" && "items-center",
      align === "right" && "items-end",
      className,
    )}
  >
    {items.map((item, index) => {
      const rightAligned =
        align === "right" || (align === "alternate" && index % 2 === 1);
      return (
        <li
          key={item.id ?? String(item.title)}
          className={cn(
            "relative flex w-full max-w-2xl gap-3 border-l border-border pb-6 pl-6 last:pb-0",
            rightAligned &&
              "flex-row-reverse border-l-0 border-r pr-6 pl-0 text-right",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-0 flex size-4 items-center justify-center rounded-full border border-primary-main bg-surface text-xs text-primary-main",
              rightAligned ? "-right-2" : "-left-2",
            )}
          >
            {item.icon ?? ""}
          </span>
          <div className="min-w-0">
            <h3 className="font-medium text-foreground">{item.title}</h3>
            {item.timestamp && (
              <time className="block text-sm text-muted">{item.timestamp}</time>
            )}
            {item.content && (
              <div className="mt-1 text-sm text-foreground">{item.content}</div>
            )}
          </div>
        </li>
      );
    })}
  </ol>
);
