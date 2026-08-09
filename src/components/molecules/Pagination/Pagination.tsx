"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
/** ページネーションのプロパティ。 @default undefined */
export interface PaginationProps {
  /** 現在のページ番号。 @default undefined */
  page: number;
  /** 総ページ数。 @default undefined */
  totalPages: number;
  /** ページ変更時の処理。 @default undefined */
  onChange: (page: number) => void;
  /** 現在ページの両側に表示するページ数。 @default 2 */
  siblingCount?: number;
  /** 前ページボタンのラベル。 @default "前のページ" */
  previousLabel?: string;
  /** 次ページボタンのラベル。 @default "次のページ" */
  nextLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** ページ移動のためのアクセシブルなページネーション。 @default undefined */
export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  siblingCount = 2,
  previousLabel = "前のページ",
  nextLabel = "次のページ",
  className,
}) => {
  const pageCount = Math.max(
    1,
    Math.floor(Number.isFinite(totalPages) ? totalPages : 1),
  );
  const currentPage = Math.min(
    Math.max(1, Math.floor(Number.isFinite(page) ? page : 1)),
    pageCount,
  );
  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  ).filter(
    (item) =>
      item === 1 ||
      item === pageCount ||
      Math.abs(item - currentPage) <= siblingCount,
  );
  const items: Array<number | "ellipsis"> = [];
  pages.forEach((item, index) => {
    if (index > 0 && item - pages[index - 1] > 1) items.push("ellipsis");
    items.push(item);
  });
  return (
    <nav
      aria-label="ページネーション"
      className={cn("flex items-center gap-1", className)}
    >
      <button
        type="button"
        aria-label={previousLabel}
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        className="rounded px-3 py-2 text-sm hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50"
      >
        ‹
      </button>
      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${items[index + 1]}`}
            className="px-2 text-muted"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`${item}ページ`}
            aria-current={item === currentPage ? "page" : undefined}
            onClick={() => onChange(item)}
            className={cn(
              "rounded px-3 py-2 text-sm hover:bg-surface-sunken",
              item === currentPage &&
                "bg-primary-main text-inverse hover:bg-primary-main",
            )}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label={nextLabel}
        disabled={currentPage >= pageCount}
        onClick={() => onChange(currentPage + 1)}
        className="rounded px-3 py-2 text-sm hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50"
      >
        ›
      </button>
    </nav>
  );
};
