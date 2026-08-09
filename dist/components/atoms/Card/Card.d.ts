import type React from "react";
export type PaddingSize = "none" | "sm" | "md" | "lg";
export type ShadowSize = "none" | "sm" | "md";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * パディングのサイズ
     * @default 'md'
     */
    padding?: PaddingSize;
    /**
     * シャドウのサイズ
     * @default 'md'
     */
    shadow?: ShadowSize;
    /**
     * ボーダーの表示
     * @default false
     */
    border?: boolean;
    children?: React.ReactNode;
}
/**
 * Card コンポーネント
 *
 * コンテンツを囲むカードコンポーネント
 *
 * @example
 * // 基本的な使用
 * <Card>
 *   <p>Content here</p>
 * </Card>
 *
 * @example
 * // カスタマイズ例
 * <Card padding="lg" shadow="sm" border>
 *   <p>Custom content</p>
 * </Card>
 */
export declare const Card: React.FC<CardProps>;
//# sourceMappingURL=Card.d.ts.map