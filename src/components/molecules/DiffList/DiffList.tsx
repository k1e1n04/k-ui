"use client";

import type React from "react";
import { cn } from "../../../utils/cn";
import { DIFF_KIND_META, type DiffKind } from "../../../utils/travel";

/** 差分リストの項目。 @default undefined */
export interface DiffListItem {
  /** 一意な識別子。 @default undefined */
  id: string;
  /** 差分の種別。 @default undefined */
  kind: DiffKind;
  /** 対象の見出し。 @default undefined */
  label: React.ReactNode;
  /** 変更前の値。 @default undefined */
  before?: React.ReactNode;
  /** 変更後の値。 @default undefined */
  after?: React.ReactNode;
  /** 変更の理由。 @default undefined */
  reason?: React.ReactNode;
}

/** 差分リストのプロパティ。 @default undefined */
export interface DiffListProps {
  /** 項目一覧。 @default undefined */
  items: DiffListItem[];
  /** リストのラベル。 @default "変更内容" */
  ariaLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 追加・変更・削除の配色。色だけに頼らず記号とラベルを添える。 */
const kindStyles: Record<DiffKind, string> = {
  add: "bg-diff-add-subtle text-diff-add",
  change: "bg-diff-change-subtle text-diff-change",
  remove: "bg-diff-remove-subtle text-diff-remove",
};

/** 差分を記号・ラベル・取り消し線で示すリスト（§7.1）。 */
export const DiffList: React.FC<DiffListProps> = ({
  items,
  ariaLabel = "変更内容",
  className,
}) => (
  <ul aria-label={ariaLabel} className={cn("flex flex-col gap-3", className)}>
    {items.map((item) => {
      const meta = DIFF_KIND_META[item.kind];
      return (
        <li
          key={item.id}
          className="rounded-md border border-border bg-surface p-3"
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                kindStyles[item.kind],
              )}
            >
              {meta.symbol}
            </span>
            <span className="shrink-0 text-xs font-medium text-muted">
              {meta.label}
            </span>
            <span className="min-w-0 font-medium text-foreground">
              {item.label}
            </span>
          </div>
          {(item.before !== undefined || item.after !== undefined) && (
            <p className="mt-2 text-sm">
              {item.before !== undefined && (
                <del className="text-muted">{item.before}</del>
              )}
              {item.before !== undefined && item.after !== undefined && (
                <span aria-hidden="true" className="mx-2 text-muted">
                  →
                </span>
              )}
              {item.after !== undefined && (
                <span className="text-foreground">{item.after}</span>
              )}
            </p>
          )}
          {item.reason && (
            <p className="mt-1 text-xs text-muted">理由：{item.reason}</p>
          )}
        </li>
      );
    })}
  </ul>
);
