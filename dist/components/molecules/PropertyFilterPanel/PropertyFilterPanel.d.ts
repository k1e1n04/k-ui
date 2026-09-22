import type React from "react";
/** 絞り込み条件 */
export interface PropertyFilterValue {
    /** 賃料の下限（円） */
    rentMin: number;
    /** 賃料の上限（円） */
    rentMax: number;
    /** 選択中の間取り */
    layouts: string[];
    /** 徒歩分数の上限（未指定は undefined） */
    maxWalkMinutes?: number;
    /** 築年数の上限（未指定は undefined） */
    maxBuildingAge?: number;
    /** 選択中の設備 */
    facilities: string[];
    /** 募集中のみ表示するか */
    onlyAvailable: boolean;
}
export interface PropertyFilterOption {
    /** 表示ラベル */
    label: string;
    /** 値 */
    value: string;
}
export interface PropertyFilterPanelProps {
    /** 現在の条件 */
    value: PropertyFilterValue;
    /** 条件変更時 */
    onChange: (value: PropertyFilterValue) => void;
    /** 間取りの選択肢 */
    layoutOptions?: string[];
    /** 設備の選択肢 */
    facilityOptions?: PropertyFilterOption[];
    /** 徒歩分数の選択肢 */
    walkOptions?: number[];
    /** 築年数の選択肢 */
    ageOptions?: number[];
    /** 賃料スライダーの最大値。 @default 300000 */
    rentMax?: number;
    /** 賃料スライダーの刻み幅。 @default 5000 */
    rentStep?: number;
    /** リセット時 */
    onReset?: () => void;
    /** 適用時 */
    onSubmit?: () => void;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * PropertyFilterPanel コンポーネント
 *
 * 賃料・間取り・徒歩分数・築年数・設備などで物件を絞り込むパネル。
 *
 * @example
 * <PropertyFilterPanel
 *   value={filter}
 *   onChange={setFilter}
 *   onReset={reset}
 *   onSubmit={apply}
 * />
 */
export declare const PropertyFilterPanel: React.FC<PropertyFilterPanelProps>;
//# sourceMappingURL=PropertyFilterPanel.d.ts.map