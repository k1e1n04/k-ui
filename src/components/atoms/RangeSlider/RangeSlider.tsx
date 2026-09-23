"use client";

import type React from "react";
import { useEffect, useId, useMemo, useRef } from "react";

import { cn } from "../../../utils/cn";
import { mergeRefs } from "../../../utils/mergeRefs";
import { FormField } from "../FormField";

/** 範囲スライダーの値（[下限, 上限]） */
export type RangeSliderValue = [number, number];

export interface RangeSliderProps {
  /** 現在の値 */
  value: RangeSliderValue;
  /** 値変更時の処理（ドラッグ中は pointermove ごとに呼ばれる） */
  onChange: (value: RangeSliderValue) => void;
  /**
   * 操作が確定したときの処理。ドラッグ終了（pointerup / pointercancel）や
   * キーボード操作の確定時に、最終的な値で1回だけ呼ばれる。
   * 重い処理（URL 更新・API 呼び出しなど）をここに寄せると、ドラッグ中の
   * 大量リクエストを避けられる。
   */
  onChangeEnd?: (value: RangeSliderValue) => void;
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
  onChangeEnd,
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
  // ドラッグ開始時の値。確定時に「変化したか」を判定するために保持する
  const dragStartRef = useRef<RangeSliderValue | null>(null);
  // 最後に通知した値。controlled な value の反映を待たずに確定値を渡せるようにする
  const latestRef = useRef<RangeSliderValue>(value);

  const [lower, upper] = value;
  const span = max - min || 1;
  const percent = (v: number) => clamp(((v - min) / span) * 100, 0, 100);

  const format = (v: number) => (formatValue ? formatValue(v) : String(v));

  useEffect(() => {
    latestRef.current = value;
  }, [value]);

  const commit = (index: 0 | 1, next: number) => {
    if (disabled) return;
    const snapped = snap(next, min, max, step);
    const nextValue: RangeSliderValue =
      index === 0
        ? [clamp(snapped, min, upper), upper]
        : [lower, clamp(snapped, lower, max)];
    latestRef.current = nextValue;
    onChange(nextValue);
  };

  const beginDrag = (
    index: 0 | 1,
    pointerId: number,
    currentTarget: Element,
  ) => {
    draggingRef.current = index;
    dragStartRef.current = latestRef.current;
    currentTarget.setPointerCapture?.(pointerId);
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
    beginDrag(index, event.pointerId, event.currentTarget);
    commit(index, next);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const index = draggingRef.current;
    if (index === null || disabled) return;
    commit(index, valueFromClientX(event.clientX));
  };

  const endDrag = () => {
    if (draggingRef.current === null) return;
    draggingRef.current = null;
    const start = dragStartRef.current;
    dragStartRef.current = null;
    const latest = latestRef.current;
    if (start && (start[0] !== latest[0] || start[1] !== latest[1])) {
      onChangeEnd?.(latest);
    }
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
    onChangeEnd?.(latestRef.current);
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
        beginDrag(index, event.pointerId, event.currentTarget);
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
              "relative h-1.5 w-full touch-none rounded-full bg-surface-sunken",
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
