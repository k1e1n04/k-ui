import type { ReactNode } from "react";
import React from "react";
export interface ListLayoutProps {
    /** リストのタイトル */
    title: string;
    /** エラーメッセージ */
    errorMessage?: string | null;
    /** エラーメッセージクリア関数 */
    onClearError?: () => void;
    /** 検索キーワード */
    searchKeyword: string;
    /** 検索キーワード更新関数 */
    onSearchChange: (value: string) => void;
    /** 検索フォーム表示状態 */
    showSearchForm: boolean;
    /** 検索フォーム表示状態更新関数 */
    onToggleSearch: (show: boolean) => void;
    /** フィルターオプション表示状態 */
    showFilterOptions: boolean;
    /** フィルターオプション表示状態更新関数 */
    onToggleFilter: (show: boolean) => void;
    /** 未完了のみ表示フラグ */
    showOnlyIncomplete?: boolean;
    /** 未完了のみ表示フラグ更新関数 */
    onToggleIncomplete?: (show: boolean) => void;
    /** 未完了フィルターのラベル */
    incompleteFilterLabel: string;
    /** 追加フォーム表示状態 */
    showAddForm?: boolean;
    /** 追加フォーム表示状態更新関数 */
    onToggleAddForm?: (show: boolean) => void;
    /** 追加ボタンクリック関数（ダイアログ表示用） */
    onAddClick?: () => void;
    /** 追加フォームコンポーネント */
    addFormComponent?: ReactNode;
    /** 統計表示コンポーネント */
    statsComponent?: ReactNode;
    /** リストアイテム */
    children: ReactNode;
    /** ローディング状態 */
    isLoading?: boolean;
    /** エラー状態 */
    isError?: boolean;
    /** エラー時のリロード関数 */
    onReload?: () => void;
    /** 空状態のメッセージ */
    emptyMessage?: string;
    /** 検索結果なしのメッセージ */
    noSearchResultsMessage?: string;
    /** 未完了フィルター機能を有効にするか */
    enableIncompleteFilter?: boolean;
    /** カスタムアクションボタン */
    customActions?: ReactNode;
    /** 追加のクラス名 */
    className?: string;
    /** アイコン: 検索 */
    searchIcon?: ReactNode;
    /** アイコン: フィルター */
    filterIcon?: ReactNode;
    /** アイコン: 追加 */
    addIcon?: ReactNode;
    /** アイコン: 閉じる */
    closeIcon?: ReactNode;
    /** ラベル: 検索プレースホルダー */
    searchPlaceholder?: string;
    /** ラベル: 検索を閉じる */
    closeSearchLabel?: string;
    /** ラベル: フィルター設定タイトル */
    filterTitle?: string;
    /** ラベル: エラー時のメッセージ */
    errorFetchMessage?: string;
    /** ラベル: リロードボタン */
    reloadLabel?: string;
    /** ラベル: 未完了なしメッセージ */
    noIncompleteMessage?: string;
    /** ラベル: 検索ボタンaria-label */
    searchButtonLabel?: string;
    /** ラベル: フィルターボタンaria-label */
    filterButtonLabel?: string;
    /** ラベル: 追加ボタンaria-label */
    addButtonLabel?: string;
    /** ラベル: フォームを閉じるaria-label */
    closeFormLabel?: string;
}
/**
 * 汎用リストレイアウトコンポーネント
 *
 * 検索・フィルター・追加フォーム・統計表示・ローディング/エラー状態を統合したリストUI
 */
export declare const ListLayout: React.FC<ListLayoutProps>;
//# sourceMappingURL=ListLayout.d.ts.map