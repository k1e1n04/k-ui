import type React from "react";
/** 並べ替え可能なリストの項目。 @default undefined */
export interface SortableListItem {
    /** 一意な識別子。 @default undefined */
    id: string;
    /** 項目の内容。 @default undefined */
    content: React.ReactNode;
}
/** 並べ替え可能なリストのプロパティ。 @default undefined */
export interface SortableListProps {
    /** 項目一覧。 @default undefined */
    items: SortableListItem[];
    /** 並べ替え時の処理。 @default undefined */
    onReorder: (from: number, to: number) => void;
    /** リストのラベル。 @default "並べ替え可能なリスト" */
    ariaLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * ドラッグとキーボードの両方で並べ替えられるリスト（§7.1）。
 * ドラッグできない人のために「上へ／下へ」も用意する。
 */
export declare const SortableList: React.FC<SortableListProps>;
//# sourceMappingURL=SortableList.d.ts.map