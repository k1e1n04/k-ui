/** ラジオグループの選択肢。 @default undefined */
export interface RadioGroupOption {
    /** 表示名。 @default undefined */
    label: string;
    /** 値。 @default undefined */
    value: string;
    /** 無効状態。 @default false */
    disabled?: boolean;
}
/** ラジオグループのプロパティ。 @default undefined */
export interface RadioGroupProps {
    /** 選択肢。 @default undefined */
    options: RadioGroupOption[];
    /** 選択値。 @default undefined */
    value: string;
    /** 値変更時の処理。 @default undefined */
    onChange: (value: string) => void;
    /** ラベル。 @default undefined */
    label?: string;
    /** 説明。 @default undefined */
    description?: string;
    /** エラーメッセージ。 @default undefined */
    error?: string;
    /** 必須入力か。 @default false */
    required?: boolean;
    /** 並びの方向。 @default "vertical" */
    orientation?: "horizontal" | "vertical";
    /** サイズ。 @default "medium" */
    size?: "small" | "medium" | "large";
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 名前。 @default undefined */
    name?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 選択肢から一つを選ぶラジオグループ。 @default undefined */
export declare function RadioGroup({ options, value, onChange, label, description, error, required, orientation, size, disabled, name, className, }: RadioGroupProps): import("react").JSX.Element;
//# sourceMappingURL=RadioGroup.d.ts.map