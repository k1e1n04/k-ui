import type React from "react";
/** お祝いの種類。 @default undefined */
export type CelebrationVariant = "confetti" | "stamp";
/** お祝い演出のプロパティ。 @default undefined */
export interface CelebrationProps {
    /** 表示するか。 @default undefined */
    show: boolean;
    /** 演出の種類。 @default "confetti" */
    variant?: CelebrationVariant;
    /** 表示するメッセージ。 @default undefined */
    message?: React.ReactNode;
    /** 表示時間（ミリ秒）。 @default 800 */
    duration?: number;
    /** 表示が終わった時の処理。 @default undefined */
    onDone?: () => void;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * プラン確定や準備完了を祝う演出。音とバイブは使わない（§7.2）。
 * 動きを減らす設定ではフェードだけになる。
 */
export declare const Celebration: React.FC<CelebrationProps>;
//# sourceMappingURL=Celebration.d.ts.map