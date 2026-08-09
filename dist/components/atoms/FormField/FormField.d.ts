import type React from "react";
/** フォームフィールドのサイズ */
export type FormFieldSize = "small" | "medium" | "large";
export interface FormFieldRenderProps {
    /** フィールドに設定する aria-describedby */
    describedBy?: string;
    /** 説明文の要素ID */
    descriptionId?: string;
    /** エラー要素のID */
    errorId?: string;
}
export interface FormFieldProps {
    /** ラベルテキスト */
    label?: string;
    /** 補助説明 */
    description?: string;
    /** 必須フラグ（ラベルに * を付与する） */
    required?: boolean;
    /** エラーメッセージ */
    error?: string;
    /** label と入力要素を紐づける htmlFor */
    htmlFor?: string;
    /** サイズ */
    size?: FormFieldSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** 既存の aria-describedby（内部IDとマージされる） */
    "aria-describedby"?: string;
    /** フィールド本体 */
    children: React.ReactNode | ((props: FormFieldRenderProps) => React.ReactNode);
}
/**
 * フォーム入力要素向けの共通ラッパー。
 *
 * label / description / required / error の表示ルールと
 * aria-describedby のID連携を一元管理する。
 */
export declare const FormField: React.FC<FormFieldProps>;
//# sourceMappingURL=FormField.d.ts.map