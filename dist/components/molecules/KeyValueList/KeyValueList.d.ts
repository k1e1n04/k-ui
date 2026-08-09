import type React from "react";
import type { ReactNode } from "react";
/** KeyValueList のレイアウト */
export type KeyValueListLayout = "horizontal" | "vertical";
/** KeyValueList のサイズ */
export type KeyValueListSize = "sm" | "md";
/** KeyValueList のトーン */
export type KeyValueListTone = "default" | "success" | "danger";
/** キー・バリューの項目 */
export interface KeyValueItem {
    /** ラベル */
    key: ReactNode;
    /** 値 */
    value: ReactNode;
    /** トーン（値のスタイリングに適用） */
    tone?: KeyValueListTone;
}
export interface KeyValueListProps {
    /** 表示する項目リスト */
    items: KeyValueItem[];
    /** レイアウト */
    layout?: KeyValueListLayout;
    /** サイズ */
    size?: KeyValueListSize;
    /** 区切り線を表示するか */
    separator?: boolean;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * キー・バリューリストコンポーネント
 *
 * label/value 行を統一的に表示するためのリスト。
 * 比較・サマリー表示などに使用する。
 */
export declare const KeyValueList: React.FC<KeyValueListProps>;
//# sourceMappingURL=KeyValueList.d.ts.map