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
export declare const GSI_TILE_BASE_URL = "https://cyberjapandata.gsi.go.jp/xyz";
/** 地理院タイルの出典表示 */
export declare const GSI_ATTRIBUTION = "\u56FD\u571F\u5730\u7406\u9662";
/** 地理院タイル（淡色）: ピンや重ね書きに向く */
export declare const GSI_PALE_TILE_URL: TileUrlBuilder;
/** 地理院タイル（標準） */
export declare const GSI_STANDARD_TILE_URL: TileUrlBuilder;
/** 地理院タイル（航空写真） */
export declare const GSI_PHOTO_TILE_URL: TileUrlBuilder;
//# sourceMappingURL=tiles.d.ts.map