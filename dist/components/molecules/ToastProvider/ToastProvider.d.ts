import type React from "react";
import type { ToastAction, ToastVariant } from "../../atoms/Toast";
/** トースト表示オプション。 @default undefined */
export interface ToastOptions {
    /** バリアント。 @default "info" */
    variant?: ToastVariant;
    /** タイトル。 @default undefined */
    title?: string;
    /** アクション。 @default undefined */
    action?: ToastAction;
    /** 表示時間。 @default defaultDuration */
    duration?: number;
}
/** トースト操作 API。 @default undefined */
export interface ToastContextValue {
    /** トーストを表示する。 @default undefined */
    show: (message: string, options?: ToastOptions) => string;
    /** 成功トーストを表示する。 @default undefined */
    success: (message: string, options?: Omit<ToastOptions, "variant">) => string;
    /** エラートーストを表示する。 @default undefined */
    error: (message: string, options?: Omit<ToastOptions, "variant">) => string;
    /** 情報トーストを表示する。 @default undefined */
    info: (message: string, options?: Omit<ToastOptions, "variant">) => string;
    /** 警告トーストを表示する。 @default undefined */
    warning: (message: string, options?: Omit<ToastOptions, "variant">) => string;
    /** 指定したトーストを削除する。 @default undefined */
    dismiss: (id: string) => void;
    /** すべてのトーストを削除する。 @default undefined */
    dismissAll: () => void;
}
/** トーストプロバイダーのプロパティ。 @default undefined */
export interface ToastProviderProps {
    /** 子要素。 @default undefined */
    children: React.ReactNode;
    /** 表示位置。 @default "bottom-right" */
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    /** 標準表示時間。 @default 5000 */
    defaultDuration?: number;
    /** 最大表示数。 @default 5 */
    maxToasts?: number;
    /** ポータル先。 @default undefined */
    portalContainer?: HTMLElement | null;
}
/** トースト操作 API を利用するフック。 @default undefined */
export declare function useToast(): ToastContextValue;
/** トーストを管理・表示するプロバイダー。 @default undefined */
export declare function ToastProvider({ children, position, defaultDuration, maxToasts, portalContainer, }: ToastProviderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ToastProvider.d.ts.map