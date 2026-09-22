"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/Button";
import { Price } from "../../atoms/Price";
import { Typography } from "../../atoms/Typography";

/** 比較トレイに表示する物件 */
export interface CompareTrayItem {
  /** 物件ID */
  id: string;
  /** 物件名 */
  title: string;
  /** サムネイル画像URL */
  imageUrl?: string;
  /** 賃料（円/月） */
  rent?: number;
}

export interface CompareTrayProps {
  /** 比較対象の物件 */
  items: CompareTrayItem[];
  /** 削除時 */
  onRemove: (id: string) => void;
  /** すべてクリア */
  onClear?: () => void;
  /** 比較実行 */
  onCompare: () => void;
  /** 最大件数。 @default 4 */
  maxItems?: number;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * CompareTray コンポーネント
 *
 * 比較対象に追加した物件を画面下部にまとめて表示するトレイ。
 * 対象が0件のときは何も描画しない。
 *
 * @example
 * <CompareTray
 *   items={compareItems}
 *   onRemove={removeFromCompare}
 *   onClear={clearCompare}
 *   onCompare={openCompare}
 * />
 */
export const CompareTray: React.FC<CompareTrayProps> = ({
  items,
  onRemove,
  onClear,
  onCompare,
  maxItems = 4,
  className,
}) => {
  if (items.length === 0) return null;

  const canCompare = items.length >= 2;

  return (
    <aside
      aria-label="比較リスト"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--kui-z-drawer)] border-t border-border bg-surface shadow-xl",
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Typography variant="label" tone="muted">
            {`比較中 ${items.length} / ${maxItems} 件`}
          </Typography>
          <ul className="flex gap-2 overflow-x-auto">
            {items.map((item) => (
              <li
                key={item.id}
                className="relative flex w-40 shrink-0 items-center gap-2 rounded-md border border-border bg-surface-raised p-2"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="h-10 w-10 shrink-0 rounded bg-surface-sunken"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <Typography variant="caption" truncate>
                    {item.title}
                  </Typography>
                  {item.rent !== undefined && (
                    <Price value={item.rent} size="sm" tone="primary" />
                  )}
                </div>
                <button
                  type="button"
                  aria-label={`${item.title}を比較から削除`}
                  onClick={() => onRemove(item.id)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-surface text-muted hover:bg-surface-sunken"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {onClear && (
            <Button variant="ghost" size="small" onClick={onClear}>
              クリア
            </Button>
          )}
          <Button
            variant="primary"
            size="small"
            disabled={!canCompare}
            onClick={onCompare}
          >
            比較する
          </Button>
        </div>
      </div>
    </aside>
  );
};
