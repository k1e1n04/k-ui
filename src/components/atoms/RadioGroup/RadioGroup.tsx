"use client";
import type React from "react";
import { useId } from "react";
import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";
/** ラジオグループの選択肢。 @default undefined */
export interface RadioGroupOption {
  /** 表示名。 @default undefined */
  label: string;
  /** 値。 @default undefined */
  value: string;
  /** 無効状態。 @default false */
  disabled?: boolean;
}
/** ラジオグループのプロパティ。 @default undefined */
export interface RadioGroupProps {
  /** 選択肢。 @default undefined */
  options: RadioGroupOption[];
  /** 選択値。 @default undefined */
  value: string;
  /** 値変更時の処理。 @default undefined */
  onChange: (value: string) => void;
  /** ラベル。 @default undefined */
  label?: string;
  /** 説明。 @default undefined */
  description?: string;
  /** エラーメッセージ。 @default undefined */
  error?: string;
  /** 必須入力か。 @default false */
  required?: boolean;
  /** 並びの方向。 @default "vertical" */
  orientation?: "horizontal" | "vertical";
  /** サイズ。 @default "medium" */
  size?: "small" | "medium" | "large";
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 名前。 @default undefined */
  name?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLDivElement>;
}
/** 選択肢から一つを選ぶラジオグループ。 @default undefined */
export function RadioGroup({
  options,
  value,
  onChange,
  label,
  description,
  error,
  required = false,
  orientation = "vertical",
  size = "medium",
  disabled = false,
  name,
  className,
  ref,
}: RadioGroupProps) {
  const id = useId();
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      size={size}
      className={className}
    >
      {({ describedBy }) => (
        <div
          role="radiogroup"
          ref={ref}
          aria-label={label}
          aria-describedby={describedBy}
          className={cn(
            "flex gap-3",
            orientation === "vertical" && "flex-col",
            className,
          )}
        >
          {options.map((option, index) => (
            <label
              key={option.value}
              className={cn(
                "inline-flex items-center gap-2 text-foreground",
                (disabled || option.disabled) &&
                  "cursor-not-allowed opacity-50",
              )}
            >
              <input
                id={`${id}-${index}`}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                required={required}
                disabled={disabled || option.disabled}
                onChange={() => onChange(option.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                className="accent-primary-main"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </FormField>
  );
}
