import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  type FilterField,
  type FilterFieldValue,
  FilterPanel,
} from "./FilterPanel";

const meta = {
  title: "Molecules/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatManYen = (value: number) => {
  const man = Math.round((value / 10000) * 10) / 10;
  return Number.isInteger(man) ? `${man}万円` : `${man.toFixed(1)}万円`;
};

const initialFields: FilterField[] = [
  {
    type: "range",
    key: "rent",
    label: "賃料",
    min: 0,
    max: 300000,
    step: 5000,
    value: [50000, 150000],
    formatValue: formatManYen,
  },
  {
    type: "chips",
    key: "layout",
    label: "間取り",
    options: [
      { label: "1R", value: "1r" },
      { label: "1K", value: "1k" },
      { label: "1DK", value: "1dk" },
      { label: "1LDK", value: "1ldk" },
      { label: "2LDK", value: "2ldk" },
      { label: "3LDK", value: "3ldk" },
    ],
    value: ["1ldk"],
  },
  {
    type: "select",
    key: "walk",
    label: "駅からの徒歩分数",
    options: [
      { label: "5分以内", value: "5" },
      { label: "10分以内", value: "10" },
    ],
    value: "",
    placeholder: "指定なし",
    clearable: true,
  },
  {
    type: "checkboxes",
    key: "features",
    label: "こだわり条件",
    options: [
      { label: "バス・トイレ別", value: "bath" },
      { label: "オートロック", value: "auto-lock" },
      { label: "宅配ボックス", value: "delivery" },
      { label: "ペット可", value: "pet" },
    ],
    value: ["auto-lock"],
  },
  { type: "toggle", key: "available", label: "募集中のみ表示", value: true },
];

export const Default: Story = {
  args: {
    fields: initialFields,
    onChange: () => {},
  },
  render: function DefaultFilterPanel() {
    const [fields, setFields] = useState(initialFields);
    const handleChange = (key: string, value: FilterFieldValue) => {
      setFields((prev) =>
        prev.map((field) =>
          field.key === key ? ({ ...field, value } as FilterField) : field,
        ),
      );
    };
    return (
      <div className="max-w-md">
        <FilterPanel
          fields={fields}
          onChange={handleChange}
          onReset={() => setFields(initialFields)}
          onSubmit={() => {}}
          summary="条件を指定して検索できます。"
        />
      </div>
    );
  },
};
