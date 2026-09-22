"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/Button";
import { Typography } from "../../atoms/Typography";

/** 選択トレイに表示するアイテム */
export interface SelectionTrayItem {
  /** 一意なID */
  id: string;
  /** ラベル */
  label: React.ReactNode;
  /** 補足情報 */
  description?: React.ReactNode;
  /** サムネイル画像URL */
  imageUrl?: string;
}

export interface SelectionTrayProps {
  /** 選択中アイテム */
  items: SelectionTrayItem[];
  /** 削除時 */
  onRemove: (id: string) => void;
  /** すべてクリア */
  onClear?: () => void;
  /** 確定時の処理 */
  onConfirm: () => void;
  /** 確定ボタンのラベル。 @default "実行する" */
  confirmLabel?: string;
  /** クリアボタンのラベル。 @default "クリア" */
  clearLabel?: string;
  /** 最大件数。 @default 4 */
  maxItems?: number;
  /** 確定に必要な最小件数。 @default 2 */
  minItems?: number;
  /** 件数表示のフォーマッター */
  formatCount?: (count: number, max: number) => React.ReactNode;
  /** 削除ボタンのアクセシブルなラベル */
  removeLabel?: (item: SelectionTrayItem) => string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * SelectionTray コンポーネント
 *
 * 選択したアイテムを画面下部にまとめて表示する汎用トレイ。
 * アイテムが0件のときは何も描画しない。
 *
 * @example
 * <SelectionTray
 *   items={selected}
 *   onRemove={remove}
 *   onClear={clear}
 *   onConfirm={openComparison}
 *   confirmLabel="比較する"
 * />
 */
export const SelectionTray: React.FC<SelectionTrayProps> = ({
  items,
  onRemove,
  onClear,
  onConfirm,
  confirmLabel = "実行する",
  clearLabel = "クリア",
  maxItems = 4,
  minItems = 2,
  formatCount,
  removeLabel,
  className,
}) => {
  if (items.length === 0) return null;

  const canConfirm = items.length >= minItems;

  return (
    <aside
      aria-label="選択リスト"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--kui-z-drawer)] border-t border-border bg-surface shadow-xl",
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Typography variant="label" tone="muted">
            {formatCount
              ? formatCount(items.length, maxItems)
              : `選択中 ${items.length} / ${maxItems} 件`}
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
                    {item.label}
                  </Typography>
                  {item.description && (
                    <Typography variant="caption" tone="muted" truncate>
                      {item.description}
                    </Typography>
                  )}
                </div>
                <button
                  type="button"
                  aria-label={removeLabel ? removeLabel(item) : "選択から削除"}
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
              {clearLabel}
            </Button>
          )}
          <Button
            variant="primary"
            size="small"
            disabled={!canConfirm}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </aside>
  );
};
