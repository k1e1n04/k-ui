import type React from "react";
/** フィルターの選択肢 */
export interface FilterOption {
    /** 表示ラベル */
    label: string;
    /** 値 */
    value: string;
    /** 無効状態 */
    disabled?: boolean;
}
/** 範囲スライダーのフィールド */
export interface FilterRangeField {
    type: "range";
    /** 一意なキー */
    key: string;
    /** ラベル */
    label: string;
    /** 最小値 */
    min: number;
    /** 最大値 */
    max: number;
    /** 刻み幅 */
    step?: number;
    /** 現在の値 */
    value: [number, number];
    /** 値のフォーマッター */
    formatValue?: (value: number) => string;
    /** 説明 */
    description?: string;
}
/** 複数選択チップのフィールド */
export interface FilterChipsField {
    type: "chips";
    /** 一意なキー */
    key: string;
    /** ラベル */
    label: string;
    /** 選択肢 */
    options: FilterOption[];
    /** 現在の値 */
    value: string[];
}
/** チェックボックス群のフィールド */
export interface FilterCheckboxesField {
    type: "checkboxes";
    /** 一意なキー */
    key: string;
    /** ラベル */
    label: string;
    /** 選択肢 */
    options: FilterOption[];
    /** 現在の値 */
    value: string[];
    /** グリッドのカラム数。 @default 2 */
    columns?: 1 | 2;
}
/** セレクトのフィールド */
export interface FilterSelectField {
    type: "select";
    /** 一意なキー */
    key: string;
    /** ラベル */
    label: string;
    /** 選択肢 */
    options: FilterOption[];
    /** 現在の値（未選択は undefined） */
    value?: string;
    /** プレースホルダー */
    placeholder?: string;
    /** 未選択に戻せるか */
    clearable?: boolean;
}
/** 単一チェックのフィールド */
export interface FilterToggleField {
    type: "toggle";
    /** 一意なキー */
    key: string;
    /** ラベル */
    label: string;
    /** 現在の値 */
    value: boolean;
}
/** フィルターのフィールド定義 */
export type FilterField = FilterRangeField | FilterChipsField | FilterCheckboxesField | FilterSelectField | FilterToggleField;
/** フィールドから通知される値 */
export type FilterFieldValue = string | string[] | [number, number] | boolean;
export interface FilterPanelProps {
    /** フィールド定義の一覧 */
    fields: FilterField[];
    /** 値変更時（キーと新しい値を受け取る） */
    onChange: (key: string, value: FilterFieldValue) => void;
    /** リセット時 */
    onReset?: () => void;
    /** 適用時 */
    onSubmit?: () => void;
    /** 見出し */
    title?: React.ReactNode;
    /** リセットボタンのラベル。 @default "条件をリセット" */
    resetLabel?: string;
    /** 適用ボタンのラベル。 @default "この条件で適用" */
    submitLabel?: string;
    /** 下部に表示するサマリー */
    summary?: React.ReactNode;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * FilterPanel コンポーネント
 *
 * フィールド定義を渡すと、範囲・チップ・チェックボックス・セレクト・トグルを
 * 組み合わせた絞り込みパネルを描画する汎用コンポーネント。
 *
 * @example
 * <FilterPanel
 *   fields={[
 *     { type: "range", key: "rent", label: "賃料", min: 0, max: 300000, value: [0, 150000] },
 *     { type: "chips", key: "layout", label: "間取り", options: layoutOptions, value: layouts },
 *   ]}
 *   onChange={(key, value) => update(key, value)}
 * />
 */
export declare const FilterPanel: React.FC<FilterPanelProps>;
//# sourceMappingURL=FilterPanel.d.ts.map