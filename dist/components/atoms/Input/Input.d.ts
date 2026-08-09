import type React from "react";
/** インプットのタイプ */
export type InputType = "text" | "number" | "date" | "time" | "url" | "month" | "hidden";
/** インプットのサイズ */
export type InputSize = "small" | "medium" | "large";
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onChange" | "value" | "className"> {
    /** インプットのタイプ */
    type?: InputType;
    /** ラベルテキスト */
    label?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 補助説明 */
    description?: string;
    /** 現在の値 */
    value?: string;
    /** 変更ハンドラー（入力値のみを受け取る） */
    onChange?: (value: string) => void;
    /** サイズ */
    size?: InputSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
}
/**
 * インプットコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するテキスト入力UI
 */
export declare const Input: React.FC<InputProps>;
//# sourceMappingURL=Input.d.ts.map