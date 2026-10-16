"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
import type { AvatarProps } from "../../atoms/Avatar";
import { Avatar } from "../../atoms/Avatar";

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
export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  ariaLabel = "アクティビティ",
  className,
}) => (
  <ol aria-label={ariaLabel} className={cn("flex flex-col gap-3", className)}>
    {items.map((item) => (
      <li key={item.id} className="flex items-start gap-3">
        <Avatar
          {...(item.avatar ?? { name: item.userName })}
          size="small"
          className="mt-0.5"
        />
        <div className="min-w-0">
          <p className="text-sm text-foreground">{item.text}</p>
          {item.time && <p className="text-xs text-muted">{item.time}</p>}
        </div>
      </li>
    ))}
  </ol>
);
