"use client";

import { type RefObject, useEffect, useRef } from "react";

/** フォーカストラップの設定。 @default undefined */
export interface UseFocusTrapOptions {
  /** 有効化時に優先してフォーカスする要素。 @default undefined */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** 無効化時に有効化前の要素へフォーカスを戻すか。 @default true */
  returnFocusOnDeactivate?: boolean;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("disabled") && !element.hidden,
  );

/**
 * コンテナ内でキーボードフォーカスを循環させるフック
 *
 * @param containerRef フォーカスを閉じ込めるコンテナのref
 * @param active フォーカストラップを有効にするか
 * @param options 動作設定
 * @default {}
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  options: UseFocusTrapOptions = {},
): void {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const { initialFocusRef, returnFocusOnDeactivate = true } = options;

  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const container = containerRef.current;
    const initialFocusElement = initialFocusRef?.current;
    const focusableElements = container ? getFocusableElements(container) : [];

    if (initialFocusElement && container?.contains(initialFocusElement)) {
      initialFocusElement.focus();
    } else {
      const firstFocusableElement = focusableElements[0];
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      } else if (container) {
        container.tabIndex = -1;
        container.focus();
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !containerRef.current) return;

      const elements = getFocusableElements(containerRef.current);
      if (elements.length === 0) {
        event.preventDefault();
        containerRef.current.tabIndex = -1;
        containerRef.current.focus();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement ||
          !containerRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement ||
          !containerRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (returnFocusOnDeactivate) {
        previouslyFocusedElementRef.current?.focus();
      }
    };
  }, [active, containerRef, initialFocusRef, returnFocusOnDeactivate]);
}
