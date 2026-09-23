"use client";
import type React from "react";
import { useId, useState } from "react";
import { cn } from "../../../utils/cn";
import { FormField } from "../FormField";
/** パスワード入力のプロパティ。 @default undefined */
export interface PasswordInputProps
  extends Omit<
    React.ComponentPropsWithRef<"input">,
    "type" | "size" | "value" | "onChange"
  > {
  /** 現在値。 @default undefined */
  value?: string;
  /** 値変更時の処理。 @default undefined */
  onChange?: (value: string) => void;
  /** ラベル。 @default "Password" */
  label?: string;
  /** 説明。 @default undefined */
  description?: string;
  /** エラーメッセージ。 @default undefined */
  error?: string;
  /** 表示切替を表示するか。 @default true */
  showToggle?: boolean;
  /** 表示・非表示ボタンのラベル。 @default { show: "Show password", hide: "Hide password" } */
  visibilityLabels?: {
    show: string;
    hide: string;
  };
  /** サイズ。 @default "medium" */
  size?: "small" | "medium" | "large";
  /** 追加のクラス名。 @default undefined */
  className?: string;
}
/** パスワードの表示切替を備えた入力欄。 @default undefined */
export function PasswordInput({
  value,
  onChange,
  label = "Password",
  description,
  error,
  showToggle = true,
  visibilityLabels = { show: "Show password", hide: "Hide password" },
  size = "medium",
  className,
  disabled = false,
  id,
  required = false,
  "aria-describedby": ariaDescribedBy,
  ...props
}: PasswordInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      size={size}
      className={className}
      htmlFor={inputId}
      aria-describedby={ariaDescribedBy}
    >
      {({ describedBy }) => (
        <div className={cn("relative", className)}>
          <input
            {...props}
            id={inputId}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              "w-full rounded-md border border-border-strong bg-surface text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-info-main",
              error && "border-danger-main",
              disabled && "cursor-not-allowed opacity-50",
              showToggle && "pr-12",
            )}
          />
          {showToggle && (
            <button
              type="button"
              aria-label={
                visible ? visibilityLabels.hide : visibilityLabels.show
              }
              disabled={disabled}
              onClick={() => setVisible((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary-main"
            >
              {visible ? "Hide" : "Show"}
            </button>
          )}
        </div>
      )}
    </FormField>
  );
}
