import type React from "react";
/** ボタングループのプロパティ。 @default undefined */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 並びの方向。 @default "horizontal" */
    orientation?: "horizontal" | "vertical";
    /** 幅いっぱいに表示するか。 @default false */
    fullWidth?: boolean;
}
/** ボタンを連続したグループとして表示するコンポーネント。 @default undefined */
export declare function ButtonGroup({ orientation, fullWidth, className, children, ...props }: ButtonGroupProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ButtonGroup.d.ts.map