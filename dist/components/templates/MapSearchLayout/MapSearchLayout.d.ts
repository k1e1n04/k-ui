import type React from "react";
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
export declare const MapSearchLayout: React.FC<MapSearchLayoutProps>;
//# sourceMappingURL=MapSearchLayout.d.ts.map