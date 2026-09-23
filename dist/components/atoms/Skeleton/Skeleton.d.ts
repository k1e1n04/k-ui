import type React from "react";
/** スケルトンのプロパティ。 @default undefined */
export interface SkeletonProps {
    /** 形状。 @default "text" */
    variant?: "text" | "circular" | "rectangular";
    /** アニメーション。 @default "pulse" */
    animation?: "none" | "pulse";
    /** 幅。 @default undefined */
    width?: string | number;
    /** 高さ。 @default undefined */
    height?: string | number;
    /** 追加のクラス名。 @default undefined */
    className?: string;
    /** ルート要素への ref。 @default undefined */
    ref?: React.Ref<HTMLOutputElement>;
}
/** 読み込み中のプレースホルダー。 @default undefined */
export declare function Skeleton({ variant, animation, width, height, className, ref, }: SkeletonProps): React.JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map