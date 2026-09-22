import type React from "react";
/** 価格の表示形式 */
export type PriceFormat = "man" | "yen";
/** 価格のサイズ */
export type PriceSize = "sm" | "md" | "lg";
/** 価格のトーン */
export type PriceTone = "default" | "primary" | "accent" | "muted";
export interface PriceProps {
    /** 金額（円） */
    value: number;
    /** 表示形式。man は「万円」、yen は「¥」表記。 @default "man" */
    format?: PriceFormat;
    /** サイズ。 @default "md" */
    size?: PriceSize;
    /** トーン。 @default "default" */
    tone?: PriceTone;
    /** 金額の後ろに付ける単位（例: /月） */
    unit?: React.ReactNode;
    /** 補足テキスト（管理費など） */
    caption?: React.ReactNode;
    /** 追加のクラス名 */
    className?: string;
}
/** 金額を「万円」表記へ変換する */
export declare function formatManYen(value: number): string;
/** 金額を「¥」表記へ変換する */
export declare function formatYen(value: number): string;
/**
 * Price コンポーネント
 *
 * 賃料・管理費などの金額を統一フォーマットで表示する。
 *
 * @example
 * <Price value={85000} caption="管理費 5,000円" />
 */
export declare const Price: React.FC<PriceProps>;
//# sourceMappingURL=Price.d.ts.map