import type React from "react";
/** カウントダウンの文字サイズ。 @default undefined */
export type CountdownSize = "sm" | "md" | "lg";
/** カウントダウンのプロパティ。 @default undefined */
export interface CountdownProps {
    /** 目標日（出発日など）。 @default undefined */
    targetDate: string | Date;
    /** 現在時刻（テスト用の差し替え）。 @default new Date() */
    now?: Date;
    /** 目標の説明。 @default undefined */
    label?: string;
    /** 文字サイズ。 @default "md" */
    size?: CountdownSize;
    /** この日数より先なら何も表示しない。 @default undefined */
    maxDays?: number;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** JST の暦日で目標日までの残り日数を返す。 */
export declare function countdownDays(target: string | Date, now: Date): number;
/**
 * 出発までの残り日数を表示するコンポーネント。
 *
 * スクリーンリーダーで毎秒読み上げられないよう aria-live は付けない（§7.3）。
 */
export declare const Countdown: React.FC<CountdownProps>;
//# sourceMappingURL=Countdown.d.ts.map