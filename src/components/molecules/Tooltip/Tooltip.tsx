"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { cn } from "../../../utils/cn";

/** ツールチップのサイズ。 @default undefined */
export type TooltipSize = "sm" | "md" | "lg";

type TooltipPosition = "left" | "right" | "center";

const tooltipPositionClasses: Record<
  TooltipPosition,
  { tooltip: string; arrow: string }
> = {
  left: {
    arrow:
      "absolute -top-2 left-4 w-4 h-4 bg-surface transform rotate-45 border-t border-l border-border",
    tooltip: "absolute w-64 sm:w-72 mt-2 left-0",
  },
  right: {
    arrow:
      "absolute -top-2 right-4 w-4 h-4 bg-surface transform rotate-45 border-t border-l border-border",
    tooltip: "absolute w-64 sm:w-72 mt-2 right-0",
  },
  center: {
    arrow:
      "absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-surface rotate-45 border-t border-l border-border",
    tooltip: "absolute w-64 sm:w-72 mt-2 left-1/2 transform -translate-x-1/2",
  },
};

/** ツールチップのプロパティ。 @default undefined */
export interface TooltipProps {
  /** ツールチップの内容。 @default undefined */
  content: ReactNode;
  /** トリガー要素。 @default undefined */
  children: ReactNode;
  /** トリガーボタンの aria-label。 @default "Info" */
  triggerLabel?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/**
 * ツールチップコンポーネント
 * クリックで開閉するポップオーバー形式
 *
 * @default undefined
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  triggerLabel = "Info",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition>("right");
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updateTooltipPosition = useCallback(() => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const tooltipWidth = viewportWidth < 640 ? 256 : 288;

    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const tooltipLeft = buttonCenter - tooltipWidth / 2;
    const tooltipRight = buttonCenter + tooltipWidth / 2;

    const margin = viewportWidth < 640 ? 8 : 16;
    if (tooltipLeft < margin) {
      setTooltipPosition("left");
    } else if (tooltipRight > viewportWidth - margin) {
      setTooltipPosition("right");
    } else {
      setTooltipPosition("center");
    }
  }, []);

  // ツールチップの位置を動的に計算
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateTooltipPosition();
    });

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isOpen, updateTooltipPosition]);

  useClickOutside(tooltipRef, () => setIsOpen(false), isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        updateTooltipPosition();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, updateTooltipPosition]);

  const { tooltip: tooltipClass, arrow: arrowClass } =
    tooltipPositionClasses[tooltipPosition];

  return (
    <div className={cn("relative inline-block", className)} ref={tooltipRef}>
      <button
        ref={buttonRef}
        type="button"
        className="text-muted hover:text-foreground focus:outline-none p-1 rounded-full hover:bg-surface-sunken"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        aria-label={triggerLabel}
      >
        {children}
      </button>

      {isOpen && (
        <div
          className={cn(
            tooltipClass,
            "z-[var(--kui-z-tooltip)] bg-surface rounded-lg shadow-lg border border-border animate-kui-fade-in",
          )}
        >
          <div className="p-3 text-sm text-foreground">{content}</div>
          <div className={arrowClass} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
