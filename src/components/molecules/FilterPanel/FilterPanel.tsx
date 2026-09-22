"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/Button";
import { Checkbox } from "../../atoms/Checkbox";
import { Chip } from "../../atoms/Chip";
import { Heading } from "../../atoms/Heading";
import { RangeSlider } from "../../atoms/RangeSlider";
import { Select } from "../../atoms/Select";
import { Typography } from "../../atoms/Typography";

/** フィルターの選択肢 */
export interface FilterOption {
  /** 表示ラベル */
  label: string;
  /** 値 */
  value: string;
  /** 無効状態 */
  disabled?: boolean;
}

/** 範囲スライダーのフィールド */
export interface FilterRangeField {
  type: "range";
  /** 一意なキー */
  key: string;
  /** ラベル */
  label: string;
  /** 最小値 */
  min: number;
  /** 最大値 */
  max: number;
  /** 刻み幅 */
  step?: number;
  /** 現在の値 */
  value: [number, number];
  /** 値のフォーマッター */
  formatValue?: (value: number) => string;
  /** 説明 */
  description?: string;
}

/** 複数選択チップのフィールド */
export interface FilterChipsField {
  type: "chips";
  /** 一意なキー */
  key: string;
  /** ラベル */
  label: string;
  /** 選択肢 */
  options: FilterOption[];
  /** 現在の値 */
  value: string[];
}

/** チェックボックス群のフィールド */
export interface FilterCheckboxesField {
  type: "checkboxes";
  /** 一意なキー */
  key: string;
  /** ラベル */
  label: string;
  /** 選択肢 */
  options: FilterOption[];
  /** 現在の値 */
  value: string[];
  /** グリッドのカラム数。 @default 2 */
  columns?: 1 | 2;
}

/** セレクトのフィールド */
export interface FilterSelectField {
  type: "select";
  /** 一意なキー */
  key: string;
  /** ラベル */
  label: string;
  /** 選択肢 */
  options: FilterOption[];
  /** 現在の値（未選択は undefined） */
  value?: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 未選択に戻せるか */
  clearable?: boolean;
}

/** 単一チェックのフィールド */
export interface FilterToggleField {
  type: "toggle";
  /** 一意なキー */
  key: string;
  /** ラベル */
  label: string;
  /** 現在の値 */
  value: boolean;
}

/** フィルターのフィールド定義 */
export type FilterField =
  | FilterRangeField
  | FilterChipsField
  | FilterCheckboxesField
  | FilterSelectField
  | FilterToggleField;

/** フィールドから通知される値 */
export type FilterFieldValue = string | string[] | [number, number] | boolean;

export interface FilterPanelProps {
  /** フィールド定義の一覧 */
  fields: FilterField[];
  /** 値変更時（キーと新しい値を受け取る） */
  onChange: (key: string, value: FilterFieldValue) => void;
  /** リセット時 */
  onReset?: () => void;
  /** 適用時 */
  onSubmit?: () => void;
  /** 見出し */
  title?: React.ReactNode;
  /** リセットボタンのラベル。 @default "条件をリセット" */
  resetLabel?: string;
  /** 適用ボタンのラベル。 @default "この条件で適用" */
  submitLabel?: string;
  /** 下部に表示するサマリー */
  summary?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

const toggleValue = (list: string[], target: string): string[] =>
  list.includes(target)
    ? list.filter((item) => item !== target)
    : [...list, target];

const checkboxColumnStyles: Record<1 | 2, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
};

const renderField = (
  field: FilterField,
  onChange: (key: string, value: FilterFieldValue) => void,
) => {
  switch (field.type) {
    case "range":
      return (
        <RangeSlider
          key={field.key}
          label={field.label}
          description={field.description}
          value={field.value}
          onChange={(value) => onChange(field.key, value)}
          min={field.min}
          max={field.max}
          step={field.step}
          formatValue={field.formatValue}
        />
      );
    case "chips":
      return (
        <div key={field.key} className="flex flex-col gap-3">
          <Heading as="h3" size="sm">
            {field.label}
          </Heading>
          <div className="flex flex-wrap gap-2">
            {field.options.map((option) => (
              <Chip
                key={option.value}
                variant="primary"
                selected={field.value.includes(option.value)}
                disabled={option.disabled}
                onClick={() =>
                  onChange(field.key, toggleValue(field.value, option.value))
                }
              >
                {option.label}
              </Chip>
            ))}
          </div>
        </div>
      );
    case "checkboxes":
      return (
        <div key={field.key} className="flex flex-col gap-3">
          <Heading as="h3" size="sm">
            {field.label}
          </Heading>
          <div
            className={cn(
              "grid gap-2",
              checkboxColumnStyles[field.columns ?? 2],
            )}
          >
            {field.options.map((option) => (
              <Checkbox
                key={option.value}
                checked={field.value.includes(option.value)}
                disabled={option.disabled}
                onChange={() =>
                  onChange(field.key, toggleValue(field.value, option.value))
                }
                label={option.label}
              />
            ))}
          </div>
        </div>
      );
    case "select":
      return (
        <Select
          key={field.key}
          label={field.label}
          options={field.options}
          value={field.value ?? ""}
          placeholder={field.placeholder}
          clearable={field.clearable}
          onChange={(value) => onChange(field.key, value)}
        />
      );
    case "toggle":
      return (
        <Checkbox
          key={field.key}
          checked={field.value}
          onChange={(checked) => onChange(field.key, checked)}
          label={field.label}
        />
      );
    default:
      return null;
  }
};

/**
 * FilterPanel コンポーネント
 *
 * フィールド定義を渡すと、範囲・チップ・チェックボックス・セレクト・トグルを
 * 組み合わせた絞り込みパネルを描画する汎用コンポーネント。
 *
 * @example
 * <FilterPanel
 *   fields={[
 *     { type: "range", key: "rent", label: "賃料", min: 0, max: 300000, value: [0, 150000] },
 *     { type: "chips", key: "layout", label: "間取り", options: layoutOptions, value: layouts },
 *   ]}
 *   onChange={(key, value) => update(key, value)}
 * />
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  fields,
  onChange,
  onReset,
  onSubmit,
  title,
  resetLabel = "条件をリセット",
  submitLabel = "この条件で適用",
  summary,
  className,
}) => {
  return (
    <section
      aria-label={typeof title === "string" ? title : "絞り込み条件"}
      className={cn(
        "flex flex-col gap-6 rounded-lg border border-border bg-surface p-4",
        className,
      )}
    >
      {title && (
        <Heading as="h2" size="sm">
          {title}
        </Heading>
      )}

      {fields.map((field) => renderField(field, onChange))}

      {(onReset || onSubmit) && (
        <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
          {onReset && (
            <Button variant="outline" fullWidth onClick={onReset}>
              {resetLabel}
            </Button>
          )}
          {onSubmit && (
            <Button variant="primary" fullWidth onClick={onSubmit}>
              {submitLabel}
            </Button>
          )}
        </div>
      )}

      {summary && (
        <Typography variant="caption" tone="muted">
          {summary}
        </Typography>
      )}
    </section>
  );
};
