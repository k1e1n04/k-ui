import type React from "react";
/** カードの色テーマ */
export type StatCardColor = "blue" | "green" | "purple" | "red" | "yellow" | "gray";
/** 個々のカードデータ */
export interface StatCardItem {
    /** カードのラベル */
    label: string;
    /** 表示する値 */
    value: string | number;
    /** 色テーマ */
    color?: StatCardColor;
}
export interface StatCardsProps {
    /** カードデータの配列 */
    cards: StatCardItem[];
    /** 値のフォーマッター */
    formatValue?: (value: string | number) => string;
    /** グリッドのカラム数 */
    columns?: 1 | 2 | 3 | 4;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * 統計カードコンポーネント
 */
export declare const StatCards: React.FC<StatCardsProps>;
//# sourceMappingURL=StatCards.d.ts.map