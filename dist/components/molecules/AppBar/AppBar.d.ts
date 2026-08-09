import type React from "react";
/** AppBarのポジション */
export type AppBarPosition = "fixed" | "static" | "absolute" | "relative" | "sticky";
/** AppBarのカラー */
export type AppBarColor = "primary" | "secondary" | "success" | "transparent";
export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
    /** ポジション */
    position?: AppBarPosition;
    /** カラーバリアント */
    color?: AppBarColor;
}
/**
 * アプリケーションバーコンポーネント
 */
export declare const AppBar: React.FC<AppBarProps>;
//# sourceMappingURL=AppBar.d.ts.map