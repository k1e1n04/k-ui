import type React from "react";
import type { ReactNode } from "react";
/** ツールチップのサイズ */
export type TooltipSize = "sm" | "md" | "lg";
export interface TooltipProps {
    /** ツールチップの内容 */
    content: ReactNode;
    /** トリガー要素 */
    children: ReactNode;
    /** 追加のクラス名 */
    className?: string;
    /** トリガーボタンのaria-label */
    triggerLabel?: string;
}
/**
 * ツールチップコンポーネント
 * クリックで開閉するポップオーバー形式
 */
export declare const Tooltip: React.FC<TooltipProps>;
//# sourceMappingURL=Tooltip.d.ts.map