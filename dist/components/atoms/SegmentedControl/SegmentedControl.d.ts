/** セグメントの選択肢。 @default undefined */
export interface SegmentedControlOption {
    /** 表示名。 @default undefined */
    label: string;
    /** 値。 @default undefined */
    value: string;
    /** 無効状態。 @default false */
    disabled?: boolean;
}
/** セグメントコントロールのプロパティ。 @default undefined */
export interface SegmentedControlProps {
    /** 選択肢。 @default undefined */
    options: SegmentedControlOption[];
    /** 選択値。 @default undefined */
    value: string;
    /** 値変更時の処理。 @default undefined */
    onChange: (value: string) => void;
    /** 幅いっぱいに表示するか。 @default false */
    fullWidth?: boolean;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** グループのアクセシブル名。 @default undefined */
    "aria-label"?: string;
    /** グループのラベル要素 ID。 @default undefined */
    "aria-labelledby"?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 選択肢を横並びのセグメントとして表示するコントロール。 @default undefined */
export declare function SegmentedControl({ options, value, onChange, fullWidth, disabled, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, className, }: SegmentedControlProps): import("react").JSX.Element;
//# sourceMappingURL=SegmentedControl.d.ts.map