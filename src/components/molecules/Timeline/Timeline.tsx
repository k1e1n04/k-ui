"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
import {
  TIMELINE_SLOT_LABELS,
  TIMELINE_SLOTS,
  type TimelineSlot,
} from "../../../utils/travel";

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
  /** ざっくりしおりの時間帯。 @default undefined */
  slot?: TimelineSlot;
}

/** タイムライン項目の配置。 @default undefined */
export type TimelineAlign = "left" | "right" | "alternate";

/** 縦方向タイムラインのプロパティ。 @default undefined */
export interface TimelineProps {
  /** 項目一覧。 @default undefined */
  items: TimelineItem[];
  /** 項目の配置。 @default "left" */
  align?: TimelineAlign;
  /** 時間帯ごとにまとめて見出しを付ける。 @default false */
  groupBySlot?: boolean;
  /** 並べ替え用のハンドルを表示する。 @default false */
  showHandles?: boolean;
  /** ハンドルを押した時の処理。 @default undefined */
  onHandlePointerDown?: (
    index: number,
    event: React.PointerEvent<HTMLButtonElement>,
  ) => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 並べ替えハンドルのアイコン。 @default undefined */
const GripIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="size-4"
  >
    <circle cx="9" cy="6" r="1.5" />
    <circle cx="15" cy="6" r="1.5" />
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="15" cy="18" r="1.5" />
  </svg>
);

interface SlotGroup {
  slot?: TimelineSlot;
  entries: { item: TimelineItem; index: number }[];
}

/** 時間帯の順に項目をまとめる。時間帯が無い項目は最後にまとめる。 */
function groupItemsBySlot(items: TimelineItem[]): SlotGroup[] {
  const groups: SlotGroup[] = TIMELINE_SLOTS.map((slot) => ({
    slot,
    entries: items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.slot === slot),
  })).filter((group) => group.entries.length > 0);
  const unscheduled = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.slot === undefined);
  if (unscheduled.length > 0)
    groups.push({ slot: undefined, entries: unscheduled });
  return groups;
}

/** 項目を縦の接続線に沿って配置するタイムライン。 @default undefined */
export const Timeline: React.FC<TimelineProps> = ({
  items,
  align = "left",
  groupBySlot = false,
  showHandles = false,
  onHandlePointerDown,
  className,
}) => {
  const renderItem = (
    item: TimelineItem,
    index: number,
    rightAligned: boolean,
  ) => (
    <li
      key={item.id ?? `${item.slot ?? "none"}-${index}-${String(item.title)}`}
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
      {showHandles && (
        <button
          type="button"
          aria-label="ドラッグして並べ替え"
          onPointerDown={(event) => onHandlePointerDown?.(index, event)}
          className="flex size-11 shrink-0 cursor-grab items-center justify-center rounded-md text-muted hover:bg-surface-sunken"
        >
          <GripIcon />
        </button>
      )}
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

  if (groupBySlot) {
    const groups = groupItemsBySlot(items);
    return (
      <section
        aria-label="タイムライン"
        className={cn("flex flex-col gap-6", className)}
      >
        {groups.map((group) => {
          const heading = group.slot
            ? TIMELINE_SLOT_LABELS[group.slot]
            : "時間帯未定";
          return (
            <section key={group.slot ?? "unscheduled"} aria-label={heading}>
              <h3 className="mb-3 text-sm font-semibold text-muted">
                {heading}
              </h3>
              <ol className="flex flex-col">
                {group.entries.map(({ item, index }) =>
                  renderItem(item, index, false),
                )}
              </ol>
            </section>
          );
        })}
      </section>
    );
  }

  return (
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
        return renderItem(item, index, rightAligned);
      })}
    </ol>
  );
};
