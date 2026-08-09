"use client";
import type React from "react";
import { cn } from "../../../utils/cn";
/** チップのバリアント。 @default undefined */
export type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger";
/** チップのプロパティ。 @default undefined */
export interface ChipProps {
  /** 子要素。 @default undefined */
  children: React.ReactNode;
  /** バリアント。 @default "default" */
  variant?: ChipVariant;
  /** 選択状態。 @default false */
  selected?: boolean;
  /** クリック時の処理。 @default undefined */
  onClick?: () => void;
  /** 削除時の処理。 @default undefined */
  onDelete?: () => void;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
const styles: Record<ChipVariant, string> = {
  default: "bg-surface-sunken text-foreground",
  primary: "bg-primary-light text-inverse",
  success: "bg-success-subtle text-success-main",
  info: "bg-info-subtle text-info-main",
  warning: "bg-warning-subtle text-warning-main",
  danger: "bg-danger-subtle text-danger-main",
};
/** 選択・削除操作を提供できるチップ。 @default undefined */
export function Chip({
  children,
  variant = "default",
  selected = false,
  onClick,
  onDelete,
  disabled = false,
  className,
}: ChipProps) {
  const content = <span className={className}>{children}</span>;
  const deleteButton = onDelete && (
    <button
      type="button"
      aria-label={`Delete ${typeof children === "string" ? children : "chip"}`}
      onClick={onDelete}
      disabled={disabled}
      className="ml-1 rounded text-current"
    >
      ×
    </button>
  );
  if (onClick && onDelete)
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-sm",
          styles[variant],
          selected && "ring-2 ring-primary-main",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className="inline-flex items-center"
        >
          {content}
        </button>
        {deleteButton}
      </span>
    );
  if (onClick)
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-sm",
          styles[variant],
          selected && "ring-2 ring-primary-main",
          disabled && "opacity-50",
          className,
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className="inline-flex items-center"
        >
          {content}
        </button>
      </span>
    );
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm",
        styles[variant],
        selected && "ring-2 ring-primary-main",
        disabled && "opacity-50",
        className,
      )}
    >
      {content}
      {deleteButton}
    </span>
  );
}
