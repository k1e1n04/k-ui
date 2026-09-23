import type React from "react";
/** ピンのトーン */
export type MapPinTone = "primary" | "accent" | "success" | "danger" | "muted";
/** ピンのサイズ */
export type MapPinSize = "sm" | "md" | "lg";
export interface MapPinProps {
    /** ピンに表示するラベル（価格など） */
    label?: React.ReactNode;
    /** トーン。 @default "primary" */
    tone?: MapPinTone;
    /** サイズ。 @default "md" */
    size?: MapPinSize;
    /** 選択状態 */
    selected?: boolean;
    /** 追加のクラス名 */
    className?: string;
    /** ルート要素への ref */
    ref?: React.Ref<HTMLSpanElement>;
}
/**
 * MapPin コンポーネント
 *
 * 地図上のマーカーに使う吹き出し型のピン。価格などをラベル表示できる。
 *
 * @example
 * <MapPin label="8.5万円" tone="accent" selected />
 */
export declare const MapPin: React.FC<MapPinProps>;
//# sourceMappingURL=MapPin.d.ts.map