import type React from "react";
/** ポップオーバーのプロパティ。 @default undefined */
export interface PopoverProps {
    /** ポップオーバーを開くトリガー要素。 @default undefined */
    trigger: React.ReactElement;
    /** 表示する内容。 @default undefined */
    children: React.ReactNode;
    /** 開閉状態（制御時）。 @default undefined */
    open?: boolean;
    /** 開閉状態の変更通知。 @default undefined */
    onOpenChange?: (open: boolean) => void;
    /** Floating UI の配置。 @default "bottom-start" */
    placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
    /** 外側クリックで閉じるか。 @default true */
    closeOnOutsideClick?: boolean;
    /** Escape で閉じるか。 @default true */
    closeOnEscape?: boolean;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * トリガー要素に追従して表示するアクセシブルなポップオーバー。
 *
 * @default undefined
 */
export declare const Popover: React.FC<PopoverProps>;
//# sourceMappingURL=Popover.d.ts.map