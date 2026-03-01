"use client";

import type React from "react";
import { useCallback, useId, useRef, useState } from "react";

import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";

/** NumberInput のサイズ */
export type NumberInputSize = "small" | "medium" | "large";

/** 空文字時の挙動 */
export type NumberInputEmptyBehavior = "undefined" | "zero";

export interface NumberInputProps {
  /** 現在の数値 */
  value?: number;
  /** 値変更ハンドラー */
  onValueChange?: (value: number | undefined) => void;
  /** 小数桁数 */
  precision?: number;
  /** 最小値 */
  min?: number;
  /** 最大値 */
  max?: number;
  /** ステップ */
  step?: number;
  /** 接尾辞（例: %, 万円） */
  suffix?: string;
  /** 負数を許可するか */
  allowNegative?: boolean;
  /** 空文字時の挙動 */
  emptyBehavior?: NumberInputEmptyBehavior;
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
  /** 補助説明 */
  description?: string;
  /** 必須フラグ */
  required?: boolean;
  /** 無効化 */
  disabled?: boolean;
  /** プレースホルダー */
  placeholder?: string;
  /** サイズ */
  size?: NumberInputSize;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
  /** input の id */
  id?: string;
  /** input の name */
  name?: string;
  /** aria-invalid の上書き */
  "aria-invalid"?: boolean;
  /** aria-describedby の上書き */
  "aria-describedby"?: string;
}

/** インプットのサイズスタイル */
const inputSizeStyles: Record<NumberInputSize, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5",
};

/** 接尾辞のサイズスタイル */
const suffixSizeStyles: Record<NumberInputSize, string> = {
  small: "text-xs pr-2",
  medium: "text-sm pr-3",
  large: "text-base pr-4",
};

/**
 * 数値入力コンポーネント
 *
 * precision/suffix/min-max/empty handling をサポートする数値専用インプット。
 * 内部的にはテキスト入力を使用し、フォーマット・パースを制御する。
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onValueChange,
  precision,
  min,
  max,
  step,
  suffix,
  allowNegative = false,
  emptyBehavior = "undefined",
  label,
  error,
  description,
  required = false,
  disabled = false,
  placeholder,
  size = "medium",
  className,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}) => {
  const baseId = useId();
  const inputId = id ?? `${baseId}-number-input`;
  const resolvedAriaInvalid = error ? true : (ariaInvalid ?? false);
  const inputRef = useRef<HTMLInputElement>(null);

  /** 数値を表示用文字列に変換 */
  const formatValue = useCallback(
    (num: number | undefined): string => {
      if (num === undefined) return "";
      if (precision !== undefined) {
        return num.toFixed(precision);
      }
      return String(num);
    },
    [precision],
  );

  const [displayValue, setDisplayValue] = useState(() => formatValue(value));
  const [isFocused, setIsFocused] = useState(false);

  // 外部からの value 変更を反映（フォーカス中は反映しない）
  const prevValueRef = useRef(value);
  if (prevValueRef.current !== value && !isFocused) {
    prevValueRef.current = value;
    setDisplayValue(formatValue(value));
  }

  /** 文字列を数値にパースする */
  const parseValue = useCallback(
    (str: string): number | undefined => {
      const trimmed = str.trim();
      if (trimmed === "" || trimmed === "-") {
        return emptyBehavior === "zero" ? 0 : undefined;
      }
      const num = Number(trimmed);
      if (Number.isNaN(num)) {
        return emptyBehavior === "zero" ? 0 : undefined;
      }
      return num;
    },
    [emptyBehavior],
  );

  /** 値をmin/maxでクランプする */
  const clampValue = useCallback(
    (num: number | undefined): number | undefined => {
      if (num === undefined) return undefined;
      let clamped = num;
      if (min !== undefined && clamped < min) clamped = min;
      if (max !== undefined && clamped > max) clamped = max;
      return clamped;
    },
    [min, max],
  );

  /** 入力許可文字のパターン */
  const isValidInput = useCallback(
    (str: string): boolean => {
      if (str === "") return true;
      const pattern = allowNegative
        ? /^-?[0-9]*\.?[0-9]*$/
        : /^[0-9]*\.?[0-9]*$/;
      return pattern.test(str);
    },
    [allowNegative],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!isValidInput(raw)) return;
    setDisplayValue(raw);

    const parsed = parseValue(raw);
    const clamped = clampValue(parsed);
    onValueChange?.(clamped);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseValue(displayValue);
    const clamped = clampValue(parsed);
    setDisplayValue(formatValue(clamped));
    if (clamped !== parseValue(displayValue)) {
      onValueChange?.(clamped);
    }
    prevValueRef.current = clamped;
  };

  /** hidden input のための値（RHF 連携用） */
  const hiddenValue = value !== undefined ? String(value) : "";

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      error={error}
      size={size}
      className={className}
      htmlFor={inputId}
      aria-describedby={ariaDescribedBy}
    >
      {({ describedBy }) => (
        <>
          {name && (
            <input type="hidden" name={name} value={hiddenValue} />
          )}
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              inputMode="decimal"
              value={displayValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              step={step}
              aria-invalid={resolvedAriaInvalid}
              aria-describedby={describedBy}
              className={cn(
                "w-full rounded-md border bg-white transition-colors duration-150",
                "text-gray-900 placeholder:text-gray-400",
                "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
                inputSizeStyles[size],
                suffix && "pr-0",
                error
                  ? [
                      "border-[var(--kui-color-danger)]",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-danger)] focus:ring-offset-1",
                    ]
                  : [
                      "border-[var(--kui-color-border-strong)]",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
                      "dark:border-gray-600",
                    ],
                disabled && "cursor-not-allowed opacity-50",
              )}
            />
            {suffix && (
              <span
                className={cn(
                  "pointer-events-none shrink-0 text-gray-500 dark:text-gray-400",
                  suffixSizeStyles[size],
                )}
              >
                {suffix}
              </span>
            )}
          </div>
        </>
      )}
    </FormField>
  );
};
