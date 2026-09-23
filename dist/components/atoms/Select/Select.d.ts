import type React from "react";
/** セレクトのサイズ */
export type SelectSize = "small" | "medium" | "large";
/** セレクトの選択肢 */
export interface SelectOption {
    /** 表示ラベル */
    label: string;
    /** 値 */
    value: string;
    /** 無効状態 */
    disabled?: boolean;
}
export interface SelectProps extends Omit<React.ComponentPropsWithRef<"select">, "onChange" | "size" | "value"> {
    /** 選択肢リスト */
    options: SelectOption[];
    /** ラベルテキスト */
    label?: string;
    /** 必須フラグ（ラベルに * を付与する） */
    required?: boolean;
    /** 補助説明 */
    description?: string;
    /** プレースホルダー（未選択時に表示される） */
    placeholder?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 現在の値 */
    value?: string;
    /** 変更ハンドラー */
    onChange?: (value: string) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** サイズ */
    size?: SelectSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** clear 可能か（placeholder を再選択できる） */
    clearable?: boolean;
}
/**
 * セレクトコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するドロップダウン選択UI
 */
export declare const Select: React.FC<SelectProps>;
//# sourceMappingURL=Select.d.ts.map