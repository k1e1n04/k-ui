import type React from "react";
/** 星評価のサイズ */
export type RatingSize = "sm" | "md" | "lg";
export interface RatingProps {
    /** 現在の評価値 */
    value: number;
    /** 最大値 */
    max?: number;
    /** 値変更時の処理（指定すると操作可能になる） */
    onChange?: (value: number) => void;
    /** 読み取り専用にするか */
    readOnly?: boolean;
    /** サイズ */
    size?: RatingSize;
    /** アクセシブルなラベル */
    label?: string;
    /** 数値を併記するか */
    showValue?: boolean;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * Rating コンポーネント
 *
 * 物件のレビュー評価などを星で表示・入力する。
 *
 * @example
 * <Rating value={4} readOnly />
 *
 * @example
 * <Rating value={value} onChange={setValue} />
 */
export declare const Rating: React.FC<RatingProps>;
//# sourceMappingURL=Rating.d.ts.map