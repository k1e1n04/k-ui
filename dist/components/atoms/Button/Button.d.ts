import type React from "react";
/** ボタンのバリアント */
export type ButtonVariant = "primary" | "secondary" | "success" | "info" | "outline" | "ghost" | "danger";
/** ボタンのサイズ */
export type ButtonSize = "small" | "medium" | "large";
/** ボタンのトーン */
export type ButtonTone = "solid" | "plain" | "subtle";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ボタンの種類 */
    variant?: ButtonVariant;
    /** ボタンのサイズ */
    size?: ButtonSize;
    /** フルサイズ（幅いっぱい）表示 */
    fullWidth?: boolean;
    /** アイコンのみのボタン */
    iconOnly?: boolean;
    /** ボタンのトーン */
    tone?: ButtonTone;
}
/**
 * 汎用ボタンコンポーネント
 */
export declare const Button: React.FC<ButtonProps>;
//# sourceMappingURL=Button.d.ts.map