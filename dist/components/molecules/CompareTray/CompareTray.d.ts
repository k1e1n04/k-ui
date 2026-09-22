import type React from "react";
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
export declare const CompareTray: React.FC<CompareTrayProps>;
//# sourceMappingURL=CompareTray.d.ts.map