"use client";

import type React from "react";
import { useRef } from "react";
import { cn } from "../../../utils/cn";

/** 並べ替え可能なリストの項目。 @default undefined */
export interface SortableListItem {
  /** 一意な識別子。 @default undefined */
  id: string;
  /** 項目の内容。 @default undefined */
  content: React.ReactNode;
}

/** 並べ替え可能なリストのプロパティ。 @default undefined */
export interface SortableListProps {
  /** 項目一覧。 @default undefined */
  items: SortableListItem[];
  /** 並べ替え時の処理。 @default undefined */
  onReorder: (from: number, to: number) => void;
  /** リストのラベル。 @default "並べ替え可能なリスト" */
  ariaLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** ドラッグのハンドルアイコン。 @default undefined */
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

/**
 * ドラッグとキーボードの両方で並べ替えられるリスト（§7.1）。
 * ドラッグできない人のために「上へ／下へ」も用意する。
 */
export const SortableList: React.FC<SortableListProps> = ({
  items,
  onReorder,
  ariaLabel = "並べ替え可能なリスト",
  className,
}) => {
  const dragging = useRef<number | null>(null);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    onReorder(from, to);
  };

  return (
    <ul aria-label={ariaLabel} className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center gap-2 rounded-md border border-border bg-surface p-2"
        >
          <button
            type="button"
            draggable
            aria-label={`${item.id} を並べ替え`}
            onDragStart={() => {
              dragging.current = index;
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (dragging.current !== null) move(dragging.current, index);
              dragging.current = null;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                move(index, index - 1);
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                move(index, index + 1);
              }
            }}
            className="flex size-11 shrink-0 cursor-grab items-center justify-center rounded-md text-muted hover:bg-surface-sunken"
          >
            <GripIcon />
          </button>
          <div className="min-w-0 flex-1">{item.content}</div>
          <div className="flex shrink-0">
            <button
              type="button"
              aria-label={`${item.id} を上へ`}
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
              className="min-h-11 rounded-md px-2 text-sm text-foreground hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
            >
              上へ
            </button>
            <button
              type="button"
              aria-label={`${item.id} を下へ`}
              disabled={index === items.length - 1}
              onClick={() => move(index, index + 1)}
              className="min-h-11 rounded-md px-2 text-sm text-foreground hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
            >
              下へ
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
