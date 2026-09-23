"use client";
import type React from "react";
import { useId } from "react";
import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";
/** スライダー値。 @default undefined */
export type SliderValue = number | [number, number];
/** スライダーのプロパティ。 @default undefined */
export interface SliderProps {
  /** 値。 @default undefined */
  value: SliderValue;
  /** 値変更時の処理。 @default undefined */
  onChange: (value: SliderValue) => void;
  /** 最小値。 @default 0 */
  min?: number;
  /** 最大値。 @default 100 */
  max?: number;
  /** 刻み幅。 @default 1 */
  step?: number;
  /** 目盛りを表示するか。 @default false */
  marks?: boolean;
  /** ラベル。 @default undefined */
  label?: string;
  /** 説明。 @default undefined */
  description?: string;
  /** エラーメッセージ。 @default undefined */
  error?: string;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** 先頭の input 要素への ref。 @default undefined */
  ref?: React.Ref<HTMLInputElement>;
}
/** 数値または範囲を選択するスライダー。 @default undefined */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  label,
  description,
  error,
  disabled = false,
  className,
  ref,
}: SliderProps) {
  const id = useId();
  const range = Array.isArray(value);
  const values = range ? value : [value];
  const update = (index: number, next: number) => {
    if (disabled) return;
    if (range) {
      const copy: [number, number] = [values[0], values[1]];
      copy[index] = next;
      onChange(copy);
    } else onChange(next);
  };
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      className={className}
      htmlFor={`${id}-0`}
    >
      {({ describedBy }) => (
        <div className={cn("flex gap-2", className)}>
          {values.map((current, index) => (
            <input
              key={range ? (index === 0 ? "minimum" : "maximum") : "value"}
              id={`${id}-${index}`}
              ref={index === 0 ? ref : undefined}
              type="range"
              min={min}
              max={max}
              step={step}
              value={current}
              disabled={disabled}
              aria-label={range ? `${label ?? "Range"} ${index + 1}` : label}
              aria-describedby={describedBy}
              aria-invalid={Boolean(error)}
              onChange={(event) => update(index, Number(event.target.value))}
              className={cn(
                "w-full accent-primary-main",
                disabled && "cursor-not-allowed opacity-50",
              )}
            />
          ))}
          {marks && (
            <span aria-hidden="true" className="sr-only">
              marks
            </span>
          )}
        </div>
      )}
    </FormField>
  );
}
