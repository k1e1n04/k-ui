import type React from "react";
/** チップのバリアント。 @default undefined */
export type ChipVariant = "default" | "primary" | "success" | "info" | "warning" | "danger";
/** チップのプロパティ。 @default undefined */
export interface ChipProps {
    /** 子要素。 @default undefined */
    children: React.ReactNode;
    /** バリアント。 @default "default" */
    variant?: ChipVariant;
    /** 選択状態。 @default false */
    selected?: boolean;
    /** クリック時の処理。 @default undefined */
    onClick?: () => void;
    /** 削除時の処理。 @default undefined */
    onDelete?: () => void;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 選択・削除操作を提供できるチップ。 @default undefined */
export declare function Chip({ children, variant, selected, onClick, onDelete, disabled, className, }: ChipProps): React.JSX.Element;
//# sourceMappingURL=Chip.d.ts.map