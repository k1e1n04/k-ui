"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";

/** インプットのタイプ */
export type InputType =
  | "text"
  | "number"
  | "date"
  | "time"
  | "url"
  | "month"
  | "hidden";

/** インプットのサイズ */
export type InputSize = "small" | "medium" | "large";

export interface InputProps
  extends Omit<
    React.ComponentPropsWithRef<"input">,
    "type" | "size" | "onChange" | "value" | "className"
  > {
  /** インプットのタイプ */
  type?: InputType;
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ（指定されるとエラー状態を表示する） */
  error?: string;
  /** 補助説明 */
  description?: string;
  /** 現在の値 */
  value?: string;
  /** 変更ハンドラー（入力値のみを受け取る） */
  onChange?: (value: string) => void;
  /** サイズ */
  size?: InputSize;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
}

/** インプットのサイズスタイル */
const inputSizeStyles: Record<InputSize, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5",
};

/**
 * インプットコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するテキスト入力UI
 */
export const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  required = false,
  placeholder,
  error,
  description,
  value,
  onChange,
  disabled = false,
  size = "medium",
  className,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...rest
}) => {
  const baseId = useId();
  const inputId = id ?? `${baseId}-input`;
  const resolvedAriaInvalid = error ? true : (ariaInvalid ?? false);

  // type="hidden" の場合は UI を持たない単純な hidden input を返す
  if (type === "hidden") {
    return (
      <input
        {...rest}
        type="hidden"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    );
  }

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
        <input
          {...rest}
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          aria-invalid={resolvedAriaInvalid}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-md border bg-surface transition-colors duration-150",
            "text-foreground placeholder:text-muted",
            inputSizeStyles[size],
            error
              ? [
                  "border-danger-main",
                  "focus:outline-none focus:ring-2 focus:ring-danger-main focus:ring-offset-1",
                ]
              : [
                  "border-border-strong",
                  "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1",
                ],
            disabled && "cursor-not-allowed opacity-50",
          )}
        />
      )}
    </FormField>
  );
};
