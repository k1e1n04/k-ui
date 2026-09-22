import type React from "react";
import { type MediaCardProps } from "../MediaCard";
/** 一覧に表示するアイテム */
export type MediaListItem = MediaCardProps & {
    id: string;
};
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
export declare const MediaList: React.FC<MediaListProps>;
//# sourceMappingURL=MediaList.d.ts.map