"use client";

import type React from "react";
import {
  cloneElement,
  isValidElement,
  type MouseEvent,
  useRef,
  useState,
} from "react";
import { cn } from "../../../utils/cn";
import { Popover } from "../Popover";

/** ドロップダウンメニュー項目。 @default undefined */
export interface DropdownMenuItem {
  /** 表示内容。 @default undefined */
  label: React.ReactNode;
  /** 項目を識別する値。 @default undefined */
  value: string;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 遷移先 URL。 @default undefined */
  href?: string;
}
/** メニュー内リンクを描画するためのプロパティ。 @default undefined */
export interface DropdownMenuRenderLinkProps {
  /** 遷移先 URL。 @default undefined */
  href: string;
  /** リンク内容。 @default undefined */
  children: React.ReactNode;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** ドロップダウンメニューのプロパティ。 @default undefined */
export interface DropdownMenuProps {
  /** メニューを開くトリガー要素。 @default undefined */
  trigger: React.ReactElement;
  /** 項目一覧。 @default undefined */
  items: DropdownMenuItem[];
  /** 項目選択時の処理。 @default undefined */
  onSelect?: (value: string) => void;
  /** リンク項目用のカスタムレンダラー。 @default undefined */
  renderLink?: (props: DropdownMenuRenderLinkProps) => React.ReactNode;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/**
 * 矢印キーによるロービング tabindex に対応するメニュー。
 *
 * @default undefined
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  onSelect,
  renderLink,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    items.findIndex((item) => !item.disabled),
  );
  const refs = useRef<Array<HTMLElement | null>>([]);
  const findEnabledIndex = (start: number, direction: number) => {
    if (items.length === 0) return -1;
    let next = start;
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length;
      if (!items[next].disabled) return next;
    }
    return -1;
  };
  const focusIndex = (next: number) => {
    setActiveIndex(next);
    refs.current[next]?.focus();
  };
  const move = (direction: number) => {
    const next = findEnabledIndex(activeIndex, direction);
    if (next !== -1) focusIndex(next);
  };
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      const firstEnabledIndex = findEnabledIndex(-1, 1);
      if (firstEnabledIndex !== -1) setActiveIndex(firstEnabledIndex);
    }
  };
  const select = (item: DropdownMenuItem) => {
    if (!item.disabled) {
      onSelect?.(item.value);
      setOpen(false);
    }
  };
  return (
    <Popover
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      className={cn("p-1", className)}
    >
      <div
        role="menu"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            const firstEnabledIndex = findEnabledIndex(-1, 1);
            if (firstEnabledIndex !== -1) focusIndex(firstEnabledIndex);
          }
          if (event.key === "End") {
            event.preventDefault();
            const lastEnabledIndex = findEnabledIndex(0, -1);
            if (lastEnabledIndex !== -1) focusIndex(lastEnabledIndex);
          }
        }}
      >
        {items.map((item, index) => {
          const itemClassName =
            "block w-full rounded px-3 py-2 text-left text-sm hover:bg-surface-sunken focus:bg-surface-sunken focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
          const itemProps = {
            onFocus: () => setActiveIndex(index),
            onClick: (event: MouseEvent<HTMLElement>) => {
              if (!event.defaultPrevented) select(item);
            },
            ref: (element: HTMLElement | null) => {
              refs.current[index] = element;
            },
            role: "menuitem",
            tabIndex: index === activeIndex ? 0 : -1,
          };

          if (item.href && renderLink) {
            const renderedLink = renderLink({
              href: item.href,
              children: item.label,
              className: itemClassName,
            });
            if (isValidElement(renderedLink)) {
              const originalOnClick = (
                renderedLink.props as React.HTMLAttributes<HTMLElement>
              ).onClick;
              return cloneElement(
                renderedLink as React.ReactElement<
                  React.HTMLAttributes<HTMLElement>
                >,
                {
                  ...itemProps,
                  key: item.value,
                  onClick: (event: MouseEvent<HTMLElement>) => {
                    originalOnClick?.(event);
                    if (!event.defaultPrevented) select(item);
                  },
                },
              );
            }
          }

          return (
            <button
              key={item.value}
              ref={itemProps.ref}
              type="button"
              role="menuitem"
              tabIndex={itemProps.tabIndex}
              disabled={item.disabled}
              onFocus={itemProps.onFocus}
              onClick={itemProps.onClick}
              className={itemClassName}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </Popover>
  );
};
