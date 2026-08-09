import type React from "react";
/** タブ項目（フラット props 用）。 @default undefined */
export interface TabItem {
    /** 項目を識別する値。 @default undefined */
    value: string;
    /** タブのラベル。 @default undefined */
    label: React.ReactNode;
    /** タブパネルの内容。 @default undefined */
    content: React.ReactNode;
    /** 無効状態。 @default false */
    disabled?: boolean;
}
/** タブのプロパティ。 @default undefined */
export interface TabsProps {
    /** 項目一覧。 @default undefined */
    items: TabItem[];
    /** 選択中の値。 @default undefined */
    value: string;
    /** 選択値変更時の処理。 @default undefined */
    onChange: (value: string) => void;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** ARIA タブパターンと矢印キー操作に対応するタブ。 @default undefined */
export declare const Tabs: React.FC<TabsProps>;
//# sourceMappingURL=Tabs.d.ts.map