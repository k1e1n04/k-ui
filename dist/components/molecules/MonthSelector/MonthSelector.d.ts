import type React from "react";
export interface MonthSelectorProps {
    /** 選択中の月（YYYY-MM形式） */
    selectedMonth: string;
    /** 月変更コールバック */
    onMonthChange: (month: string) => void;
    /** 選択可能な最小年 */
    minYear?: number;
    /** 選択可能な最大年 */
    maxYear?: number;
    /** 月ラベルのフォーマッター */
    formatLabel?: (year: number, month: number) => string;
    /** 前の月ボタンのaria-label */
    prevLabel?: string;
    /** 次の月ボタンのaria-label */
    nextLabel?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * 月選択コンポーネント
 */
export declare const MonthSelector: React.FC<MonthSelectorProps>;
//# sourceMappingURL=MonthSelector.d.ts.map