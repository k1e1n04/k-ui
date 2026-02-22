"use client";

import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Button, Spinner, Typography } from "../../atoms";

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
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "outline"
    | "ghost"
    | "danger";
  /** aria-label */
  ariaLabel?: string;
  /** 行ごとの無効化制御 */
  disabled?: boolean | ((row: T) => boolean);
}

export type DataTableActions<T> =
  | DataTableAction<T>[]
  | ((row: T) => DataTableAction<T>[]);
export type DataTableMobileMode = "scroll" | "cards";

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
  /** 追加クラス */
  className?: string;
}

const resolveActions = <T,>(
  row: T,
  actions?: DataTableActions<T>,
): DataTableAction<T>[] => {
  if (!actions) return [];
  return typeof actions === "function" ? actions(row) : actions;
};

const isActionDisabled = <T,>(action: DataTableAction<T>, row: T): boolean => {
  if (typeof action.disabled === "function") {
    return action.disabled(row);
  }
  return Boolean(action.disabled);
};

const renderActions = <T,>(row: T, actions?: DataTableActions<T>) => {
  const resolvedActions = resolveActions(row, actions);

  if (resolvedActions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {resolvedActions.map((action) => (
        <Button
          key={action.label}
          type="button"
          size="small"
          variant={action.variant ?? "ghost"}
          aria-label={action.ariaLabel ?? action.label}
          disabled={isActionDisabled(action, row)}
          onClick={() => action.onClick(row)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

/**
 * 汎用DataTableコンポーネント
 *
 * - テーブルヘッダー / 行 / 空状態 / ローディングを提供
 * - `mobileMode="scroll"` では横スクロール対応
 * - `mobileMode="cards"` ではモバイルをカード表示に切り替え
 */
export const DataTable = <T,>({
  columns,
  rows,
  getRowId,
  actions,
  actionHeader = "Actions",
  isLoading = false,
  loadingLabel = "Loading...",
  emptyMessage = "No data available.",
  mobileMode = "scroll",
  className,
}: DataTableProps<T>) => {
  const hasActionColumn = Boolean(actions);
  const tableColumnCount = columns.length + (hasActionColumn ? 1 : 0);

  if (isLoading) {
    return (
      <div className={cn("w-full", className)} aria-busy="true">
        <Spinner label={loadingLabel} />
      </div>
    );
  }

  if (mobileMode === "cards") {
    return (
      <div className={cn("w-full", className)}>
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300",
                      column.headerClassName,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
                {hasActionColumn && (
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    {actionHeader}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={tableColumnCount}
                    className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    <Typography as="span" tone="muted">
                      {emptyMessage}
                    </Typography>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr
                    key={getRowId(row, index)}
                    className="bg-white dark:bg-gray-900"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 text-sm text-gray-700 dark:text-gray-200",
                          column.cellClassName,
                        )}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                    {hasActionColumn && (
                      <td className="px-4 py-3 text-right">
                        {renderActions(row, actions)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {rows.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center dark:border-gray-700 dark:bg-gray-900/50">
              <Typography as="p" tone="muted">
                {emptyMessage}
              </Typography>
            </div>
          ) : (
            rows.map((row, index) => (
              <div
                key={getRowId(row, index)}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <dl className="space-y-3">
                  {columns.map((column) => (
                    <div key={column.key} className="space-y-1">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {column.mobileLabel ?? column.header}
                      </dt>
                      <dd
                        className={cn(
                          "text-sm text-gray-700 dark:text-gray-200",
                          column.cellClassName,
                        )}
                      >
                        {column.render(row)}
                      </dd>
                    </div>
                  ))}
                </dl>
                {hasActionColumn && (
                  <div className="mt-4">{renderActions(row, actions)}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",
        className,
      )}
    >
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-800/60">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300",
                  column.headerClassName,
                )}
              >
                {column.header}
              </th>
            ))}
            {hasActionColumn && (
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                {actionHeader}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={tableColumnCount}
                className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                <Typography as="span" tone="muted">
                  {emptyMessage}
                </Typography>
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={getRowId(row, index)}
                className="bg-white dark:bg-gray-900"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-sm text-gray-700 dark:text-gray-200",
                      column.cellClassName,
                    )}
                  >
                    {column.render(row)}
                  </td>
                ))}
                {hasActionColumn && (
                  <td className="px-4 py-3 text-right">
                    {renderActions(row, actions)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
