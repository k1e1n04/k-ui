import type React from "react";
/** ドロップダウンメニュー項目。 @default undefined */
export interface DropdownMenuItem {
    /** 表示内容。 @default undefined */
    label: React.ReactNode;
    /** 項目を識別する値。 @default undefined */
    value: string;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 遷移先 URL。 @default undefined */
    href?: string;
}
/** メニュー内リンクを描画するためのプロパティ。 @default undefined */
export interface DropdownMenuRenderLinkProps {
    /** 遷移先 URL。 @default undefined */
    href: string;
    /** リンク内容。 @default undefined */
    children: React.ReactNode;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** ドロップダウンメニューのプロパティ。 @default undefined */
export interface DropdownMenuProps {
    /** メニューを開くトリガー要素。 @default undefined */
    trigger: React.ReactElement;
    /** 項目一覧。 @default undefined */
    items: DropdownMenuItem[];
    /** 項目選択時の処理。 @default undefined */
    onSelect?: (value: string) => void;
    /** リンク項目用のカスタムレンダラー。 @default undefined */
    renderLink?: (props: DropdownMenuRenderLinkProps) => React.ReactNode;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * 矢印キーによるロービング tabindex に対応するメニュー。
 *
 * @default undefined
 */
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
//# sourceMappingURL=DropdownMenu.d.ts.map