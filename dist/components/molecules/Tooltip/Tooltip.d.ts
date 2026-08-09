import type React from "react";
import type { ReactNode } from "react";
/** ツールチップのサイズ。 @default undefined */
export type TooltipSize = "sm" | "md" | "lg";
/** ツールチップのプロパティ。 @default undefined */
export interface TooltipProps {
    /** ツールチップの内容。 @default undefined */
    content: ReactNode;
    /** トリガー要素。 @default undefined */
    children: ReactNode;
    /** トリガーボタンの aria-label。 @default "Info" */
    triggerLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * ツールチップコンポーネント
 * クリックで開閉するポップオーバー形式
 *
 * @default undefined
 */
export declare const Tooltip: React.FC<TooltipProps>;
//# sourceMappingURL=Tooltip.d.ts.map