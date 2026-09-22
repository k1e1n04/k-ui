/**
 * 地図タイルのURLビルダー
 *
 * 地理院タイル（国土地理院）を既定として利用できるようにする。
 * 出典表示は「国土地理院」を明示する必要がある。
 * @see https://maps.gsi.go.jp/development/ichiran.html
 */

/** タイル座標から画像URLを生成する関数 */
export type TileUrlBuilder = (x: number, y: number, z: number) => string;

/** 地理院タイルの配信元 */
export const GSI_TILE_BASE_URL = "https://cyberjapandata.gsi.go.jp/xyz";

/** 地理院タイルの出典表示 */
export const GSI_ATTRIBUTION = "国土地理院";

/** 地理院タイル（淡色）: ピンや重ね書きに向く */
export const GSI_PALE_TILE_URL: TileUrlBuilder = (x, y, z) =>
  `${GSI_TILE_BASE_URL}/pale/${z}/${x}/${y}.png`;

/** 地理院タイル（標準） */
export const GSI_STANDARD_TILE_URL: TileUrlBuilder = (x, y, z) =>
  `${GSI_TILE_BASE_URL}/std/${z}/${x}/${y}.png`;

/** 地理院タイル（航空写真） */
export const GSI_PHOTO_TILE_URL: TileUrlBuilder = (x, y, z) =>
  `${GSI_TILE_BASE_URL}/ort/${z}/${x}/${y}.png`;
