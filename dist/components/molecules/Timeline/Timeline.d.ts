import type React from "react";
/** タイムライン項目。 @default undefined */
export interface TimelineItem {
    /** 項目の一意な識別子。 @default undefined */
    id?: string;
    /** 見出し。 @default undefined */
    title: React.ReactNode;
    /** 時刻表示。 @default undefined */
    timestamp?: React.ReactNode;
    /** 詳細内容。 @default undefined */
    content?: React.ReactNode;
    /** アイコン。 @default undefined */
    icon?: React.ReactNode;
}
/** タイムライン項目の配置。 @default undefined */
export type TimelineAlign = "left" | "right" | "alternate";
/** 縦方向タイムラインのプロパティ。 @default undefined */
export interface TimelineProps {
    /** 項目一覧。 @default undefined */
    items: TimelineItem[];
    /** 項目の配置。 @default "left" */
    align?: TimelineAlign;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 項目を縦の接続線に沿って配置するタイムライン。 @default undefined */
export declare const Timeline: React.FC<TimelineProps>;
//# sourceMappingURL=Timeline.d.ts.map