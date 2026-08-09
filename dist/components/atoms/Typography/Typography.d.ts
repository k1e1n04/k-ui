import type React from "react";
export type TypographyAs = "p" | "span" | "div" | "label" | "small";
export type TypographyVariant = "body-sm" | "body-md" | "body-lg" | "caption" | "label";
export type TypographyTone = "default" | "muted" | "inverse" | "danger" | "success" | "info" | "warning";
export type TypographyWeight = "normal" | "medium" | "semibold" | "bold";
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    /** レンダリングするHTML要素 */
    as?: TypographyAs;
    /** タイポグラフィの種別 */
    variant?: TypographyVariant;
    /** テキストのトーン */
    tone?: TypographyTone;
    /** 文字の太さ */
    weight?: TypographyWeight;
    /** 1行省略表示 */
    truncate?: boolean;
}
/**
 * Typography コンポーネント
 *
 * 本文・補助テキスト・ラベルなどの文字スタイルを統一するための基本コンポーネント
 */
export declare const Typography: React.FC<TypographyProps>;
//# sourceMappingURL=Typography.d.ts.map