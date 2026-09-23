import type React from "react";
/** YearMonthInput のサイズ */
export type YearMonthInputSize = "small" | "medium" | "large";
export interface YearMonthInputProps {
    /** 現在の値（YYYY-MM 形式） */
    value?: string;
    /** 値変更ハンドラー */
    onChange?: (value: string | undefined) => void;
    /** 最小値（YYYY-MM 形式） */
    min?: string;
    /** 最大値（YYYY-MM 形式） */
    max?: string;
    /** クリアボタンを表示するか */
    allowClear?: boolean;
    /** ラベルテキスト */
    label?: string;
    /** エラーメッセージ */
    error?: string;
    /** 補助説明 */
    description?: string;
    /** 必須フラグ */
    required?: boolean;
    /** 無効化 */
    disabled?: boolean;
    /** サイズ */
    size?: YearMonthInputSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** input の id */
    id?: string;
    /** input の name */
    name?: string;
    /** aria-invalid の上書き */
    "aria-invalid"?: boolean;
    /** aria-describedby の上書き */
    "aria-describedby"?: string;
    /** input 要素への ref */
    ref?: React.Ref<HTMLInputElement>;
}
/**
 * 年月入力コンポーネント
 *
 * YYYY-MM 形式の年月を入力するための専用インプット。
 * ネイティブの type="month" を使用し、ブラウザ間の差異を吸収する。
 */
export declare const YearMonthInput: React.FC<YearMonthInputProps>;
//# sourceMappingURL=YearMonthInput.d.ts.map