import type React from "react";
/** コントロールの配置位置 */
export type MapControlsPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export interface MapControlsProps {
    /** ズームイン時の処理（省略時は MapView に連携） */
    onZoomIn?: () => void;
    /** ズームアウト時の処理（省略時は MapView に連携） */
    onZoomOut?: () => void;
    /** リセット時の処理 */
    onReset?: () => void;
    /** 現在地取得時の処理（指定時のみボタンを表示） */
    onLocate?: () => void;
    /** リセットボタンを表示するか。 @default false */
    showReset?: boolean;
    /** 配置位置。 @default "bottom-right" */
    position?: MapControlsPosition;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * MapControls コンポーネント
 *
 * 地図のズーム・リセット・現在地ボタンをまとめたコントロール。
 * MapView の子要素として置くと、操作が自動で連携される。
 *
 * @example
 * <MapView center={center}>
 *   <MapControls showReset onReset={reset} onLocate={locate} />
 * </MapView>
 */
export declare const MapControls: React.FC<MapControlsProps>;
//# sourceMappingURL=MapControls.d.ts.map