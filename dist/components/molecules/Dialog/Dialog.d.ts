import type React from "react";
import type { ReactNode } from "react";
/** ダイアログの最大幅 */
export type DialogMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";
export interface DialogProps {
    /** ダイアログの開閉状態 */
    open: boolean;
    /** ダイアログを閉じる関数 */
    onClose: () => void;
    /** ダイアログのタイトル */
    title?: string;
    /** ダイアログのコンテンツ */
    children: ReactNode;
    /** ダイアログの最大幅 */
    maxWidth?: DialogMaxWidth;
    /** 閉じるボタンを非表示にするかどうか */
    hideCloseButton?: boolean;
    /** 外クリックで閉じることを無効にするかどうか */
    disableOutsideClick?: boolean;
    /** 閉じるボタンのaria-label */
    closeButtonLabel?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * 共通ダイアログコンポーネント
 *
 * - 背景をぼかして元のコンテンツが見える
 * - 外クリックでダイアログを閉じる
 * - ESCキーでダイアログを閉じる
 * - ダークモード対応
 */
export declare const Dialog: React.FC<DialogProps>;
//# sourceMappingURL=Dialog.d.ts.map