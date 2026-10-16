"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";

/** カルーセルの項目。 @default undefined */
export interface CarouselItem {
  /** 一意な識別子。 @default undefined */
  id: string;
  /** スライドの内容。 @default undefined */
  content: React.ReactNode;
  /** スクリーンリーダー向けのラベル。 @default undefined */
  label?: string;
}

/** カルーセルのプロパティ。 @default undefined */
export interface CarouselProps {
  /** 項目一覧。 @default undefined */
  items: CarouselItem[];
  /** グループのラベル。 @default "カルーセル" */
  ariaLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 横スクロールのスライドを前後ボタンとドットで切り替える。 */
export const Carousel: React.FC<CarouselProps> = ({
  items,
  ariaLabel = "カルーセル",
  className,
}) => {
  const [index, setIndex] = useState(0);
  const count = items.length;
  if (count === 0) return null;
  const current = Math.min(Math.max(index, 0), count - 1);
  const goTo = (next: number) =>
    setIndex(Math.min(Math.max(next, 0), count - 1));

  return (
    <section
      aria-roledescription="カルーセル"
      aria-label={ariaLabel}
      className={cn("flex flex-col gap-3", className)}
    >
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-[var(--kui-duration-base)] ease-standard"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <li
              key={item.id}
              aria-hidden={i !== current}
              aria-label={item.label}
              className="w-full shrink-0"
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="前へ"
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <ul className="flex items-center gap-1.5">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={`${i + 1}番目を表示`}
                aria-current={i === current ? "true" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "flex min-h-11 min-w-6 items-center justify-center rounded-full",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block size-2.5 rounded-full",
                    i === current ? "bg-accent-main" : "bg-border-strong",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="次へ"
          disabled={current === count - 1}
          onClick={() => goTo(current + 1)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
};
