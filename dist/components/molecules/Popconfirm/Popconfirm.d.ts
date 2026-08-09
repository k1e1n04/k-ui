import type React from "react";
/** 確認ポップオーバーのプロパティ。 @default undefined */
export interface PopconfirmProps {
    /** ポップオーバーを開くトリガー要素。 @default undefined */
    children: React.ReactElement;
    /** 確認の見出し。 @default undefined */
    title: React.ReactNode;
    /** 確認の説明。 @default undefined */
    description?: React.ReactNode;
    /** 確認時の処理。 @default undefined */
    onConfirm: () => void;
    /** キャンセル時の処理。 @default undefined */
    onCancel?: () => void;
    /** 確認ボタンのラベル。 @default "確認" */
    confirmLabel?: string;
    /** キャンセルボタンのラベル。 @default "キャンセル" */
    cancelLabel?: string;
}
/** 操作前にインラインで確認を求めるポップオーバー。 @default undefined */
export declare const Popconfirm: React.FC<PopconfirmProps>;
//# sourceMappingURL=Popconfirm.d.ts.map