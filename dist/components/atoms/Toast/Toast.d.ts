import type React from "react";
/** トーストのバリアント。 @default undefined */
export type ToastVariant = "success" | "info" | "warning" | "danger";
/** トーストアクション。 @default undefined */
export interface ToastAction {
    /** 表示ラベル。 @default undefined */
    label: string;
    /** 実行時の処理。 @default undefined */
    onClick: () => void;
}
/** トーストのプロパティ。 @default undefined */
export interface ToastProps {
    /** バリアント。 @default "info" */
    variant?: ToastVariant;
    /** タイトル。 @default undefined */
    title?: string;
    /** メッセージ。 @default undefined */
    message?: string;
    /** 閉じる時の処理。 @default undefined */
    onDismiss?: () => void;
    /** アクション。 @default undefined */
    action?: ToastAction;
    /** ホバー開始時の処理。 @default undefined */
    onMouseEnter?: React.MouseEventHandler<HTMLOutputElement>;
    /** ホバー終了時の処理。 @default undefined */
    onMouseLeave?: React.MouseEventHandler<HTMLOutputElement>;
    /** フォーカス時の処理。 @default undefined */
    onFocus?: React.FocusEventHandler<HTMLOutputElement>;
    /** フォーカス終了時の処理。 @default undefined */
    onBlur?: React.FocusEventHandler<HTMLOutputElement>;
    /** 追加のクラス名。 @default undefined */
    className?: string;
    /** ルート要素への ref。 @default undefined */
    ref?: React.Ref<HTMLOutputElement>;
}
/** 一時的な通知を表示するトースト。 @default undefined */
export declare function Toast({ variant, title, message, onDismiss, action, className, ref, ...events }: ToastProps): React.JSX.Element;
//# sourceMappingURL=Toast.d.ts.map