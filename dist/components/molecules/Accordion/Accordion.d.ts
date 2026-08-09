import type React from "react";
/** アコーディオン項目。 @default undefined */
export interface AccordionItem {
    /** 項目を識別する値。 @default undefined */
    value: string;
    /** 見出し。 @default undefined */
    title: React.ReactNode;
    /** 展開時の内容。 @default undefined */
    content: React.ReactNode;
    /** 無効状態。 @default false */
    disabled?: boolean;
}
interface AccordionBaseProps {
    /** 項目一覧。 @default undefined */
    items: AccordionItem[];
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 単一選択アコーディオンのプロパティ。 @default undefined */
export interface AccordionSingleProps extends AccordionBaseProps {
    /** 選択方式。 @default "single" */
    type?: "single";
    /** 制御時の展開項目。 @default undefined */
    value?: string;
    /** 非制御時の初期展開項目。 @default undefined */
    defaultValue?: string;
    /** 展開項目の変更時の処理。 @default undefined */
    onValueChange?: (value: string) => void;
}
/** 複数選択アコーディオンのプロパティ。 @default undefined */
export interface AccordionMultipleProps extends AccordionBaseProps {
    /** 選択方式。 @default undefined */
    type: "multiple";
    /** 制御時の展開項目。 @default undefined */
    value?: string[];
    /** 非制御時の初期展開項目。 @default undefined */
    defaultValue?: string[];
    /** 展開項目の変更時の処理。 @default undefined */
    onValueChange?: (value: string[]) => void;
}
/** フラットな項目 API を持つアコーディオンのプロパティ。 @default undefined */
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
/** 単一・複数選択とキーボード操作に対応するアコーディオン。 @default undefined */
export declare const Accordion: React.FC<AccordionProps>;
export {};
//# sourceMappingURL=Accordion.d.ts.map