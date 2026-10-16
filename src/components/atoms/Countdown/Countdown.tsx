"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** カウントダウンの文字サイズ。 @default undefined */
export type CountdownSize = "sm" | "md" | "lg";

/** カウントダウンのプロパティ。 @default undefined */
export interface CountdownProps {
  /** 目標日（出発日など）。 @default undefined */
  targetDate: string | Date;
  /** 現在時刻（テスト用の差し替え）。 @default new Date() */
  now?: Date;
  /** 目標の説明。 @default undefined */
  label?: string;
  /** 文字サイズ。 @default "md" */
  size?: CountdownSize;
  /** この日数より先なら何も表示しない。 @default undefined */
  maxDays?: number;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

const sizeStyles: Record<CountdownSize, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
};

/** 日時を JST の暦日（UTC 0時のタイムスタンプ）に丸める。 */
function toJstDateOnly(value: string | Date): number {
  const date = typeof value === "string" ? new Date(value) : value;
  const jst = new Date(date.getTime() + JST_OFFSET_MS);
  return Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate());
}

/** JST の暦日で目標日までの残り日数を返す。 */
export function countdownDays(target: string | Date, now: Date): number {
  return Math.round((toJstDateOnly(target) - toJstDateOnly(now)) / MS_PER_DAY);
}

/**
 * 出発までの残り日数を表示するコンポーネント。
 *
 * スクリーンリーダーで毎秒読み上げられないよう aria-live は付けない（§7.3）。
 */
export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  now = new Date(),
  label,
  size = "md",
  maxDays,
  className,
}) => {
  const days = countdownDays(targetDate, now);
  if (maxDays !== undefined && days > maxDays) return null;

  const isToday = days <= 0;
  const accessibleLabel = isToday
    ? `${label ?? "カウントダウン"} 今日`
    : `${label ?? "カウントダウン"} あと${days}日`;

  return (
    <div
      role="timer"
      aria-label={accessibleLabel}
      className={cn("inline-flex flex-col items-start", className)}
    >
      {label && <span className="text-sm text-muted">{label}</span>}
      <span
        aria-hidden="true"
        className={cn(
          "font-semibold tabular-nums",
          isToday ? "text-accent-main" : "text-foreground",
          sizeStyles[size],
        )}
      >
        {isToday ? (
          "今日"
        ) : (
          <>
            あと<span className="mx-0.5">{days}</span>日
          </>
        )}
      </span>
    </div>
  );
};
