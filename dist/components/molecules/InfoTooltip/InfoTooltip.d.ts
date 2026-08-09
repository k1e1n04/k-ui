import type React from "react";
import type { ReactNode } from "react";
/** InfoTooltip のサイズ */
export type InfoTooltipSize = "sm" | "md";
/** InfoTooltip の表示位置 */
export type InfoTooltipPlacement = "top" | "bottom" | "left" | "right";
export interface InfoTooltipProps {
    /** ツールチップの内容 */
    content: ReactNode;
    /** トリガーラベル（aria-label 用） */
    label?: string;
    /** サイズ */
    size?: InfoTooltipSize;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * インフォメーションツールチップコンポーネント
 *
 * Tooltip のユースケース特化ラッパー。
 * 情報アイコン (i) とアクセシビリティ属性を内包し、
 * 説明補助のツールチップを簡単に配置できる。
 */
export declare const InfoTooltip: React.FC<InfoTooltipProps>;
//# sourceMappingURL=InfoTooltip.d.ts.map