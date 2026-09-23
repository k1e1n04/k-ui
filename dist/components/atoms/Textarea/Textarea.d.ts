import type React from "react";
/** テキストエリアのサイズ */
export type TextareaSize = "small" | "medium" | "large";
export interface TextareaProps extends Omit<React.ComponentPropsWithRef<"textarea">, "onChange"> {
    /** ラベルテキスト */
    label?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 補助説明 */
    description?: string;
    /** 現在の値 */
    value?: string;
    /** 変更ハンドラー */
    onChange?: (value: string) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** サイズ */
    size?: TextareaSize;
    /** 行数 */
    rows?: number;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
}
/**
 * テキストエリアコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理する複数行テキスト入力UI
 */
export declare const Textarea: React.FC<TextareaProps>;
//# sourceMappingURL=Textarea.d.ts.map