"use client";

import type React from "react";
import { DropdownMenu } from "../DropdownMenu";
/** パンくず項目。 @default undefined */
export interface BreadcrumbItem {
  /** 表示内容。 @default undefined */
  label: React.ReactNode;
  /** 遷移先 URL。 @default undefined */
  href?: string;
}
/** パンくずリンクの描画プロパティ。 @default undefined */
export interface BreadcrumbRenderLinkProps {
  /** 遷移先 URL。 @default undefined */
  href: string;
  /** リンク内容。 @default undefined */
  children: React.ReactNode;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** パンくずのプロパティ。 @default undefined */
export interface BreadcrumbProps {
  /** 項目一覧。 @default undefined */
  items: BreadcrumbItem[];
  /** 表示を維持する最大項目数。 @default undefined */
  maxItems?: number;
  /** 項目間の区切り。 @default "/" */
  separator?: React.ReactNode;
  /** リンクのカスタムレンダラー。 @default undefined */
  renderLink?: (props: BreadcrumbRenderLinkProps) => React.ReactNode;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
const defaultRenderLink = ({
  href,
  children,
  className,
}: BreadcrumbRenderLinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);
/** 最大件数を超える中間項目をメニューへ畳めるパンくず。 @default undefined */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxItems,
  separator = "/",
  renderLink = defaultRenderLink,
  className,
}) => {
  const resolvedMaxItems = maxItems ?? items.length;
  const collapsed =
    items.length > resolvedMaxItems
      ? items.slice(1, items.length - (resolvedMaxItems - 1))
      : [];
  const visible = collapsed.length
    ? [items[0], ...items.slice(items.length - (resolvedMaxItems - 1))]
    : items;
  const renderItem = (item: BreadcrumbItem, index: number, total: number) => (
    <span key={`${String(item.label)}-${index}`}>
      {index > 0 && (
        <span aria-hidden="true" className="px-2 text-muted">
          {separator}
        </span>
      )}
      {item.href && index < total - 1 ? (
        renderLink({
          href: item.href,
          className: "text-muted hover:text-foreground",
          children: item.label,
        })
      ) : (
        <span aria-current={index === total - 1 ? "page" : undefined}>
          {item.label}
        </span>
      )}
    </span>
  );
  return (
    <nav aria-label="パンくず" className={className}>
      <ol className="flex items-center text-sm">
        {collapsed.length ? (
          <>
            <li>{renderItem(visible[0], 0, visible.length)}</li>
            <li>
              <span aria-hidden="true" className="px-2 text-muted">
                {separator}
              </span>
              <DropdownMenu
                trigger={
                  <button
                    type="button"
                    aria-label="省略したパンくず"
                    className="rounded px-1 hover:bg-surface-sunken"
                  >
                    …
                  </button>
                }
                items={collapsed.map((item, index) => ({
                  href: item.href,
                  label: item.label,
                  value: String(index),
                }))}
                renderLink={renderLink}
              />
            </li>
            {visible.slice(1).map((item, index) => (
              <li key={String(item.label)}>
                {renderItem(item, index + 1, visible.length)}
              </li>
            ))}
          </>
        ) : (
          visible.map((item, index) => (
            <li key={String(item.label)}>
              {renderItem(item, index, visible.length)}
            </li>
          ))
        )}
      </ol>
    </nav>
  );
};
