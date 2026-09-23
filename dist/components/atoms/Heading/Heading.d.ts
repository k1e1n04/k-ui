import type React from "react";
export type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "xl" | "lg" | "md" | "sm";
export type HeadingTone = "default" | "muted" | "inverse";
export interface HeadingProps extends React.ComponentPropsWithRef<"h2"> {
    /** レンダリングする見出しタグ */
    as?: HeadingAs;
    /** 見出しサイズ */
    size?: HeadingSize;
    /** 見出しカラー */
    tone?: HeadingTone;
}
/**
 * Heading コンポーネント
 *
 * ページ・セクション見出しの階層表現を統一するためのコンポーネント
 */
export declare const Heading: React.FC<HeadingProps>;
//# sourceMappingURL=Heading.d.ts.map