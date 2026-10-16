import type React from "react";
/** 固定アクションバーの位置指定。 @default undefined */
export type StickyActionBarPosition = "sticky" | "fixed";
/** 固定アクションバーのプロパティ。 @default undefined */
export interface StickyActionBarProps extends React.ComponentPropsWithRef<"div"> {
    /** 固定方法。 @default "sticky" */
    position?: StickyActionBarPosition;
    /** 表示内容。 @default undefined */
    children: React.ReactNode;
}
/**
 * 画面下部に主要操作を固定するバー。
 * ホームインジケータを避けるため safe-area を足す（§7.4）。
 */
export declare const StickyActionBar: React.FC<StickyActionBarProps>;
//# sourceMappingURL=StickyActionBar.d.ts.map