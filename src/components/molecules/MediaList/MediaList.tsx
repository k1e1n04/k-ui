"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Skeleton } from "../../atoms/Skeleton";
import { EmptyState } from "../../templates/EmptyState";
import { MediaCard, type MediaCardProps } from "../MediaCard";

/** 一覧に表示するアイテム */
export type MediaListItem = MediaCardProps & { id: string };

export interface MediaListProps {
  /** アイテム一覧 */
  items: MediaListItem[];
  /** グリッドのカラム数。 @default 1 */
  columns?: 1 | 2 | 3;
  /** 読み込み中か */
  loading?: boolean;
  /** 読み込み中に表示するスケルトン数。 @default 4 */
  loadingCount?: number;
  /** 空状態のタイトル。 @default "表示できる項目がありません" */
  emptyTitle?: string;
  /** 空状態の説明 */
  emptyDescription?: string;
  /** 空状態のアクション */
  emptyAction?: React.ReactNode;
  /** お気に入り状態のID一覧 */
  favoriteIds?: string[];
  /** お気に入り変更時 */
  onFavoriteChange?: (id: string, favorite: boolean) => void;
  /** 強調表示するアイテムのID */
  highlightedId?: string;
  /** 選択中アイテムのID一覧 */
  selectedIds?: string[];
  /** 選択変更時 */
  onSelectedChange?: (id: string, selected: boolean) => void;
  /** アイテムクリック時 */
  onItemClick?: (id: string) => void;
  /** 追加のクラス名 */
  className?: string;
}

const columnStyles: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
};

const CardSkeleton: React.FC = () => (
  <div className="overflow-hidden rounded-lg border border-border bg-surface">
    <Skeleton variant="rectangular" className="h-48 rounded-none" />
    <div className="flex flex-col gap-3 p-4">
      <Skeleton width="50%" height="1.5rem" />
      <Skeleton width="80%" />
      <Skeleton width="60%" />
      <div className="flex gap-4 pt-2">
        <Skeleton width="3rem" />
        <Skeleton width="3rem" />
        <Skeleton width="3rem" />
      </div>
    </div>
  </div>
);

/**
 * MediaList コンポーネント
 *
 * MediaCard をグリッド表示する汎用リスト。読み込み中はスケルトン、
 * 0件時は空状態を表示する。
 *
 * @example
 * <MediaList
 *   items={items}
 *   columns={2}
 *   loading={isLoading}
 *   favoriteIds={favoriteIds}
 *   onFavoriteChange={handleFavorite}
 * />
 */
export const MediaList: React.FC<MediaListProps> = ({
  items,
  columns = 1,
  loading = false,
  loadingCount = 4,
  emptyTitle = "表示できる項目がありません",
  emptyDescription = "条件を変更して、もう一度お試しください。",
  emptyAction,
  favoriteIds,
  onFavoriteChange,
  highlightedId,
  selectedIds,
  onSelectedChange,
  onItemClick,
  className,
}) => {
  if (loading) {
    return (
      <div
        role="status"
        aria-label="読み込み中"
        className={cn("grid gap-4", columnStyles[columns], className)}
      >
        {Array.from(
          { length: loadingCount },
          (_, index) => `media-skeleton-${index}`,
        ).map((key) => (
          <CardSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
        className={className}
      />
    );
  }

  return (
    <div className={cn("grid gap-4", columnStyles[columns], className)}>
      {items.map(({ id, ...item }) => (
        <MediaCard
          key={id}
          id={id}
          {...item}
          favorite={favoriteIds?.includes(id) ?? false}
          onFavoriteChange={
            onFavoriteChange
              ? (favorite) => onFavoriteChange(id, favorite)
              : undefined
          }
          highlighted={highlightedId === id}
          selectable={Boolean(onSelectedChange) || item.selectable}
          selected={selectedIds?.includes(id) ?? false}
          onSelectedChange={
            onSelectedChange
              ? (selected) => onSelectedChange(id, selected)
              : undefined
          }
          onClick={onItemClick ? () => onItemClick(id) : undefined}
        />
      ))}
    </div>
  );
};
