"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

/** 設備アイテム */
export interface FacilityItem {
  /** 一意なキー */
  key: string;
  /** 設備名 */
  label: string;
  /** アイコン（省略時はチェックアイコン） */
  icon?: React.ReactNode;
  /** 利用可能か。false の場合はグレー表示。 @default true */
  available?: boolean;
}

/** FacilityList のサイズ */
export type FacilityListSize = "sm" | "md";

export interface FacilityListProps {
  /** 設備一覧 */
  items: FacilityItem[];
  /** グリッドのカラム数。 @default 2 */
  columns?: 1 | 2 | 3 | 4;
  /** サイズ。 @default "md" */
  size?: FacilityListSize;
  /** 見出し */
  title?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

const columnStyles: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const sizeStyles: Record<FacilityListSize, string> = {
  sm: "text-xs",
  md: "text-sm",
};

const gapStyles: Record<FacilityListSize, string> = {
  sm: "gap-x-3 gap-y-1.5",
  md: "gap-x-4 gap-y-2",
};

const itemGapStyles: Record<FacilityListSize, string> = {
  sm: "gap-1.5",
  md: "gap-2",
};

const iconWrapStyles: Record<FacilityListSize, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
};

const DefaultIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
    className="h-full w-full"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
  </svg>
);

/**
 * FacilityList コンポーネント
 *
 * 物件の設備・こだわり条件をアイコン付きで一覧表示する。
 *
 * @example
 * <FacilityList
 *   items={[
 *     { key: "bath", label: "バス・トイレ別" },
 *     { key: "parking", label: "駐車場", available: false },
 *   ]}
 * />
 */
export const FacilityList: React.FC<FacilityListProps> = ({
  items,
  columns = 2,
  size = "md",
  title,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title && (
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      )}
      <ul
        className={cn(
          "grid",
          columnStyles[columns],
          sizeStyles[size],
          gapStyles[size],
        )}
      >
        {items.map((item) => {
          const available = item.available ?? true;
          return (
            <li
              key={item.key}
              className={cn(
                "flex items-center",
                itemGapStyles[size],
                available ? "text-foreground" : "text-muted line-through",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full",
                  iconWrapStyles[size],
                  available
                    ? "bg-success-subtle text-success-main"
                    : "bg-surface-sunken text-muted",
                )}
              >
                {item.icon ?? <DefaultIcon />}
              </span>
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
