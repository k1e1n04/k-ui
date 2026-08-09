import type React from "react";
import type { ReactNode } from "react";
/** ダイアログの最大幅。 @default undefined */
export type DialogMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";
/** ダイアログのプロパティ。 @default undefined */
export interface DialogProps {
    /** ダイアログの開閉状態。 @default undefined */
    open: boolean;
    /** ダイアログを閉じる関数。 @default undefined */
    onClose: () => void;
    /** ダイアログのタイトル。 @default undefined */
    title?: string;
    /** ダイアログのコンテンツ。 @default undefined */
    children: ReactNode;
    /** ダイアログの最大幅。 @default "md" */
    maxWidth?: DialogMaxWidth;
    /** 閉じるボタンを非表示にするか。 @default false */
    hideCloseButton?: boolean;
    /** 外クリックで閉じることを無効にするか。 @default false */
    disableOutsideClick?: boolean;
    /** 閉じるボタンの aria-label。 @default "Close dialog" */
    closeButtonLabel?: string;
    /** タイトルがない場合のダイアログの aria-label。 @default "Dialog" */
    ariaLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * 共通ダイアログコンポーネント
 *
 * - 背景をぼかして元のコンテンツが見える
 * - 外クリックでダイアログを閉じる
 * - ESCキーでダイアログを閉じる
 * - ダークモード対応
 *
 * @default undefined
 */
export declare const Dialog: React.FC<DialogProps>;
//# sourceMappingURL=Dialog.d.ts.map