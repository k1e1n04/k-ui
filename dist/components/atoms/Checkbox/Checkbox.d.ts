import type React from "react";
/** チェックボックスのサイズ */
export type CheckboxSize = "small" | "medium" | "large";
export interface CheckboxProps {
    /** 現在のチェック状態 */
    checked: boolean;
    /** 変更ハンドラー */
    onChange: (checked: boolean) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** 表示ラベル */
    label?: string;
    /** サイズ */
    size?: CheckboxSize;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * チェックボックスコンポーネント
 *
 * ON/OFFの選択に使用するチェックボックスUI
 */
export declare const Checkbox: React.FC<CheckboxProps>;
//# sourceMappingURL=Checkbox.d.ts.map