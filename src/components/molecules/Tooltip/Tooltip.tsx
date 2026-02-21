"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "../../../utils/cn";

/** ツールチップのサイズ */
export type TooltipSize = "sm" | "md" | "lg";

export interface TooltipProps {
  /** ツールチップの内容 */
  content: ReactNode;
  /** トリガー要素 */
  children: ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** トリガーボタンのaria-label */
  triggerLabel?: string;
}

/**
 * ツールチップコンポーネント
 * クリックで開閉するポップオーバー形式
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className,
  triggerLabel = "Info",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<
    "left" | "right" | "center"
  >("right");
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // ツールチップの位置を動的に計算
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      requestAnimationFrame(() => {
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
      });
    }
  }, [isOpen]);

  // 外部クリックでツールチップを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 10);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // ポジションに応じたクラスとアロー位置
  const getTooltipClasses = () => {
    switch (tooltipPosition) {
      case "left":
        return {
          tooltip: "absolute z-10 w-64 sm:w-72 mt-2 left-0",
          arrow:
            "absolute -top-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-200 dark:border-gray-700",
        };
      case "right":
        return {
          tooltip: "absolute z-10 w-64 sm:w-72 mt-2 right-0",
          arrow:
            "absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-200 dark:border-gray-700",
        };
      default:
        return {
          tooltip:
            "absolute z-10 w-64 sm:w-72 mt-2 left-1/2 transform -translate-x-1/2",
          arrow:
            "absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-t border-l border-gray-200 dark:border-gray-700",
        };
    }
  };

  const { tooltip: tooltipClass, arrow: arrowClass } = getTooltipClasses();

  return (
    <div className={cn("relative inline-block", className)} ref={tooltipRef}>
      <button
        ref={buttonRef}
        type="button"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={triggerLabel}
      >
        {children}
      </button>

      {isOpen && (
        <div
          className={cn(
            tooltipClass,
            "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-kui-fade-in",
          )}
        >
          <div className="p-3 text-sm text-gray-700 dark:text-gray-200">
            {content}
          </div>
          <div className={arrowClass} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
