"use client";

import type React from "react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "../../../utils/cn";

export interface BottomSheetProps {
  /** 開閉状態 */
  open: boolean;
  /** 閉じる時の処理 */
  onClose?: () => void;
  /** 表示内容 */
  children: React.ReactNode;
  /** 見出し */
  title?: React.ReactNode;
  /**
   * スナップ位置（ビューポート高さに対する割合、昇順）
   * @default [0.35, 0.9]
   */
  snapPoints?: number[];
  /** 初期スナップ位置のインデックス。 @default 0 */
  defaultSnapIndex?: number;
  /** スナップ位置変更時 */
  onSnapChange?: (index: number, fraction: number) => void;
  /** 背景オーバーレイを表示するか。 @default false */
  showBackdrop?: boolean;
  /** 背景クリックで閉じるか。 @default true */
  closeOnBackdrop?: boolean;
  /** ハンドルのアクセシブルなラベル。 @default "シートの高さを変更" */
  handleLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

const getViewportHeight = (): number =>
  typeof window === "undefined" ? 800 : window.innerHeight || 800;

/**
 * BottomSheet コンポーネント
 *
 * 地図検索などで使うドラッグ可能なボトムシート。
 * ハンドルを上下にドラッグ、または矢印キーで高さを変更できる。
 *
 * @example
 * <BottomSheet open={open} onClose={close} snapPoints={[0.35, 0.9]}>
 *   物件一覧
 * </BottomSheet>
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  title,
  snapPoints = [0.35, 0.9],
  defaultSnapIndex = 0,
  onSnapChange,
  showBackdrop = false,
  closeOnBackdrop = true,
  handleLabel = "シートの高さを変更",
  className,
}) => {
  const titleId = useId();
  const [snapIndex, setSnapIndex] = useState(defaultSnapIndex);
  const [dragFraction, setDragFraction] = useState<number | null>(null);
  const dragRef = useRef<{
    startY: number;
    startFraction: number;
  } | null>(null);

  useEffect(() => {
    if (open) setSnapIndex(defaultSnapIndex);
  }, [open, defaultSnapIndex]);

  if (!open) return null;

  const sorted = [...snapPoints].sort((a, b) => a - b);
  const clampedIndex = Math.min(Math.max(snapIndex, 0), sorted.length - 1);
  const fraction = dragFraction ?? sorted[clampedIndex];
  const dragging = dragFraction !== null;

  const moveTo = (nextIndex: number) => {
    const clamped = Math.min(Math.max(nextIndex, 0), sorted.length - 1);
    setSnapIndex(clamped);
    onSnapChange?.(clamped, sorted[clamped]);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      startY: event.clientY,
      startFraction: sorted[clampedIndex],
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const delta = (event.clientY - drag.startY) / getViewportHeight();
    const next = Math.min(
      Math.max(drag.startFraction - delta, sorted[0]),
      sorted[sorted.length - 1],
    );
    setDragFraction(next);
  };

  const handlePointerUp = () => {
    if (dragRef.current === null) return;
    dragRef.current = null;
    const current = dragFraction ?? sorted[clampedIndex];
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    sorted.forEach((point, index) => {
      const distance = Math.abs(point - current);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    setDragFraction(null);
    moveTo(nearest);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveTo(clampedIndex + 1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveTo(clampedIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(sorted.length - 1);
    }
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[var(--kui-z-drawer)] flex flex-col justify-end"
      style={{ height: "100vh", pointerEvents: "none" }}
    >
      {showBackdrop && (
        <button
          type="button"
          aria-label="シートを閉じる"
          disabled={!closeOnBackdrop}
          onClick={onClose}
          className="absolute inset-0 bg-[var(--kui-color-overlay)]"
          style={{ pointerEvents: "auto" }}
        />
      )}
      <div
        role="dialog"
        aria-modal={showBackdrop || undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "ボトムシート"}
        style={{
          height: `${fraction * 100}vh`,
          pointerEvents: "auto",
        }}
        className={cn(
          "relative flex w-full flex-col rounded-t-2xl border-t border-border bg-surface text-foreground shadow-xl",
          !dragging && "transition-[height] duration-200 ease-out",
          className,
        )}
      >
        <div className="flex flex-col items-center pt-2">
          <button
            type="button"
            aria-label={handleLabel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="flex h-6 w-full cursor-grab touch-none items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main active:cursor-grabbing"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-10 rounded-full bg-border-strong"
            />
          </button>
          {title && (
            <div className="flex w-full items-center justify-between px-4 pb-2">
              <h2 id={titleId} className="font-semibold">
                {title}
              </h2>
              {onClose && (
                <button
                  type="button"
                  aria-label="閉じる"
                  onClick={onClose}
                  className="rounded p-1 text-muted hover:bg-surface-sunken"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};
