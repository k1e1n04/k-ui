import type React from "react";
/** 設備アイテム */
export interface FacilityItem {
    /** 一意なキー */
    key: string;
    /** 設備名 */
    label: string;
    /** アイコン（省略時はチェックアイコン） */
    icon?: React.ReactNode;
    /** 利用可能か。false の場合はグレー表示。 @default true */
    available?: boolean;
}
/** FacilityList のサイズ */
export type FacilityListSize = "sm" | "md";
export interface FacilityListProps {
    /** 設備一覧 */
    items: FacilityItem[];
    /** グリッドのカラム数。 @default 2 */
    columns?: 1 | 2 | 3 | 4;
    /** サイズ。 @default "md" */
    size?: FacilityListSize;
    /** 見出し */
    title?: React.ReactNode;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * FacilityList コンポーネント
 *
 * 物件の設備・こだわり条件をアイコン付きで一覧表示する。
 *
 * @example
 * <FacilityList
 *   items={[
 *     { key: "bath", label: "バス・トイレ別" },
 *     { key: "parking", label: "駐車場", available: false },
 *   ]}
 * />
 */
export declare const FacilityList: React.FC<FacilityListProps>;
//# sourceMappingURL=FacilityList.d.ts.map