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

/** 絞り込み条件 */
export interface PropertyFilterValue {
  /** 賃料の下限（円） */
  rentMin: number;
  /** 賃料の上限（円） */
  rentMax: number;
  /** 選択中の間取り */
  layouts: string[];
  /** 徒歩分数の上限（未指定は undefined） */
  maxWalkMinutes?: number;
  /** 築年数の上限（未指定は undefined） */
  maxBuildingAge?: number;
  /** 選択中の設備 */
  facilities: string[];
  /** 募集中のみ表示するか */
  onlyAvailable: boolean;
}

export interface PropertyFilterOption {
  /** 表示ラベル */
  label: string;
  /** 値 */
  value: string;
}

export interface PropertyFilterPanelProps {
  /** 現在の条件 */
  value: PropertyFilterValue;
  /** 条件変更時 */
  onChange: (value: PropertyFilterValue) => void;
  /** 間取りの選択肢 */
  layoutOptions?: string[];
  /** 設備の選択肢 */
  facilityOptions?: PropertyFilterOption[];
  /** 徒歩分数の選択肢 */
  walkOptions?: number[];
  /** 築年数の選択肢 */
  ageOptions?: number[];
  /** 賃料スライダーの最大値。 @default 300000 */
  rentMax?: number;
  /** 賃料スライダーの刻み幅。 @default 5000 */
  rentStep?: number;
  /** リセット時 */
  onReset?: () => void;
  /** 適用時 */
  onSubmit?: () => void;
  /** 追加のクラス名 */
  className?: string;
}

const DEFAULT_LAYOUTS = [
  "1R",
  "1K",
  "1DK",
  "1LDK",
  "2K",
  "2DK",
  "2LDK",
  "3LDK",
  "4LDK+",
];

const DEFAULT_FACILITIES: PropertyFilterOption[] = [
  { label: "バス・トイレ別", value: "separate-bath" },
  { label: "オートロック", value: "auto-lock" },
  { label: "宅配ボックス", value: "delivery-box" },
  { label: "エアコン", value: "air-conditioner" },
  { label: "駐車場", value: "parking" },
  { label: "ペット可", value: "pet" },
  { label: "インターネット無料", value: "free-internet" },
  { label: "2階以上", value: "second-floor" },
];

const DEFAULT_WALK = [5, 7, 10, 15, 20];
const DEFAULT_AGE = [0, 1, 3, 5, 10, 20];

const toggleValue = (list: string[], target: string): string[] =>
  list.includes(target)
    ? list.filter((item) => item !== target)
    : [...list, target];

const formatManYen = (value: number): string => {
  const man = Math.round((value / 10000) * 10) / 10;
  return Number.isInteger(man) ? `${man}万円` : `${man.toFixed(1)}万円`;
};

/**
 * PropertyFilterPanel コンポーネント
 *
 * 賃料・間取り・徒歩分数・築年数・設備などで物件を絞り込むパネル。
 *
 * @example
 * <PropertyFilterPanel
 *   value={filter}
 *   onChange={setFilter}
 *   onReset={reset}
 *   onSubmit={apply}
 * />
 */
export const PropertyFilterPanel: React.FC<PropertyFilterPanelProps> = ({
  value,
  onChange,
  layoutOptions = DEFAULT_LAYOUTS,
  facilityOptions = DEFAULT_FACILITIES,
  walkOptions = DEFAULT_WALK,
  ageOptions = DEFAULT_AGE,
  rentMax = 300000,
  rentStep = 5000,
  onReset,
  onSubmit,
  className,
}) => {
  const update = (partial: Partial<PropertyFilterValue>) =>
    onChange({ ...value, ...partial });

  const walkSelectOptions = [
    { label: "指定なし", value: "" },
    ...walkOptions.map((minutes) => ({
      label: `${minutes}分以内`,
      value: String(minutes),
    })),
  ];

  const ageSelectOptions = [
    { label: "指定なし", value: "" },
    ...ageOptions.map((age) => ({
      label: age === 0 ? "新築のみ" : `築${age}年以内`,
      value: String(age),
    })),
  ];

  return (
    <section
      aria-label="物件の絞り込み条件"
      className={cn(
        "flex flex-col gap-6 rounded-lg border border-border bg-surface p-4",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <Heading as="h3" size="sm">
          賃料
        </Heading>
        <RangeSlider
          label="賃料の範囲"
          value={[value.rentMin, value.rentMax]}
          onChange={([rentMin, rentMax]) => update({ rentMin, rentMax })}
          min={0}
          max={rentMax}
          step={rentStep}
          formatValue={formatManYen}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Heading as="h3" size="sm">
          間取り
        </Heading>
        <div className="flex flex-wrap gap-2">
          {layoutOptions.map((layout) => (
            <Chip
              key={layout}
              variant="primary"
              selected={value.layouts.includes(layout)}
              onClick={() =>
                update({ layouts: toggleValue(value.layouts, layout) })
              }
            >
              {layout}
            </Chip>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="駅からの徒歩分数"
          placeholder="指定なし"
          options={walkSelectOptions}
          value={
            value.maxWalkMinutes === undefined
              ? ""
              : String(value.maxWalkMinutes)
          }
          onChange={(next) =>
            update({
              maxWalkMinutes: next === "" ? undefined : Number(next),
            })
          }
        />
        <Select
          label="築年数"
          placeholder="指定なし"
          options={ageSelectOptions}
          value={
            value.maxBuildingAge === undefined
              ? ""
              : String(value.maxBuildingAge)
          }
          onChange={(next) =>
            update({
              maxBuildingAge: next === "" ? undefined : Number(next),
            })
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <Heading as="h3" size="sm">
          こだわり条件
        </Heading>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {facilityOptions.map((facility) => (
            <Checkbox
              key={facility.value}
              checked={value.facilities.includes(facility.value)}
              onChange={() =>
                update({
                  facilities: toggleValue(value.facilities, facility.value),
                })
              }
              label={facility.label}
            />
          ))}
        </div>
      </div>

      <Checkbox
        checked={value.onlyAvailable}
        onChange={(onlyAvailable) => update({ onlyAvailable })}
        label="募集中の物件のみ表示"
      />

      {(onReset || onSubmit) && (
        <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
          {onReset && (
            <Button variant="outline" fullWidth onClick={onReset}>
              条件をリセット
            </Button>
          )}
          {onSubmit && (
            <Button variant="primary" fullWidth onClick={onSubmit}>
              この条件で検索
            </Button>
          )}
        </div>
      )}

      <Typography variant="caption" tone="muted">
        {`選択中: 間取り ${value.layouts.length}件 / こだわり ${value.facilities.length}件`}
      </Typography>
    </section>
  );
};
