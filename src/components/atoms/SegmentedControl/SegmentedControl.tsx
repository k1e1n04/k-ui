"use client";
import type React from "react";
import { useRef } from "react";
import { cn } from "../../../utils/cn";
/** セグメントの選択肢。 @default undefined */
export interface SegmentedControlOption {
  /** 表示名。 @default undefined */
  label: string;
  /** 値。 @default undefined */
  value: string;
  /** 無効状態。 @default false */
  disabled?: boolean;
}
/** セグメントコントロールのプロパティ。 @default undefined */
export interface SegmentedControlProps {
  /** 選択肢。 @default undefined */
  options: SegmentedControlOption[];
  /** 選択値。 @default undefined */
  value: string;
  /** 値変更時の処理。 @default undefined */
  onChange: (value: string) => void;
  /** 幅いっぱいに表示するか。 @default false */
  fullWidth?: boolean;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** グループのアクセシブル名。 @default undefined */
  "aria-label"?: string;
  /** グループのラベル要素 ID。 @default undefined */
  "aria-labelledby"?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLDivElement>;
}
/** 選択肢を横並びのセグメントとして表示するコントロール。 @default undefined */
export function SegmentedControl({
  options,
  value,
  onChange,
  fullWidth = false,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  ref,
}: SegmentedControlProps) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabledIndexes = options
    .map((option, index) => (!disabled && !option.disabled ? index : -1))
    .filter((index) => index >= 0);
  const selectedIndex = options.findIndex(
    (option, index) => option.value === value && enabledIndexes.includes(index),
  );
  const focusIndex = selectedIndex >= 0 ? selectedIndex : enabledIndexes[0];
  const moveFocus = (index: number, direction: 1 | -1) => {
    const currentIndex = enabledIndexes.indexOf(index);
    if (currentIndex < 0 || enabledIndexes.length === 0) return;
    const nextIndex =
      enabledIndexes[
        (currentIndex + direction + enabledIndexes.length) %
          enabledIndexes.length
      ];
    const nextOption = options[nextIndex];
    onChange(nextOption.value);
    optionRefs.current[nextIndex]?.focus();
  };
  return (
    <div
      role="radiogroup"
      ref={ref}
      aria-label={
        ariaLabel ?? (ariaLabelledBy ? undefined : "Segmented control")
      }
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "inline-flex rounded-md bg-surface-sunken p-1",
        fullWidth && "w-full",
        className,
      )}
    >
      {options.map((option, index) => (
        // biome-ignore lint/a11y/useSemanticElements: ボタン操作のセグメントをラジオグループとして公開する
        <button
          type="button"
          role="radio"
          aria-checked={value === option.value}
          key={option.value}
          ref={(element) => {
            optionRefs.current[index] = element;
          }}
          tabIndex={index === focusIndex ? 0 : -1}
          disabled={disabled || option.disabled}
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              moveFocus(index, 1);
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              moveFocus(index, -1);
            }
          }}
          className={cn(
            "rounded px-3 py-1.5 text-sm text-foreground",
            value === option.value && "bg-surface shadow-sm",
            fullWidth && "flex-1",
            (disabled || option.disabled) && "cursor-not-allowed opacity-50",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
