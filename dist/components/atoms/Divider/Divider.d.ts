/** 区切り線のプロパティ。 @default undefined */
export interface DividerProps {
    /** 方向。 @default "horizontal" */
    orientation?: "horizontal" | "vertical";
    /** 線種。 @default "solid" */
    variant?: "solid" | "dashed";
    /** 表示ラベル。 @default undefined */
    label?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 内容を視覚的に分ける区切り線。 @default undefined */
export declare function Divider({ orientation, variant, label, className, }: DividerProps): import("react").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map