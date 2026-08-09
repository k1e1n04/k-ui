"use client";

import type React from "react";
import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { useFloatingElement } from "../../../hooks/useFloatingElement";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { usePortalContainer } from "../../../hooks/usePortalContainer";
import { cn } from "../../../utils/cn";

/** ポップオーバーのプロパティ。 @default undefined */
export interface PopoverProps {
  /** ポップオーバーを開くトリガー要素。 @default undefined */
  trigger: React.ReactElement;
  /** 表示する内容。 @default undefined */
  children: React.ReactNode;
  /** 開閉状態（制御時）。 @default undefined */
  open?: boolean;
  /** 開閉状態の変更通知。 @default undefined */
  onOpenChange?: (open: boolean) => void;
  /** Floating UI の配置。 @default "bottom-start" */
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  /** 外側クリックで閉じるか。 @default true */
  closeOnOutsideClick?: boolean;
  /** Escape で閉じるか。 @default true */
  closeOnEscape?: boolean;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/**
 * トリガー要素に追従して表示するアクセシブルなポップオーバー。
 *
 * @default undefined
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom-start",
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portalContainer = usePortalContainer();
  const { referenceRef, floatingRef, floatingStyles } = useFloatingElement({
    placement,
  });
  useFocusTrap(contentRef, open);

  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) triggerRef.current?.focus();
  };

  useEscapeKey(() => setOpen(false), open && closeOnEscape);

  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !contentRef.current?.contains(target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  });

  if (!isValidElement(trigger)) return null;
  const triggerElement = cloneElement(
    trigger as React.ReactElement<Record<string, unknown>>,
    {
      "aria-expanded": open,
      "aria-haspopup": "dialog",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        (
          trigger.props as {
            onClick?: (event: React.MouseEvent<HTMLElement>) => void;
          }
        ).onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      },
      ref: (element: HTMLElement | null) => {
        triggerRef.current = element;
        referenceRef(element);
      },
    },
  );

  return (
    <>
      {triggerElement}
      {open &&
        portalContainer &&
        createPortal(
          <div
            ref={(element) => {
              contentRef.current = element;
              floatingRef(element);
            }}
            role="dialog"
            className={cn(
              "z-[var(--kui-z-popover)] min-w-48 rounded-md border border-border bg-surface p-3 text-foreground shadow-lg",
              className,
            )}
            style={floatingStyles}
          >
            {children}
          </div>,
          portalContainer,
        )}
    </>
  );
};
