/**
 * 地図表示用の座標ユーティリティ（Web Mercator 投影）
 *
 * 緯度経度と、ズームレベルごとの「ワールドピクセル座標」を相互変換する。
 * タイルサイズは 256px を前提とする。
 */
/** 緯度経度 */
export interface LatLng {
    /** 緯度 */
    lat: number;
    /** 経度 */
    lng: number;
}
/** 2次元座標 */
export interface Point {
    /** X 座標 */
    x: number;
    /** Y 座標 */
    y: number;
}
/** タイル1枚のピクセルサイズ */
export declare const TILE_SIZE = 256;
/** Web Mercator で表現可能な緯度の上限 */
export declare const MAX_LATITUDE = 85.05112878;
/** ズームレベルに応じたワールドのピクセル幅を返す */
export declare function worldSize(zoom: number): number;
/** 経度をワールドピクセル X 座標へ変換する */
export declare function lngToWorldX(lng: number, zoom: number): number;
/** 緯度をワールドピクセル Y 座標へ変換する */
export declare function latToWorldY(lat: number, zoom: number): number;
/** ワールドピクセル X 座標を経度へ変換する */
export declare function worldXToLng(x: number, zoom: number): number;
/** ワールドピクセル Y 座標を緯度へ変換する */
export declare function worldYToLat(y: number, zoom: number): number;
/** 緯度経度をワールドピクセル座標へ変換する */
export declare function project(latlng: LatLng, zoom: number): Point;
/** ワールドピクセル座標を緯度経度へ変換する */
export declare function unproject(point: Point, zoom: number): LatLng;
/** 2点間の距離をワールドピクセルで返す */
export declare function distance(a: Point, b: Point): number;
/** ズームレベルを [min, max] に収める */
export declare function clampZoom(zoom: number, min: number, max: number): number;
//# sourceMappingURL=geo.d.ts.map