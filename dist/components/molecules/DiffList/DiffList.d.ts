import type React from "react";
import { type DiffKind } from "../../../utils/travel";
/** 差分リストの項目。 @default undefined */
export interface DiffListItem {
    /** 一意な識別子。 @default undefined */
    id: string;
    /** 差分の種別。 @default undefined */
    kind: DiffKind;
    /** 対象の見出し。 @default undefined */
    label: React.ReactNode;
    /** 変更前の値。 @default undefined */
    before?: React.ReactNode;
    /** 変更後の値。 @default undefined */
    after?: React.ReactNode;
    /** 変更の理由。 @default undefined */
    reason?: React.ReactNode;
}
/** 差分リストのプロパティ。 @default undefined */
export interface DiffListProps {
    /** 項目一覧。 @default undefined */
    items: DiffListItem[];
    /** リストのラベル。 @default "変更内容" */
    ariaLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 差分を記号・ラベル・取り消し線で示すリスト（§7.1）。 */
export declare const DiffList: React.FC<DiffListProps>;
//# sourceMappingURL=DiffList.d.ts.map