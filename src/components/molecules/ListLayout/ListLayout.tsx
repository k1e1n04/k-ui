"use client";

import type { ReactNode } from "react";
import React from "react";
import { cn } from "../../../utils/cn";
import { Heading, Typography } from "../../atoms";

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

/** デフォルトのXMarkアイコン */
const DefaultCloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/** デフォルトの検索アイコン */
const DefaultSearchIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

/** デフォルトのフィルターアイコン */
const DefaultFilterIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
    />
  </svg>
);

/** デフォルトの追加アイコン */
const DefaultAddIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

/**
 * 汎用リストレイアウトコンポーネント
 *
 * 検索・フィルター・追加フォーム・統計表示・ローディング/エラー状態を統合したリストUI
 */
export const ListLayout: React.FC<ListLayoutProps> = ({
  title,
  errorMessage,
  onClearError,
  searchKeyword,
  onSearchChange,
  showSearchForm,
  onToggleSearch,
  showFilterOptions,
  onToggleFilter,
  showOnlyIncomplete,
  onToggleIncomplete,
  incompleteFilterLabel,
  showAddForm,
  onToggleAddForm,
  onAddClick,
  addFormComponent,
  statsComponent,
  children,
  isLoading = false,
  isError = false,
  onReload,
  emptyMessage = "Add items to get started",
  noSearchResultsMessage = "No matching items found",
  enableIncompleteFilter = true,
  customActions,
  className,
  searchIcon,
  filterIcon,
  addIcon,
  closeIcon,
  searchPlaceholder = "Search...",
  closeSearchLabel = "Close",
  filterTitle = "Filters",
  errorFetchMessage = "Failed to fetch data.",
  reloadLabel = "Reload",
  noIncompleteMessage = "No incomplete items",
  searchButtonLabel = "Search",
  filterButtonLabel = "Filter",
  addButtonLabel = "Add new",
  closeFormLabel = "Close form",
}) => {
  const hasItems = React.Children.count(children) > 0;

  const SearchIconComponent = searchIcon || <DefaultSearchIcon />;
  const FilterIconComponent = filterIcon || <DefaultFilterIcon />;
  const AddIconComponent = addIcon || <DefaultAddIcon />;
  const CloseIconComponent = closeIcon || <DefaultCloseIcon />;

  return (
    <div className={cn("max-w-3xl mx-auto p-4", className)}>
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <Heading
          as="h1"
          size="xl"
          style={{ fontWeight: "var(--kui-font-weight-bold)" }}
        >
          {title}
        </Heading>

        <div className="flex gap-2">
          {customActions}

          {!showSearchForm && (
            <button
              onClick={() => onToggleSearch(true)}
              className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
              aria-label={searchButtonLabel}
            >
              {SearchIconComponent}
            </button>
          )}
          {enableIncompleteFilter && (
            <button
              onClick={() => onToggleFilter(!showFilterOptions)}
              className={cn(
                "p-2 rounded-full transition-colors",
                showFilterOptions
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/70"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
              )}
              aria-label={filterButtonLabel}
            >
              {FilterIconComponent}
            </button>
          )}

          {onToggleAddForm ? (
            <button
              onClick={() => onToggleAddForm(!showAddForm)}
              className={cn(
                "p-2 rounded-full transition-colors",
                showAddForm
                  ? "bg-rose-100 dark:bg-rose-900/50 text-rose-500 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800/70"
                  : "bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-800/50",
              )}
              aria-label={showAddForm ? closeFormLabel : addButtonLabel}
            >
              {showAddForm ? CloseIconComponent : AddIconComponent}
            </button>
          ) : (
            onAddClick && (
              <button
                onClick={onAddClick}
                className="p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                aria-label={addButtonLabel}
              >
                {AddIconComponent}
              </button>
            )
          )}
        </div>
      </div>

      {/* エラーメッセージ */}
      {errorMessage && onClearError && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 flex justify-between items-center animate-kui-slide-down shadow-sm">
          <Typography as="p" tone="danger">
            {errorMessage}
          </Typography>
          <button
            onClick={onClearError}
            className="text-red-500 dark:text-red-300 p-1 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-full transition-colors"
          >
            {CloseIconComponent}
          </button>
        </div>
      )}

      {/* フィルターオプション */}
      {enableIncompleteFilter && showFilterOptions && (
        <div className="mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg shadow-sm p-3 animate-kui-slide-down">
          <div className="flex justify-between items-center">
            <Heading
              as="h3"
              size="sm"
              style={{
                color: "var(--kui-color-info)",
                fontWeight: "var(--kui-font-weight-medium)",
              }}
            >
              {filterTitle}
            </Heading>
            <button
              onClick={() => onToggleFilter(false)}
              className="text-indigo-500 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 p-1 rounded-full transition-colors"
            >
              {CloseIconComponent}
            </button>
          </div>

          {onToggleIncomplete && (
            <div className="mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showOnlyIncomplete"
                  checked={showOnlyIncomplete}
                  onChange={(e) => onToggleIncomplete(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 dark:text-indigo-500 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="showOnlyIncomplete" className="ml-2">
                  <Typography as="span">{incompleteFilterLabel}</Typography>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 検索フォーム */}
      {showSearchForm && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 relative animate-kui-slide-down">
          <div className="flex items-center">
            <span className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-6">
              {SearchIconComponent}
            </span>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-10 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {searchKeyword && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                {CloseIconComponent}
              </button>
            )}
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={() => onToggleSearch(false)}
              className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-800/50 rounded-md transition-colors"
            >
              <Typography as="span" variant="body-sm" tone="info">
                {closeSearchLabel}
              </Typography>
            </button>
          </div>
        </div>
      )}

      {/* 追加フォーム */}
      {showAddForm && addFormComponent && (
        <div className="mb-4">{addFormComponent}</div>
      )}

      {/* 統計表示 */}
      {statsComponent && (
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          {statsComponent}
        </div>
      )}

      {/* ローディング状態 */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400" />
        </div>
      )}

      {/* エラー状態 */}
      {isError && onReload && (
        <div className="text-center py-8 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <Typography as="p" tone="danger">
            {errorFetchMessage}
          </Typography>
          <button
            onClick={onReload}
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700/50 transition-colors"
          >
            <Typography as="span" variant="body-sm" tone="danger">
              {reloadLabel}
            </Typography>
          </button>
        </div>
      )}

      {/* リスト */}
      {!isLoading && !isError && (
        <div className="space-y-3">
          {hasItems ? (
            children
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg animate-kui-fade-in">
              {searchKeyword ? (
                <Typography as="p" tone="muted">
                  {noSearchResultsMessage}
                </Typography>
              ) : showOnlyIncomplete ? (
                <Typography as="p" tone="muted">
                  {noIncompleteMessage}
                </Typography>
              ) : (
                <Typography as="p" tone="muted">
                  {emptyMessage}
                </Typography>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
