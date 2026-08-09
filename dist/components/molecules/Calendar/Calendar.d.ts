import type React from "react";
/** カレンダーのプロパティ。 @default undefined */
export interface CalendarProps {
    /** 選択中の日付（YYYY-MM-DD）。 @default undefined */
    value?: string;
    /** 日付選択時の通知。 @default undefined */
    onChange: (value: string) => void;
    /** 表示する初期月（YYYY-MM-DD）。 @default undefined */
    defaultMonth?: string;
    /** 選択可能な最小日付（YYYY-MM-DD）。 @default undefined */
    minDate?: string;
    /** 選択可能な最大日付（YYYY-MM-DD）。 @default undefined */
    maxDate?: string;
    /** 個別に日付を無効化する関数。 @default undefined */
    disabledDate?: (date: string) => boolean;
    /** 曜日の先頭。 @default 0 */
    weekStartsOn?: 0 | 1;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * 月送りと日付範囲制限に対応するカレンダー。
 *
 * @default undefined
 */
export declare const Calendar: React.FC<CalendarProps>;
//# sourceMappingURL=Calendar.d.ts.map