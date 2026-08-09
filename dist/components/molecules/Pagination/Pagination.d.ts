import type React from "react";
/** ページネーションのプロパティ。 @default undefined */
export interface PaginationProps {
    /** 現在のページ番号。 @default undefined */
    page: number;
    /** 総ページ数。 @default undefined */
    totalPages: number;
    /** ページ変更時の処理。 @default undefined */
    onChange: (page: number) => void;
    /** 現在ページの両側に表示するページ数。 @default 2 */
    siblingCount?: number;
    /** 前ページボタンのラベル。 @default "前のページ" */
    previousLabel?: string;
    /** 次ページボタンのラベル。 @default "次のページ" */
    nextLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** ページ移動のためのアクセシブルなページネーション。 @default undefined */
export declare const Pagination: React.FC<PaginationProps>;
//# sourceMappingURL=Pagination.d.ts.map