"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../../utils/cn";

/** フォームフィールドのサイズ */
export type FormFieldSize = "small" | "medium" | "large";

export interface FormFieldRenderProps {
  /** フィールドに設定する aria-describedby */
  describedBy?: string;
  /** 説明文の要素ID */
  descriptionId?: string;
  /** エラー要素のID */
  errorId?: string;
}

export interface FormFieldProps {
  /** ラベルテキスト */
  label?: string;
  /** 補助説明 */
  description?: string;
  /** 必須フラグ（ラベルに * を付与する） */
  required?: boolean;
  /** エラーメッセージ */
  error?: string;
  /** label と入力要素を紐づける htmlFor */
  htmlFor?: string;
  /** サイズ */
  size?: FormFieldSize;
  /** 追加のクラス名（ルートラッパーに適用） */
  className?: string;
  /** 既存の aria-describedby（内部IDとマージされる） */
  "aria-describedby"?: string;
  /** フィールド本体 */
  children:
    | React.ReactNode
    | ((props: FormFieldRenderProps) => React.ReactNode);
}

const labelSizeStyles: Record<FormFieldSize, string> = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5",
};

const descriptionSizeStyles: Record<FormFieldSize, string> = {
  small: "text-xs mb-1",
  medium: "text-xs mb-1",
  large: "text-sm mb-1.5",
};

const errorSizeStyles: Record<FormFieldSize, string> = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5",
};

/**
 * フォーム入力要素向けの共通ラッパー。
 *
 * label / description / required / error の表示ルールと
 * aria-describedby のID連携を一元管理する。
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  required = false,
  error,
  htmlFor,
  size = "medium",
  className,
  "aria-describedby": ariaDescribedBy,
  children,
}) => {
  const baseId = useId();
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;
  const describedBy = [
    ariaDescribedBy,
    description ? descriptionId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const content =
    typeof children === "function"
      ? children({
          describedBy: describedBy || undefined,
          descriptionId: description ? descriptionId : undefined,
          errorId: error ? errorId : undefined,
        })
      : children;

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            "font-medium text-gray-700 dark:text-gray-300",
            labelSizeStyles[size],
          )}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="ml-0.5 text-[var(--kui-color-danger)]"
            >
              {" *"}
            </span>
          )}
        </label>
      )}

      {description && (
        <p
          id={descriptionId}
          className={cn(
            "text-gray-600 dark:text-gray-400",
            descriptionSizeStyles[size],
          )}
        >
          {description}
        </p>
      )}

      {content}

      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "text-[var(--kui-color-danger)]",
            errorSizeStyles[size],
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};
