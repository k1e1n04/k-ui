import type React from "react";
import type { AvatarProps } from "../../atoms/Avatar";
/** アクティビティの項目。 @default undefined */
export interface ActivityFeedItem {
    /** 一意な識別子。 @default undefined */
    id: string;
    /** 操作した人の名前。 @default undefined */
    userName?: string;
    /** 操作した人のアバター。 @default undefined */
    avatar?: AvatarProps;
    /** 操作の内容。 @default undefined */
    text: React.ReactNode;
    /** 時刻表示。 @default undefined */
    time?: React.ReactNode;
}
/** アクティビティフィードのプロパティ。 @default undefined */
export interface ActivityFeedProps {
    /** 項目一覧。 @default undefined */
    items: ActivityFeedItem[];
    /** リストのラベル。 @default "アクティビティ" */
    ariaLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 誰が何をしたかを時系列で示すフィード（§3.3）。 */
export declare const ActivityFeed: React.FC<ActivityFeedProps>;
//# sourceMappingURL=ActivityFeed.d.ts.map