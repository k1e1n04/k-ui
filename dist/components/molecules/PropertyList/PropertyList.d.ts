import type React from "react";
import { type Property } from "../PropertyCard";
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
export declare const PropertyList: React.FC<PropertyListProps>;
//# sourceMappingURL=PropertyList.d.ts.map