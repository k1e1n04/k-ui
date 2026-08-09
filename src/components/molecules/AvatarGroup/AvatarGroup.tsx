"use client";
import { cn } from "../../../utils/cn";
import type { AvatarProps } from "../../atoms/Avatar";
import { Avatar } from "../../atoms/Avatar";
/** アバターグループのプロパティ。 @default undefined */
export interface AvatarGroupProps {
  /** アバター記述子。 @default undefined */
  avatars: AvatarProps[];
  /** 最大表示数。 @default undefined */
  max?: number;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** 複数のアバターを重ねて表示するコンポーネント。 @default undefined */
export function AvatarGroup({ avatars, max, className }: AvatarGroupProps) {
  const visible = max === undefined ? avatars : avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - visible.length);
  return (
    <fieldset aria-label="Avatars" className={cn("flex -space-x-2", className)}>
      {visible.map((avatar, index) => (
        <Avatar
          key={`${avatar.name}-${index}`}
          {...avatar}
          className={cn("ring-2 ring-surface", avatar.className)}
        />
      ))}
      {remaining > 0 && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken text-sm text-foreground ring-2 ring-surface">
          +{remaining}
        </span>
      )}
    </fieldset>
  );
}
