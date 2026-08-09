"use client";

import type React from "react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { usePortalContainer } from "../../../hooks/usePortalContainer";
import { cn } from "../../../utils/cn";

/** ドロワーの表示位置。 @default undefined */
export type DrawerPlacement = "left" | "right" | "top" | "bottom";
/** ドロワーのプロパティ。 @default undefined */
export interface DrawerProps {
  /** 開閉状態。 @default undefined */
  open: boolean;
  /** 閉じる時の処理。 @default undefined */
  onClose: () => void;
  /** 表示内容。 @default undefined */
  children: React.ReactNode;
  /** 見出し。 @default undefined */
  title?: React.ReactNode;
  /** フッター内容。 @default undefined */
  footer?: React.ReactNode;
  /** 表示位置。 @default "right" */
  placement?: DrawerPlacement;
  /** 幅または高さ。 @default 384（左右）または "auto"（上下） */
  size?: string | number;
  /** 背景クリックで閉じるか。 @default true */
  closeOnOutsideClick?: boolean;
  /** 閉じるボタンのラベル。 @default "閉じる" */
  closeButtonLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
const placementClasses: Record<DrawerPlacement, string> = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "left-0 top-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};

interface BackgroundLease {
  ariaHidden: string | null;
  inert: boolean;
  count: number;
}

const backgroundLeases = new Map<HTMLElement, BackgroundLease>();
/**
 * ヘッダー・フッターを備えた汎用モーダルドロワー。
 *
 * @default undefined
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  title,
  footer,
  placement = "right",
  size,
  closeOnOutsideClick = true,
  closeButtonLabel = "閉じる",
  className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const container = usePortalContainer();
  useEscapeKey(onClose, open);
  useFocusTrap(drawerRef, open, { initialFocusRef: closeButtonRef });
  useEffect(() => {
    if (!open || !container) return;

    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== container,
    );
    backgroundElements.forEach((element) => {
      const existingLease = backgroundLeases.get(element);
      if (existingLease) {
        existingLease.count += 1;
        return;
      }

      backgroundLeases.set(element, {
        ariaHidden: element.getAttribute("aria-hidden"),
        inert: element.hasAttribute("inert"),
        count: 1,
      });
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });

    return () => {
      backgroundElements.forEach((element) => {
        const lease = backgroundLeases.get(element);
        if (!lease) return;

        lease.count -= 1;
        if (lease.count > 0) return;

        if (lease.inert) element.setAttribute("inert", "");
        else element.removeAttribute("inert");
        if (lease.ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", lease.ariaHidden);
        backgroundLeases.delete(element);
      });
    };
  }, [container, open]);
  if (!open || !container) return null;
  const dimension =
    size ?? (placement === "left" || placement === "right" ? 384 : "auto");
  const style =
    placement === "left" || placement === "right"
      ? { width: typeof dimension === "number" ? `${dimension}px` : dimension }
      : {
          height: typeof dimension === "number" ? `${dimension}px` : dimension,
        };
  return createPortal(
    <div className="fixed inset-0 z-[var(--kui-z-drawer)]">
      <button
        type="button"
        aria-label="ドロワーの背景を閉じる"
        disabled={!closeOnOutsideClick}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[var(--kui-color-overlay)]"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Drawer"}
        style={style}
        className={cn(
          "absolute z-[var(--kui-z-overlay)] flex bg-surface text-foreground shadow-xl",
          placementClasses[placement],
          "flex-col",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          {title && (
            <h2 id={titleId} className="font-semibold">
              {title}
            </h2>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={closeButtonLabel}
            onClick={onClose}
            className="rounded p-2 hover:bg-surface-sunken"
          >
            ×
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
        {footer && <div className="border-t border-border p-4">{footer}</div>}
      </div>
    </div>,
    container,
  );
};
