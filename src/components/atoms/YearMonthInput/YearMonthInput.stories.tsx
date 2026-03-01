import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { YearMonthInput } from "./YearMonthInput";

const meta = {
  title: "Atoms/YearMonthInput",
  component: YearMonthInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    allowClear: { control: "boolean" },
  },
} satisfies Meta<typeof YearMonthInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Month",
  },
};

export const WithValue: Story = {
  args: {
    label: "Start Month",
    value: "2026-01",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Month (2024-2026)",
    min: "2024-01",
    max: "2026-12",
  },
};

export const AllowClear: Story = {
  args: {
    label: "Month",
    value: "2026-03",
    allowClear: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Month",
    value: "2020-01",
    error: "Out of valid range",
  },
};

export const Required: Story = {
  args: {
    label: "Month",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Month",
    value: "2026-03",
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "large",
  },
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>("2026-03");
    return (
      <div className="space-y-2 max-w-sm">
        <YearMonthInput
          label="Event Month"
          value={value}
          onChange={setValue}
          allowClear
          min="2024-01"
          max="2030-12"
        />
        <p className="text-xs text-gray-500">Value: {value ?? "undefined"}</p>
      </div>
    );
  },
};
