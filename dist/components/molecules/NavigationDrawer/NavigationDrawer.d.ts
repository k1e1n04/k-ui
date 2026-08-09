import type React from "react";
import type { ReactNode } from "react";
/** ドロワーのアイテム。 @default undefined */
export interface DrawerItem {
    /** 表示名。 @default undefined */
    name: string;
    /** 遷移先パス。 @default undefined */
    path: string;
    /** アイコン。 @default undefined */
    icon?: ReactNode;
}
/** ドロワーのセクション。 @default undefined */
export interface DrawerSection {
    /** セクションタイトル。 @default undefined */
    title: string;
    /** セクション内のアイテム。 @default undefined */
    items: DrawerItem[];
}
/** リンクレンダリング用のプロパティ。 @default undefined */
export interface RenderLinkProps {
    /** 遷移先 URL。 @default undefined */
    href: string;
    /** リンク内容。 @default undefined */
    children: ReactNode;
    /** クリック時の処理。 @default undefined */
    onClick?: () => void;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** ナビゲーションドロワーのプロパティ。 @default undefined */
export interface NavigationDrawerProps {
    /** ドロワーの開閉状態。 @default undefined */
    open: boolean;
    /** ドロワーを閉じる関数。 @default undefined */
    onClose: () => void;
    /** セクション一覧。 @default undefined */
    sections: DrawerSection[];
    /** ログアウト関数。 @default undefined */
    onLogout?: () => void;
    /** ログアウトボタンのラベル。 @default "Logout" */
    logoutLabel?: string;
    /** ドロワーの幅（px）。 @default 240 */
    width?: number;
    /** カスタムリンクレンダラー（Next.js Link などを注入）。 @default defaultRenderLink */
    renderLink?: (props: RenderLinkProps) => ReactNode;
    /** 閉じるボタンの aria-label。 @default "Close" */
    closeButtonLabel?: string;
    /** ドロワーダイアログの aria-label。 @default "Navigation menu" */
    ariaLabel?: string;
}
/**
 * ナビゲーションドロワーコンポーネント。
 *
 * renderLink propでNext.js Linkなどのルーターリンクを注入できる
 *
 * @default undefined
 */
export declare const NavigationDrawer: React.FC<NavigationDrawerProps>;
//# sourceMappingURL=NavigationDrawer.d.ts.map