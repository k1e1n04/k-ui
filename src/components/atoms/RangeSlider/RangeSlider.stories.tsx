import type { Meta, StoryObj } from "@storybook/react";

import { RangeSlider } from "./RangeSlider";

const meta = {
  title: "Atoms/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatManYen = (value: number) => {
  const man = Math.round((value / 10000) * 10) / 10;
  return Number.isInteger(man) ? `${man}万円` : `${man.toFixed(1)}万円`;
};

export const Default: Story = {
  args: {
    value: [50000, 150000],
    onChange: () => {},
    min: 0,
    max: 300000,
    step: 5000,
    label: "賃料の範囲",
    formatValue: formatManYen,
  },
};

export const WithDescription: Story = {
  args: {
    value: [50000, 150000],
    onChange: () => {},
    min: 0,
    max: 300000,
    step: 5000,
    label: "賃料",
    description: "下限と上限を指定してください。",
    formatValue: formatManYen,
  },
};

export const Disabled: Story = {
  args: {
    value: [50000, 150000],
    onChange: () => {},
    min: 0,
    max: 300000,
    step: 5000,
    label: "賃料",
    disabled: true,
    formatValue: formatManYen,
  },
};
