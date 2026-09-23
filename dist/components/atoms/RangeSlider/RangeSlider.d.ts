import type React from "react";
/** 範囲スライダーの値（[下限, 上限]） */
export type RangeSliderValue = [number, number];
export interface RangeSliderProps {
    /** 現在の値 */
    value: RangeSliderValue;
    /** 値変更時の処理（ドラッグ中は pointermove ごとに呼ばれる） */
    onChange: (value: RangeSliderValue) => void;
    /**
     * 操作が確定したときの処理。ドラッグ終了（pointerup / pointercancel）や
     * キーボード操作の確定時に、最終的な値で1回だけ呼ばれる。
     * 重い処理（URL 更新・API 呼び出しなど）をここに寄せると、ドラッグ中の
     * 大量リクエストを避けられる。
     */
    onChangeEnd?: (value: RangeSliderValue) => void;
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
    /** トラック要素への ref */
    ref?: React.Ref<HTMLDivElement>;
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