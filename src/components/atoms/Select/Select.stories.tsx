import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Select } from "./Select";

const sampleOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
];

const meta = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
  args: {
    options: sampleOptions,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Fruit",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Fruit",
    placeholder: "Select a fruit",
    value: "",
  },
};

export const Required: Story = {
  args: {
    label: "Fruit",
    required: true,
    placeholder: "Select a fruit",
    value: "",
  },
};

export const WithError: Story = {
  args: {
    label: "Fruit",
    value: "",
    placeholder: "Select a fruit",
    error: "Please select a fruit",
  },
};

export const RequiredWithError: Story = {
  args: {
    label: "Fruit",
    required: true,
    error: "This field is required",
    value: "",
    placeholder: "Select a fruit",
  },
};

export const Disabled: Story = {
  args: {
    label: "Fruit",
    disabled: true,
    placeholder: "Select a fruit",
    value: "",
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Fruit",
    disabled: true,
    value: "banana",
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
    placeholder: "Small select",
    value: "",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium",
    size: "medium",
    placeholder: "Medium select",
    value: "",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "large",
    placeholder: "Large select",
    value: "",
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Fruit",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana (sold out)", value: "banana", disabled: true },
      { label: "Cherry", value: "cherry" },
    ],
  },
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  args: {
    label: "Fruit",
    placeholder: "Select a fruit",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <Select {...args} value={value} onChange={setValue} />;
  },
};
