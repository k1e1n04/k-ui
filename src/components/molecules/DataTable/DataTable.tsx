"use client";

import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
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
  virtualization,
  className,
}: DataTableProps<T>) => {
  const hasActionColumn = Boolean(actions);
  const tableColumnCount = columns.length + (hasActionColumn ? 1 : 0);
  const [scrollTop, setScrollTop] = useState(0);
  const isVirtualizationEnabled = virtualization?.enabled ?? false;
  const virtualizedHeight = virtualization?.height ?? 400;
  const virtualizedRowHeight = virtualization?.rowHeight ?? 52;
  const virtualizedOverscan = virtualization?.overscan ?? 4;
  const viewportHeight =
    typeof virtualizedHeight === "number"
      ? virtualizedHeight
      : Number.parseInt(String(virtualizedHeight).replace("px", ""), 10) || 400;
  const shouldVirtualize = isVirtualizationEnabled && mobileMode === "scroll";

  const virtualizedWindow = useMemo(() => {
    if (!shouldVirtualize || rows.length === 0) {
      return {
        startIndex: 0,
        endIndex: rows.length,
        topSpacerHeight: 0,
        bottomSpacerHeight: 0,
      };
    }

    const safeRowHeight = virtualizedRowHeight > 0 ? virtualizedRowHeight : 52;
    const safeOverscan = virtualizedOverscan >= 0 ? virtualizedOverscan : 0;
    const visibleCount = Math.ceil(viewportHeight / safeRowHeight);
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / safeRowHeight) - safeOverscan,
    );
    const endIndex = Math.min(
      rows.length,
      startIndex + visibleCount + safeOverscan * 2,
    );

    return {
      startIndex,
      endIndex,
      topSpacerHeight: startIndex * safeRowHeight,
      bottomSpacerHeight: Math.max(0, (rows.length - endIndex) * safeRowHeight),
    };
  }, [
    shouldVirtualize,
    rows.length,
    virtualizedRowHeight,
    virtualizedOverscan,
    viewportHeight,
    scrollTop,
  ]);

  const visibleRows = shouldVirtualize
    ? rows.slice(virtualizedWindow.startIndex, virtualizedWindow.endIndex)
    : rows;

  const tableWrapperStyle: CSSProperties | undefined = shouldVirtualize
    ? { height: virtualizedHeight, overflowY: "auto" }
    : undefined;

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
      style={tableWrapperStyle}
      onScroll={
        shouldVirtualize
          ? (event) => setScrollTop(event.currentTarget.scrollTop)
          : undefined
      }
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
            <>
              {shouldVirtualize && virtualizedWindow.topSpacerHeight > 0 && (
                <tr>
                  <td
                    colSpan={tableColumnCount}
                    style={{
                      height: `${virtualizedWindow.topSpacerHeight}px`,
                      padding: 0,
                    }}
                  />
                </tr>
              )}
              {visibleRows.map((row, index) => {
                const rowIndex = shouldVirtualize
                  ? virtualizedWindow.startIndex + index
                  : index;

                return (
                  <tr
                    key={getRowId(row, rowIndex)}
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
                );
              })}
              {shouldVirtualize && virtualizedWindow.bottomSpacerHeight > 0 && (
                <tr>
                  <td
                    colSpan={tableColumnCount}
                    style={{
                      height: `${virtualizedWindow.bottomSpacerHeight}px`,
                      padding: 0,
                    }}
                  />
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
