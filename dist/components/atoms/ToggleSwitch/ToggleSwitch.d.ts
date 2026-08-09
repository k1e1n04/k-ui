import type React from "react";
/** トグルスイッチのサイズ */
export type ToggleSwitchSize = "small" | "medium" | "large";
export interface ToggleSwitchProps {
    /** 現在の状態 */
    checked: boolean;
    /** 変更ハンドラー */
    onChange: (checked: boolean) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** 表示ラベル */
    label?: string;
    /** サイズ */
    size?: ToggleSwitchSize;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * トグルスイッチコンポーネント
 *
 * ON/OFFの切り替えに使用するスイッチUI
 */
export declare const ToggleSwitch: React.FC<ToggleSwitchProps>;
//# sourceMappingURL=ToggleSwitch.d.ts.map