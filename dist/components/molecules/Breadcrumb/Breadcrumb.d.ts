import type React from "react";
/** パンくず項目。 @default undefined */
export interface BreadcrumbItem {
    /** 表示内容。 @default undefined */
    label: React.ReactNode;
    /** 遷移先 URL。 @default undefined */
    href?: string;
}
/** パンくずリンクの描画プロパティ。 @default undefined */
export interface BreadcrumbRenderLinkProps {
    /** 遷移先 URL。 @default undefined */
    href: string;
    /** リンク内容。 @default undefined */
    children: React.ReactNode;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** パンくずのプロパティ。 @default undefined */
export interface BreadcrumbProps {
    /** 項目一覧。 @default undefined */
    items: BreadcrumbItem[];
    /** 表示を維持する最大項目数。 @default undefined */
    maxItems?: number;
    /** 項目間の区切り。 @default "/" */
    separator?: React.ReactNode;
    /** リンクのカスタムレンダラー。 @default undefined */
    renderLink?: (props: BreadcrumbRenderLinkProps) => React.ReactNode;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 最大件数を超える中間項目をメニューへ畳めるパンくず。 @default undefined */
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
//# sourceMappingURL=Breadcrumb.d.ts.map