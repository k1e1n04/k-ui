import type React from "react";
/** スピナーのサイズ */
export type SpinnerSize = "small" | "medium" | "large";
export interface SpinnerProps {
    /** スピナーのサイズ */
    size?: SpinnerSize;
    /** スピナー下部に表示するラベル */
    label?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * ローディングスピナーコンポーネント
 */
export declare const Spinner: React.FC<SpinnerProps>;
//# sourceMappingURL=Spinner.d.ts.map