import type React from "react";
/** ドロワーの表示位置。 @default undefined */
export type DrawerPlacement = "left" | "right" | "top" | "bottom";
/** ドロワーのプロパティ。 @default undefined */
export interface DrawerProps {
    /** 開閉状態。 @default undefined */
    open: boolean;
    /** 閉じる時の処理。 @default undefined */
    onClose: () => void;
    /** 表示内容。 @default undefined */
    children: React.ReactNode;
    /** 見出し。 @default undefined */
    title?: React.ReactNode;
    /** フッター内容。 @default undefined */
    footer?: React.ReactNode;
    /** 表示位置。 @default "right" */
    placement?: DrawerPlacement;
    /** 幅または高さ。 @default 384（左右）または "auto"（上下） */
    size?: string | number;
    /** 背景クリックで閉じるか。 @default true */
    closeOnOutsideClick?: boolean;
    /** 閉じるボタンのラベル。 @default "閉じる" */
    closeButtonLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * ヘッダー・フッターを備えた汎用モーダルドロワー。
 *
 * @default undefined
 */
export declare const Drawer: React.FC<DrawerProps>;
//# sourceMappingURL=Drawer.d.ts.map