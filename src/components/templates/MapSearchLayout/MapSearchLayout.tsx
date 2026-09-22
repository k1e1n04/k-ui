"use client";

import type React from "react";

import { cn } from "../../../utils/cn";

export interface MapSearchLayoutProps {
  /** ヘッダー */
  header?: React.ReactNode;
  /** サイドバー（絞り込み・一覧） */
  sidebar?: React.ReactNode;
  /** 地図 */
  map?: React.ReactNode;
  /** サイドバーの幅。 @default 380 */
  sidebarWidth?: number | string;
  /** モバイルで地図を先に表示するか。 @default false */
  mapFirst?: boolean;
  /** 下部の固定要素（比較トレイなど） */
  footer?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

const resolveWidth = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

/**
 * MapSearchLayout コンポーネント
 *
 * 地図検索画面の基本レイアウト。サイドバーと地図を並べ、
 * モバイルでは縦積みに切り替える。
 *
 * @example
 * <MapSearchLayout
 *   header={<AppBar title="賃貸検索" />}
 *   sidebar={<PropertyList properties={properties} />}
 *   map={<MapView center={center} />}
 * />
 */
export const MapSearchLayout: React.FC<MapSearchLayoutProps> = ({
  header,
  sidebar,
  map,
  sidebarWidth = 380,
  mapFirst = false,
  footer,
  className,
}) => {
  return (
    <div
      className={cn("flex min-h-screen flex-col bg-surface-raised", className)}
      style={
        {
          "--kui-map-sidebar-width": resolveWidth(sidebarWidth),
        } as React.CSSProperties
      }
    >
      {header && <div className="shrink-0">{header}</div>}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {sidebar && (
          <aside
            aria-label="検索条件と結果"
            className={cn(
              "w-full shrink-0 overflow-y-auto border-b border-border bg-surface lg:w-[var(--kui-map-sidebar-width)] lg:border-b-0 lg:border-r",
              mapFirst && "order-2 lg:order-1",
            )}
          >
            {sidebar}
          </aside>
        )}
        <main
          className={cn(
            "relative min-h-[50vh] flex-1 lg:min-h-0",
            mapFirst && "order-1 lg:order-2",
          )}
        >
          {map}
        </main>
      </div>
      {footer}
    </div>
  );
};
