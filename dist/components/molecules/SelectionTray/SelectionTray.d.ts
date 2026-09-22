import type React from "react";
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
export declare const SelectionTray: React.FC<SelectionTrayProps>;
//# sourceMappingURL=SelectionTray.d.ts.map