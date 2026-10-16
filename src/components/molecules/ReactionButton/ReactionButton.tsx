"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
import type { AvatarProps } from "../../atoms/Avatar";
import { Avatar } from "../../atoms/Avatar";

/** リアクションボタンのプロパティ。 @default undefined */
export interface ReactionButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "onClick"> {
  /** リアクション名（「楽しみ!」など）。 @default undefined */
  label: string;
  /** 押した人の数。 @default 0 */
  count?: number;
  /** 自分が押しているか。 @default false */
  active?: boolean;
  /** 押した人のアバター。 @default undefined */
  avatars?: AvatarProps[];
  /** 押下状態が変わった時の処理。 @default undefined */
  onToggled?: (active: boolean) => void;
}

/** アバター付きのリアクションボタン。誰が押したかを見せる（§3.3）。 */
export const ReactionButton: React.FC<ReactionButtonProps> = ({
  label,
  count = 0,
  active = false,
  avatars,
  onToggled,
  className,
  ...props
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={() => onToggled?.(!active)}
    className={cn(
      "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors",
      active
        ? "border-accent-main bg-accent-subtle text-accent-main"
        : "border-border bg-surface text-foreground hover:bg-surface-raised",
      className,
    )}
    {...props}
  >
    <span>{label}</span>
    {count > 0 && <span className="tabular-nums">{count}</span>}
    {avatars && avatars.length > 0 && (
      <span aria-hidden="true" className="flex -space-x-2">
        {avatars.slice(0, 3).map((avatar) => (
          <Avatar
            key={`${avatar.src ?? ""}-${avatar.name ?? ""}`}
            {...avatar}
            size="small"
            className="ring-2 ring-surface"
          />
        ))}
      </span>
    )}
  </button>
);
