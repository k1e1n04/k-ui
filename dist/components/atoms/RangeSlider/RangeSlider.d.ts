import type React from "react";
/** 範囲スライダーの値（[下限, 上限]） */
export type RangeSliderValue = [number, number];
export interface RangeSliderProps {
    /** 現在の値 */
    value: RangeSliderValue;
    /** 値変更時の処理 */
    onChange: (value: RangeSliderValue) => void;
    /** 最小値。 @default 0 */
    min?: number;
    /** 最大値。 @default 100 */
    max?: number;
    /** 刻み幅。 @default 1 */
    step?: number;
    /** ラベル */
    label?: string;
    /** 補助説明 */
    description?: string;
    /** エラーメッセージ */
    error?: string;
    /** 無効状態 */
    disabled?: boolean;
    /** 値の表示フォーマッター */
    formatValue?: (value: number) => string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * RangeSlider コンポーネント
 *
 * 家賃の下限・上限など、範囲を1本のトラックで指定するスライダー。
 * キーボード操作とドラッグ操作に対応する。
 *
 * @example
 * <RangeSlider
 *   value={[rentMin, rentMax]}
 *   onChange={([min, max]) => setRent([min, max])}
 *   min={0}
 *   max={300000}
 *   step={5000}
 *   formatValue={(v) => `${v / 10000}万円`}
 * />
 */
export declare const RangeSlider: React.FC<RangeSliderProps>;
//# sourceMappingURL=RangeSlider.d.ts.map