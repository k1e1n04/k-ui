import type React from "react";
/** フローティングボタンの位置。 @default undefined */
export type FloatingActionButtonPosition = "bottom-right" | "bottom-left" | "bottom-center";
/** フローティングボタンのプロパティ。 @default undefined */
export interface FloatingActionButtonProps extends Omit<React.ComponentPropsWithRef<"button">, "aria-label"> {
    /** アクセシブルな名前。 @default undefined */
    label: string;
    /** アイコン。 @default undefined */
    icon?: React.ReactNode;
    /** テキスト付きの横長表示にする。 @default false */
    extended?: boolean;
    /** 表示位置。 @default "bottom-right" */
    position?: FloatingActionButtonPosition;
    /** 拡張表示時のテキスト。 @default undefined */
    children?: React.ReactNode;
}
/** 主要操作を右下などに固定表示するボタン。タップ領域は 44px 以上。 */
export declare const FloatingActionButton: React.FC<FloatingActionButtonProps>;
//# sourceMappingURL=FloatingActionButton.d.ts.map