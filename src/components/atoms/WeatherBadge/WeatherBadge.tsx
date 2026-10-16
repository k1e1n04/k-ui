"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** 天気の種別。 @default undefined */
export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "snowy"
  | "unknown";

/** 天気バッジのプロパティ。 @default undefined */
export interface WeatherBadgeProps {
  /** 天気。 @default undefined */
  condition: WeatherCondition;
  /** 気温（摂氏）。 @default undefined */
  temperature?: number;
  /** ラベルの上書き。 @default undefined */
  label?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

const conditionLabels: Record<WeatherCondition, string> = {
  sunny: "晴れ",
  cloudy: "くもり",
  rainy: "雨",
  snowy: "雪",
  unknown: "不明",
};

/** 色だけで伝えないよう、必ずアイコンとラベルを添える（§7.3）。 */
const conditionStyles: Record<WeatherCondition, string> = {
  sunny: "bg-warning-subtle text-warning-main",
  cloudy: "bg-surface-sunken text-foreground",
  rainy: "bg-info-subtle text-info-main",
  snowy: "bg-info-subtle text-info-main",
  unknown: "bg-surface-sunken text-muted",
};

const WeatherIcon: React.FC<{ condition: WeatherCondition }> = ({
  condition,
}) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "size-4 shrink-0",
  };
  if (condition === "sunny") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }
  if (condition === "rainy") {
    return (
      <svg {...common}>
        <path d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.6 1.3A3.5 3.5 0 0 1 16 15Z" />
        <path d="M8 19l1-2M12 19l1-2M16 19l1-2" />
      </svg>
    );
  }
  if (condition === "snowy") {
    return (
      <svg {...common}>
        <path d="M7 14a4 4 0 0 1 0-8 5 5 0 0 1 9.6 1.3A3.5 3.5 0 0 1 16 14Z" />
        <path d="M9 18h.01M12 20h.01M15 18h.01" />
      </svg>
    );
  }
  if (condition === "cloudy") {
    return (
      <svg {...common}>
        <path d="M7 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6 1.3A3.5 3.5 0 0 1 16 17Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10l6 4M15 10l-6 4" />
    </svg>
  );
};

/** 天気をアイコンとラベルで表示するバッジ。 */
export const WeatherBadge: React.FC<WeatherBadgeProps> = ({
  condition,
  temperature,
  label,
  className,
}) => {
  const text = label ?? conditionLabels[condition];
  const ariaLabel =
    temperature === undefined ? text : `${text} ${temperature}度`;
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        conditionStyles[condition],
        className,
      )}
    >
      <WeatherIcon condition={condition} />
      <span>{text}</span>
      {temperature !== undefined && (
        <span className="tabular-nums">{temperature}°</span>
      )}
    </span>
  );
};
