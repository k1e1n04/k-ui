"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export interface SplitPaneLayoutProps {
  /** ヘッダー */
  header?: React.ReactNode;
  /** サイドバー */
  sidebar?: React.ReactNode;
  /** メイン領域 */
  main?: React.ReactNode;
  /** サイドバーの幅。 @default 380 */
  sidebarWidth?: number | string;
  /** サイドバーの配置。 @default "start" */
  sidebarPosition?: "start" | "end";
  /** モバイルでメイン領域を先に表示するか。 @default false */
  mainFirst?: boolean;
  /** サイドバーのアクセシブルなラベル。 @default "サイドバー" */
  sidebarLabel?: string;
  /** 下部の固定要素 */
  footer?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

const resolveWidth = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

/**
 * SplitPaneLayout コンポーネント
 *
 * サイドバーとメイン領域を並べる汎用レイアウト。
 * モバイルでは縦積みに切り替わる。
 *
 * @example
 * <SplitPaneLayout
 *   header={<AppBar title="検索" />}
 *   sidebar={<FilterPanel ... />}
 *   main={<MapView ... />}
 * />
 */
export const SplitPaneLayout: React.FC<SplitPaneLayoutProps> = ({
  header,
  sidebar,
  main,
  sidebarWidth = 380,
  sidebarPosition = "start",
  mainFirst = false,
  sidebarLabel = "サイドバー",
  footer,
  className,
}) => {
  const sidebarElement = sidebar ? (
    <aside
      aria-label={sidebarLabel}
      className={cn(
        "w-full shrink-0 overflow-y-auto border-border bg-surface lg:w-[var(--kui-split-pane-sidebar-width)]",
        "border-b lg:border-b-0",
        sidebarPosition === "start" ? "lg:border-r" : "lg:border-l",
        mainFirst && "order-2 lg:order-1",
        sidebarPosition === "end" && !mainFirst && "lg:order-2",
      )}
    >
      {sidebar}
    </aside>
  ) : null;

  return (
    <div
      className={cn("flex min-h-screen flex-col bg-surface-raised", className)}
      style={
        {
          "--kui-split-pane-sidebar-width": resolveWidth(sidebarWidth),
        } as React.CSSProperties
      }
    >
      {header && <div className="shrink-0">{header}</div>}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {sidebarElement}
        <main
          className={cn(
            "relative min-h-[50vh] flex-1 lg:min-h-0",
            mainFirst && "order-1 lg:order-2",
            sidebarPosition === "end" && !mainFirst && "lg:order-1",
          )}
        >
          {main}
        </main>
      </div>
      {footer}
    </div>
  );
};
