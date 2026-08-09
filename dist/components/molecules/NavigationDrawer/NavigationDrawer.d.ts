import type React from "react";
import type { ReactNode } from "react";
/** ドロワーのアイテム */
export interface DrawerItem {
    /** 表示名 */
    name: string;
    /** 遷移先パス */
    path: string;
    /** アイコン */
    icon?: ReactNode;
}
/** ドロワーのセクション */
export interface DrawerSection {
    /** セクションタイトル */
    title: string;
    /** セクション内のアイテム */
    items: DrawerItem[];
}
/** リンクレンダリング用のprops */
export interface RenderLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}
export interface NavigationDrawerProps {
    /** ドロワーの開閉状態 */
    open: boolean;
    /** ドロワーを閉じる関数 */
    onClose: () => void;
    /** セクション一覧 */
    sections: DrawerSection[];
    /** ログアウト関数 */
    onLogout?: () => void;
    /** ログアウトボタンのラベル */
    logoutLabel?: string;
    /** ドロワーの幅（px） */
    width?: number;
    /** カスタムリンクレンダラー（Next.js Linkなどを注入） */
    renderLink?: (props: RenderLinkProps) => ReactNode;
    /** 閉じるボタンのaria-label */
    closeButtonLabel?: string;
}
/**
 * ナビゲーションドロワーコンポーネント
 *
 * renderLink propでNext.js Linkなどのルーターリンクを注入できる
 */
export declare const NavigationDrawer: React.FC<NavigationDrawerProps>;
//# sourceMappingURL=NavigationDrawer.d.ts.map