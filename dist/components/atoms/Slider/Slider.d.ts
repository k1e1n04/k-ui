/** スライダー値。 @default undefined */
export type SliderValue = number | [number, number];
/** スライダーのプロパティ。 @default undefined */
export interface SliderProps {
    /** 値。 @default undefined */
    value: SliderValue;
    /** 値変更時の処理。 @default undefined */
    onChange: (value: SliderValue) => void;
    /** 最小値。 @default 0 */
    min?: number;
    /** 最大値。 @default 100 */
    max?: number;
    /** 刻み幅。 @default 1 */
    step?: number;
    /** 目盛りを表示するか。 @default false */
    marks?: boolean;
    /** ラベル。 @default undefined */
    label?: string;
    /** 説明。 @default undefined */
    description?: string;
    /** エラーメッセージ。 @default undefined */
    error?: string;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 数値または範囲を選択するスライダー。 @default undefined */
export declare function Slider({ value, onChange, min, max, step, marks, label, description, error, disabled, className, }: SliderProps): import("react").JSX.Element;
//# sourceMappingURL=Slider.d.ts.map