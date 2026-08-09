import { type ReactNode } from "react";
export interface DataTableColumn<T> {
    /** 一意な列キー */
    key: string;
    /** 列ヘッダー */
    header: ReactNode;
    /** セルの表示内容 */
    render: (row: T) => ReactNode;
    /** モバイルカード表示時のラベル */
    mobileLabel?: ReactNode;
    /** ヘッダーセルの追加クラス */
    headerClassName?: string;
    /** データセルの追加クラス */
    cellClassName?: string;
}
export interface DataTableAction<T> {
    /** ボタンラベル */
    label: string;
    /** 押下時のハンドラー */
    onClick: (row: T) => void;
    /** ボタンバリアント */
    variant?: "primary" | "secondary" | "success" | "info" | "outline" | "ghost" | "danger";
    /** aria-label */
    ariaLabel?: string;
    /** 行ごとの無効化制御 */
    disabled?: boolean | ((row: T) => boolean);
}
export type DataTableActions<T> = DataTableAction<T>[] | ((row: T) => DataTableAction<T>[]);
export type DataTableMobileMode = "scroll" | "cards";
export interface DataTableVirtualization {
    /** 仮想スクロールを有効化（mobileMode=scroll のみ対応） */
    enabled?: boolean;
    /** 仮想スクロール時の表示高さ */
    height?: number | string;
    /** 仮想スクロール時の1行高さ(px) */
    rowHeight?: number;
    /** 仮想スクロール時の前後描画行数 */
    overscan?: number;
}
export interface DataTableProps<T> {
    /** カラム定義 */
    columns: DataTableColumn<T>[];
    /** 行データ */
    rows: T[];
    /** 行キー生成 */
    getRowId: (row: T, index: number) => string;
    /** 右端のアクション列 */
    actions?: DataTableActions<T>;
    /** アクション列ヘッダー */
    actionHeader?: ReactNode;
    /** ローディング状態 */
    isLoading?: boolean;
    /** ローディング文言 */
    loadingLabel?: string;
    /** 空状態文言 */
    emptyMessage?: string;
    /** モバイル表示モード */
    mobileMode?: DataTableMobileMode;
    /** 仮想スクロール設定 */
    virtualization?: DataTableVirtualization;
    /** 追加クラス */
    className?: string;
}
/**
 * 汎用DataTableコンポーネント
 *
 * - テーブルヘッダー / 行 / 空状態 / ローディングを提供
 * - `mobileMode="scroll"` では横スクロール対応
 * - `mobileMode="cards"` ではモバイルをカード表示に切り替え
 */
export declare const DataTable: <T>({ columns, rows, getRowId, actions, actionHeader, isLoading, loadingLabel, emptyMessage, mobileMode, virtualization, className, }: DataTableProps<T>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DataTable.d.ts.map