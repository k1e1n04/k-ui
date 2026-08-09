import type React from "react";
import type { ReactNode } from "react";
import { type DrawerSection, type RenderLinkProps } from "../../molecules/NavigationDrawer";
export interface AppLayoutProps {
    /** ページコンテンツ */
    children: ReactNode;
    /** アプリケーションのタイトル */
    appTitle: string;
    /** タイトルの遷移先パス */
    titleHref?: string;
    /** ドロワーのセクション */
    drawerSections: DrawerSection[];
    /** ドロワーの幅（px） */
    drawerWidth?: number;
    /** ログアウト関数 */
    onLogout?: () => void;
    /** ログアウトボタンのラベル */
    logoutLabel?: string;
    /** カスタムリンクレンダラー */
    renderLink?: (props: RenderLinkProps) => ReactNode;
    /** タイトル横の追加コンテンツ（環境ラベル等） */
    titleSuffix?: ReactNode;
    /** AppBarのカラー */
    appBarColor?: "primary" | "secondary" | "success" | "transparent";
    /** 追加のクラス名（メインコンテンツ） */
    className?: string;
    /** メニューボタンのaria-label */
    menuButtonLabel?: string;
}
/**
 * アプリケーションレイアウトコンポーネント
 *
 * AppBar + NavigationDrawer + メインコンテンツの統合レイアウト
 * Next.js依存はrenderLinkで外から注入する
 */
export declare const AppLayout: React.FC<AppLayoutProps>;
//# sourceMappingURL=AppLayout.d.ts.map