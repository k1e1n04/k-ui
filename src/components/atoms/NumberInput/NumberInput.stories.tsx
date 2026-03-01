import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { NumberInput } from "./NumberInput";

const meta = {
  title: "Atoms/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    emptyBehavior: {
      control: "select",
      options: ["undefined", "zero"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    allowNegative: { control: "boolean" },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Amount",
    placeholder: "0",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Rate",
    suffix: "%",
    precision: 2,
    placeholder: "0.00",
  },
};

export const WithYenSuffix: Story = {
  args: {
    label: "Price",
    suffix: "万円",
    placeholder: "0",
  },
};

export const WithPrecision: Story = {
  args: {
    label: "Decimal",
    precision: 2,
    placeholder: "0.00",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Score (0-100)",
    min: 0,
    max: 100,
    placeholder: "0",
  },
};

export const AllowNegative: Story = {
  args: {
    label: "Difference",
    allowNegative: true,
    placeholder: "0",
  },
};

export const EmptyBehaviorZero: Story = {
  args: {
    label: "Quantity",
    emptyBehavior: "zero",
    placeholder: "0",
  },
};

export const WithError: Story = {
  args: {
    label: "Amount",
    value: 150,
    max: 100,
    error: "Must be 100 or less",
  },
};

export const Required: Story = {
  args: {
    label: "Amount",
    required: true,
    placeholder: "0",
  },
};

export const Disabled: Story = {
  args: {
    label: "Amount",
    value: 42,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
    placeholder: "0",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "large",
    placeholder: "0",
  },
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return (
      <div className="space-y-2 max-w-sm">
        <NumberInput
          label="Interest Rate"
          suffix="%"
          precision={2}
          min={0}
          max={100}
          value={value}
          onValueChange={setValue}
          placeholder="0.00"
        />
        <p className="text-xs text-gray-500">
          Value: {value === undefined ? "undefined" : value}
        </p>
      </div>
    );
  },
};
