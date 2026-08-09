import type React from "react";
/** NumberInput のサイズ */
export type NumberInputSize = "small" | "medium" | "large";
/** 空文字時の挙動 */
export type NumberInputEmptyBehavior = "undefined" | "zero";
export interface NumberInputProps {
    /** 現在の数値 */
    value?: number;
    /** 値変更ハンドラー */
    onValueChange?: (value: number | undefined) => void;
    /** 小数桁数 */
    precision?: number;
    /** 最小値 */
    min?: number;
    /** 最大値 */
    max?: number;
    /** ステップ */
    step?: number;
    /** 接尾辞（例: %, 万円） */
    suffix?: string;
    /** 負数を許可するか */
    allowNegative?: boolean;
    /** 空文字時の挙動 */
    emptyBehavior?: NumberInputEmptyBehavior;
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
    /** プレースホルダー */
    placeholder?: string;
    /** サイズ */
    size?: NumberInputSize;
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
}
/**
 * 数値入力コンポーネント
 *
 * precision/suffix/min-max/empty handling をサポートする数値専用インプット。
 * 内部的にはテキスト入力を使用し、フォーマット・パースを制御する。
 */
export declare const NumberInput: React.FC<NumberInputProps>;
//# sourceMappingURL=NumberInput.d.ts.map