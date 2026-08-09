"use client";

import type React from "react";
import { useId } from "react";
import { cn } from "../../../utils/cn";
/** タブ項目（フラット props 用）。 @default undefined */
export interface TabItem {
  /** 項目を識別する値。 @default undefined */
  value: string;
  /** タブのラベル。 @default undefined */
  label: React.ReactNode;
  /** タブパネルの内容。 @default undefined */
  content: React.ReactNode;
  /** 無効状態。 @default false */
  disabled?: boolean;
}
/** タブのプロパティ。 @default undefined */
export interface TabsProps {
  /** 項目一覧。 @default undefined */
  items: TabItem[];
  /** 選択中の値。 @default undefined */
  value: string;
  /** 選択値変更時の処理。 @default undefined */
  onChange: (value: string) => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** ARIA タブパターンと矢印キー操作に対応するタブ。 @default undefined */
export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  className,
}) => {
  const baseId = useId();
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  );
  const selectNext = (index: number, direction: number) => {
    let next = index;
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length;
      if (!items[next].disabled) return next;
    }
    return index;
  };
  const activeItem = items[selectedIndex];
  return (
    <div className={className}>
      <div role="tablist" className="flex border-b border-border">
        {items.map((item, index) => (
          <button
            key={item.value}
            id={`${baseId}-${item.value}-tab`}
            type="button"
            role="tab"
            aria-selected={item.value === value}
            aria-controls={`${baseId}-${item.value}-panel`}
            tabIndex={item.value === value ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const next = selectNext(
                  index,
                  event.key === "ArrowRight" ? 1 : -1,
                );
                onChange(items[next].value);
                event.currentTarget.parentElement
                  ?.querySelectorAll<HTMLButtonElement>("[role=tab]")
                  [next]?.focus();
              }
            }}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-medium",
              item.value === value
                ? "border-primary-main text-primary-main"
                : "border-transparent text-muted hover:text-foreground",
              item.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {activeItem && (
        <div
          id={`${baseId}-${activeItem.value}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-${activeItem.value}-tab`}
          className="py-4"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};
