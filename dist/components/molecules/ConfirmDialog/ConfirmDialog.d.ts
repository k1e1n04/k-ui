import type React from "react";
import type { ReactNode } from "react";
/** 確認ダイアログのバリアント */
export type ConfirmDialogVariant = "danger" | "warning" | "info";
export interface ConfirmDialogProps {
    /** ダイアログの開閉状態 */
    open: boolean;
    /** ダイアログを閉じる関数 */
    onClose: () => void;
    /** 確認関数 */
    onConfirm: () => void;
    /** ダイアログのタイトル */
    title: string;
    /** 確認メッセージ */
    message: ReactNode;
    /** 補助メッセージ */
    description?: string;
    /** バリアント */
    variant?: ConfirmDialogVariant;
    /** 処理中かどうか */
    isProcessing?: boolean;
    /** キャンセルボタンのラベル */
    cancelLabel?: string;
    /** 確認ボタンのラベル */
    confirmLabel?: string;
    /** 処理中のラベル */
    processingLabel?: string;
    /** アイコン（カスタム） */
    icon?: ReactNode;
}
/**
 * 汎用確認ダイアログコンポーネント
 */
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
//# sourceMappingURL=ConfirmDialog.d.ts.map