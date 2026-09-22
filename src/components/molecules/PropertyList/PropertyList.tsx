"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Skeleton } from "../../atoms/Skeleton";
import { EmptyState } from "../../templates/EmptyState";
import { type Property, PropertyCard } from "../PropertyCard";

export interface PropertyListProps {
  /** 物件一覧 */
  properties: Property[];
  /** グリッドのカラム数。 @default 1 */
  columns?: 1 | 2 | 3;
  /** 読み込み中か */
  loading?: boolean;
  /** 読み込み中に表示するスケルトン数。 @default 4 */
  loadingCount?: number;
  /** 空状態のタイトル。 @default "条件に一致する物件がありません" */
  emptyTitle?: string;
  /** 空状態の説明 */
  emptyDescription?: string;
  /** 空状態のアクション */
  emptyAction?: React.ReactNode;
  /** お気に入り状態のID一覧 */
  favoriteIds?: string[];
  /** お気に入り変更時 */
  onFavoriteChange?: (id: string, favorite: boolean) => void;
  /** 選択中の物件ID */
  selectedId?: string;
  /** 比較対象のID一覧 */
  comparedIds?: string[];
  /** 比較対象の変更時 */
  onCompareChange?: (id: string, compared: boolean) => void;
  /** 物件カードクリック時 */
  onPropertyClick?: (id: string) => void;
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
 * PropertyList コンポーネント
 *
 * 物件カードを一覧表示する。読み込み中はスケルトン、0件時は空状態を表示する。
 *
 * @example
 * <PropertyList
 *   properties={properties}
 *   columns={2}
 *   loading={isLoading}
 *   favoriteIds={favoriteIds}
 *   onFavoriteChange={handleFavorite}
 *   onPropertyClick={handleClick}
 * />
 */
export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  columns = 1,
  loading = false,
  loadingCount = 4,
  emptyTitle = "条件に一致する物件がありません",
  emptyDescription = "検索条件を変更して、もう一度お試しください。",
  emptyAction,
  favoriteIds,
  onFavoriteChange,
  selectedId,
  comparedIds,
  onCompareChange,
  onPropertyClick,
  className,
}) => {
  if (loading) {
    return (
      <div
        role="status"
        aria-label="物件を読み込み中"
        className={cn("grid gap-4", columnStyles[columns], className)}
      >
        {Array.from(
          { length: loadingCount },
          (_, index) => `property-skeleton-${index}`,
        ).map((key) => (
          <CardSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
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
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          {...property}
          favorite={favoriteIds?.includes(property.id) ?? false}
          onFavoriteChange={
            onFavoriteChange
              ? (favorite) => onFavoriteChange(property.id, favorite)
              : undefined
          }
          selected={selectedId === property.id}
          compared={comparedIds?.includes(property.id) ?? false}
          onCompareChange={
            onCompareChange
              ? (compared) => onCompareChange(property.id, compared)
              : undefined
          }
          onClick={
            onPropertyClick ? () => onPropertyClick(property.id) : undefined
          }
        />
      ))}
    </div>
  );
};
