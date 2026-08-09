import type React from "react";
/** プログレスバーのサイズ */
export type ProgressBarSize = "sm" | "md" | "lg";
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 現在の進捗値 */
    value: number;
    /** 進捗の最大値 */
    max?: number;
    /** スクリーンリーダー向けのラベル */
    label?: string;
    /** プログレスバーのサイズ */
    size?: ProgressBarSize;
}
/**
 * ProgressBar コンポーネント
 *
 * 進捗率を視覚的に表現するバーUI。
 * `role=progressbar` と ARIA 属性を自動付与する。
 */
export declare const ProgressBar: React.FC<ProgressBarProps>;
//# sourceMappingURL=ProgressBar.d.ts.map