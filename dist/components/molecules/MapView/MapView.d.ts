import type React from "react";
import { type LatLng } from "../../../utils/geo";
import { type TileUrlBuilder } from "../../../utils/tiles";
/** 地図の中心座標の初期値（東京駅） */
export declare const DEFAULT_MAP_CENTER: LatLng;
export interface MapViewProps {
    /** 中心座標（制御用） */
    center?: LatLng;
    /** 中心座標の初期値（非制御用） */
    defaultCenter?: LatLng;
    /** ズームレベル（制御用） */
    zoom?: number;
    /** ズームレベルの初期値（非制御用） @default 14 */
    defaultZoom?: number;
    /** 最小ズーム。 @default 3 */
    minZoom?: number;
    /** 最大ズーム。 @default 19 */
    maxZoom?: number;
    /** 中心座標変更時 */
    onCenterChange?: (center: LatLng) => void;
    /** ズーム変更時 */
    onZoomChange?: (zoom: number) => void;
    /** 地図タップ時 */
    onTap?: (latlng: LatLng) => void;
    /**
     * タイル画像URLの生成関数。
     * 省略時は地理院タイル（淡色）を使用し、`null` でグリッド背景になる。
     * @default GSI_PALE_TILE_URL
     */
    tileUrl?: TileUrlBuilder | null;
    /** 出典表示。省略時はタイルに応じた既定値（地理院タイルなら「国土地理院」） */
    attribution?: React.ReactNode;
    /** 出典表示を表示するか。 @default true */
    showAttribution?: boolean;
    /** ドラッグ・ズーム操作を有効にするか。 @default true */
    interactive?: boolean;
    /** 高さ。 @default 400 */
    height?: number | string;
    /** マーカーなどの子要素 */
    children?: React.ReactNode;
    /** 追加のクラス名 */
    className?: string;
    /** アクセシブルなラベル。 @default "地図" */
    ariaLabel?: string;
}
/**
 * MapView コンポーネント
 *
 * 依存ライブラリなしで動作する地図キャンバス。
 * ドラッグでの移動（なぞる）、タップでの座標取得、ズーム操作に対応する。
 * 子要素に MapMarker を配置すると、緯度経度に追従して表示される。
 *
 * @example
 * <MapView
 *   center={{ lat: 35.68, lng: 139.76 }}
 *   onTap={(latlng) => console.log(latlng)}
 * >
 *   <MapMarker position={{ lat: 35.68, lng: 139.76 }} label="8.5万円" />
 * </MapView>
 */
export declare const MapView: React.FC<MapViewProps>;
//# sourceMappingURL=MapView.d.ts.map