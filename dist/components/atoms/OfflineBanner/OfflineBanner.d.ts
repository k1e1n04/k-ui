import type React from "react";
/** オフライン通知バナーのプロパティ。 @default undefined */
export interface OfflineBannerProps {
    /** オフラインかどうか。 @default undefined */
    offline: boolean;
    /** 表示メッセージ。 @default "オフラインです。変更は接続後に送信されます。" */
    message?: string;
    /** 再試行時の処理。 @default undefined */
    onRetry?: () => void;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** オフライン中であることと、未送信の扱いを伝えるバナー（§7.3）。 */
export declare const OfflineBanner: React.FC<OfflineBannerProps>;
//# sourceMappingURL=OfflineBanner.d.ts.map