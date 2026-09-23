import type React from "react";
/**
 * Alertコンポーネントのバリアント
 */
export type AlertVariant = "success" | "info" | "warning" | "error";
export interface AlertProps extends React.ComponentPropsWithRef<"div"> {
    /**
     * アラートの種別
     * @default 'info'
     */
    variant?: AlertVariant;
    /**
     * 表示するメッセージ
     */
    message: string;
}
/**
 * Alert コンポーネント
 *
 * エラー、警告、情報、成功のメッセージを表示するインラインアラート
 *
 * @example
 * <Alert variant="error" message="エラーが発生しました" />
 *
 * @example
 * <Alert variant="success" message="保存しました" />
 */
export declare const Alert: React.FC<AlertProps>;
//# sourceMappingURL=Alert.d.ts.map