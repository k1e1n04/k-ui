import type React from "react";
export interface SplitPaneLayoutProps {
    /** ヘッダー */
    header?: React.ReactNode;
    /** サイドバー */
    sidebar?: React.ReactNode;
    /** メイン領域 */
    main?: React.ReactNode;
    /** サイドバーの幅。 @default 380 */
    sidebarWidth?: number | string;
    /** サイドバーの配置。 @default "start" */
    sidebarPosition?: "start" | "end";
    /** モバイルでメイン領域を先に表示するか。 @default false */
    mainFirst?: boolean;
    /** サイドバーのアクセシブルなラベル。 @default "サイドバー" */
    sidebarLabel?: string;
    /** 下部の固定要素 */
    footer?: React.ReactNode;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * SplitPaneLayout コンポーネント
 *
 * サイドバーとメイン領域を並べる汎用レイアウト。
 * モバイルでは縦積みに切り替わる。
 *
 * @example
 * <SplitPaneLayout
 *   header={<AppBar title="検索" />}
 *   sidebar={<FilterPanel ... />}
 *   main={<MapView ... />}
 * />
 */
export declare const SplitPaneLayout: React.FC<SplitPaneLayoutProps>;
//# sourceMappingURL=SplitPaneLayout.d.ts.map