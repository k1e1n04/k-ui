import type React from "react";
import type { LatLng } from "../../../utils/geo";
import { type MapPinSize, type MapPinTone } from "../../atoms/MapPin";
export interface MapMarkerProps {
    /** マーカーの位置 */
    position: LatLng;
    /** ピンに表示するラベル（価格など） */
    label?: React.ReactNode;
    /** カスタムマーカー内容（指定時は MapPin を置き換える） */
    children?: React.ReactNode;
    /** トーン */
    tone?: MapPinTone;
    /** サイズ */
    size?: MapPinSize;
    /** 選択状態 */
    selected?: boolean;
    /** クリック時の処理 */
    onClick?: () => void;
    /** アクセシブルなラベル */
    ariaLabel?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * MapMarker コンポーネント
 *
 * MapView の子要素として配置し、緯度経度に追従するマーカー。
 *
 * @example
 * <MapView center={center}>
 *   <MapMarker position={center} label="8.5万円" onClick={handleClick} />
 * </MapView>
 */
export declare const MapMarker: React.FC<MapMarkerProps>;
//# sourceMappingURL=MapMarker.d.ts.map