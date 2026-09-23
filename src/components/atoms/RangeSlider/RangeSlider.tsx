"use client";

import type React from "react";
import { useId, useMemo, useRef } from "react";

import { cn } from "../../../utils/cn";
import { mergeRefs } from "../../../utils/mergeRefs";
import { FormField } from "../FormField";

/** 範囲スライダーの値（[下限, 上限]） */
export type RangeSliderValue = [number, number];

export interface RangeSliderProps {
  /** 現在の値 */
  value: RangeSliderValue;
  /** 値変更時の処理 */
  onChange: (value: RangeSliderValue) => void;
  /** 最小値。 @default 0 */
  min?: number;
  /** 最大値。 @default 100 */
  max?: number;
  /** 刻み幅。 @default 1 */
  step?: number;
  /** ラベル */
  label?: string;
  /** 補助説明 */
  description?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 値の表示フォーマッター */
  formatValue?: (value: number) => string;
  /** 追加のクラス名 */
  className?: string;
  /** トラック要素への ref */
  ref?: React.Ref<HTMLDivElement>;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const snap = (
  value: number,
  min: number,
  max: number,
  step: number,
): number => {
  const steps = Math.round((value - min) / step);
  return clamp(min + steps * step, min, max);
};

/**
 * RangeSlider コンポーネント
 *
 * 家賃の下限・上限など、範囲を1本のトラックで指定するスライダー。
 * キーボード操作とドラッグ操作に対応する。
 *
 * @example
 * <RangeSlider
 *   value={[rentMin, rentMax]}
 *   onChange={([min, max]) => setRent([min, max])}
 *   min={0}
 *   max={300000}
 *   step={5000}
 *   formatValue={(v) => `${v / 10000}万円`}
 * />
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  error,
  disabled = false,
  formatValue,
  className,
  ref,
}) => {
  const baseId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const mergedTrackRef = useMemo(() => mergeRefs(trackRef, ref), [ref]);
  const draggingRef = useRef<0 | 1 | null>(null);

  const [lower, upper] = value;
  const span = max - min || 1;
  const percent = (v: number) => clamp(((v - min) / span) * 100, 0, 100);

  const format = (v: number) => (formatValue ? formatValue(v) : String(v));

  const commit = (index: 0 | 1, next: number) => {
    if (disabled) return;
    const snapped = snap(next, min, max, step);
    if (index === 0) {
      onChange([clamp(snapped, min, upper), upper]);
    } else {
      onChange([lower, clamp(snapped, lower, max)]);
    }
  };

  const valueFromClientX = (clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return min;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return min + ratio * span;
  };

  const handleTrackPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (disabled) return;
    const next = valueFromClientX(event.clientX);
    const index: 0 | 1 =
      Math.abs(next - lower) <= Math.abs(next - upper) ? 0 : 1;
    draggingRef.current = index;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    commit(index, next);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const index = draggingRef.current;
    if (index === null || disabled) return;
    commit(index, valueFromClientX(event.clientX));
  };

  const endDrag = () => {
    draggingRef.current = null;
  };

  const handleKeyDown = (
    index: 0 | 1,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (disabled) return;
    const current = index === 0 ? lower : upper;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - step;
        break;
      case "PageUp":
        next = current + step * 10;
        break;
      case "PageDown":
        next = current - step * 10;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    commit(index, next);
  };

  const thumbClass = cn(
    "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-surface bg-primary-main shadow-sm",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main focus-visible:ring-offset-1",
    disabled && "cursor-not-allowed opacity-50",
  );

  const renderThumb = (index: 0 | 1, current: number, describedBy?: string) => (
    <button
      key={index === 0 ? "lower" : "upper"}
      id={`${baseId}-${index}`}
      type="button"
      role="slider"
      aria-label={`${label ?? "範囲"} ${index === 0 ? "下限" : "上限"}`}
      aria-valuemin={index === 0 ? min : lower}
      aria-valuemax={index === 0 ? upper : max}
      aria-valuenow={current}
      aria-valuetext={format(current)}
      aria-describedby={describedBy}
      aria-disabled={disabled}
      disabled={disabled}
      onKeyDown={(event) => handleKeyDown(index, event)}
      onPointerDown={(event) => {
        if (disabled) return;
        draggingRef.current = index;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.stopPropagation();
      }}
      style={{ left: `calc(${percent(current)}% - 0.5rem)` }}
      className={thumbClass}
    />
  );

  return (
    <FormField
      label={label}
      description={description}
      error={error}
      className={className}
      htmlFor={`${baseId}-0`}
    >
      {({ describedBy }) => (
        <div className="w-full">
          <div className="flex items-center justify-between pb-1 text-xs text-muted">
            <span aria-hidden="true">{format(lower)}</span>
            <span aria-hidden="true">{format(upper)}</span>
          </div>
          <div
            ref={mergedTrackRef}
            data-testid="range-slider-track"
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={cn(
              "relative h-1.5 w-full rounded-full bg-surface-sunken",
              disabled && "opacity-50",
            )}
          >
            <div
              className="absolute h-full rounded-full bg-primary-main"
              style={{
                left: `${percent(lower)}%`,
                width: `${percent(upper) - percent(lower)}%`,
              }}
            />
            {renderThumb(0, lower, describedBy)}
            {renderThumb(1, upper, describedBy)}
          </div>
          <span className="sr-only" aria-live="polite">
            {`${format(lower)} から ${format(upper)}`}
          </span>
        </div>
      )}
    </FormField>
  );
};
