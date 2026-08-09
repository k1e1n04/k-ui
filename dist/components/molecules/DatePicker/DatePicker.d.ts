import type React from "react";
/** 日付ピッカーのプロパティ。 @default undefined */
export interface DatePickerProps {
    /** 選択中の日付。 @default "" */
    value?: string;
    /** 日付変更時の処理。 @default undefined */
    onChange: (value: string) => void;
    /** 選択可能な最小日付。 @default undefined */
    minDate?: string;
    /** 選択可能な最大日付。 @default undefined */
    maxDate?: string;
    /** 個別に日付を無効化する関数。 @default undefined */
    disabledDate?: (date: string) => boolean;
    /** 未選択時の表示。 @default "YYYY-MM-DD" */
    placeholder?: string;
    /** クリアボタンを表示するか。 @default false */
    clearable?: boolean;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** カレンダー選択と入力表示をまとめた日付ピッカー。 @default undefined */
export declare const DatePicker: React.FC<DatePickerProps>;
//# sourceMappingURL=DatePicker.d.ts.map