import type React from "react";
/** パスワード入力のプロパティ。 @default undefined */
export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange"> {
    /** 現在値。 @default undefined */
    value?: string;
    /** 値変更時の処理。 @default undefined */
    onChange?: (value: string) => void;
    /** ラベル。 @default "Password" */
    label?: string;
    /** 説明。 @default undefined */
    description?: string;
    /** エラーメッセージ。 @default undefined */
    error?: string;
    /** 表示切替を表示するか。 @default true */
    showToggle?: boolean;
    /** 表示・非表示ボタンのラベル。 @default { show: "Show password", hide: "Hide password" } */
    visibilityLabels?: {
        show: string;
        hide: string;
    };
    /** サイズ。 @default "medium" */
    size?: "small" | "medium" | "large";
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** パスワードの表示切替を備えた入力欄。 @default undefined */
export declare function PasswordInput({ value, onChange, label, description, error, showToggle, visibilityLabels, size, className, disabled, id, required, "aria-describedby": ariaDescribedBy, ...props }: PasswordInputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PasswordInput.d.ts.map