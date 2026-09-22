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
export const TILE_SIZE = 256;

/** Web Mercator で表現可能な緯度の上限 */
export const MAX_LATITUDE = 85.05112878;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** ズームレベルに応じたワールドのピクセル幅を返す */
export function worldSize(zoom: number): number {
  return TILE_SIZE * 2 ** zoom;
}

/** 経度をワールドピクセル X 座標へ変換する */
export function lngToWorldX(lng: number, zoom: number): number {
  return ((lng + 180) / 360) * worldSize(zoom);
}

/** 緯度をワールドピクセル Y 座標へ変換する */
export function latToWorldY(lat: number, zoom: number): number {
  const clamped = clamp(lat, -MAX_LATITUDE, MAX_LATITUDE);
  const sin = Math.sin((clamped * Math.PI) / 180);
  return (
    (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * worldSize(zoom)
  );
}

/** ワールドピクセル X 座標を経度へ変換する */
export function worldXToLng(x: number, zoom: number): number {
  return (x / worldSize(zoom)) * 360 - 180;
}

/** ワールドピクセル Y 座標を緯度へ変換する */
export function worldYToLat(y: number, zoom: number): number {
  const n = Math.PI - (2 * Math.PI * y) / worldSize(zoom);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

/** 緯度経度をワールドピクセル座標へ変換する */
export function project(latlng: LatLng, zoom: number): Point {
  return {
    x: lngToWorldX(latlng.lng, zoom),
    y: latToWorldY(latlng.lat, zoom),
  };
}

/** ワールドピクセル座標を緯度経度へ変換する */
export function unproject(point: Point, zoom: number): LatLng {
  return {
    lat: worldYToLat(point.y, zoom),
    lng: worldXToLng(point.x, zoom),
  };
}

/** 2点間の距離をワールドピクセルで返す */
export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** ズームレベルを [min, max] に収める */
export function clampZoom(zoom: number, min: number, max: number): number {
  return clamp(zoom, min, max);
}
