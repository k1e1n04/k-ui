import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "date", "time", "url", "month"],
    },
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Email",
  },
};

export const WithLabelAndPlaceholder: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    required: true,
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "invalid",
    error: "Please enter a valid email address",
  },
};

export const RequiredWithError: Story = {
  args: {
    label: "Email",
    required: true,
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    disabled: true,
    placeholder: "Enter your email",
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Email",
    disabled: true,
    value: "user@example.com",
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
    placeholder: "Small input",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium",
    size: "medium",
    placeholder: "Medium input",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "large",
    placeholder: "Large input",
  },
};

export const TypeDate: Story = {
  args: {
    type: "date",
    label: "Date",
  },
};

export const TypeNumber: Story = {
  args: {
    type: "number",
    label: "Amount",
    placeholder: "0",
  },
};

export const TypeTime: Story = {
  args: {
    type: "time",
    label: "Time",
  },
};

export const TypeUrl: Story = {
  args: {
    type: "url",
    label: "Website",
    placeholder: "https://example.com",
  },
};

export const TypeMonth: Story = {
  args: {
    type: "month",
    label: "Month",
  },
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <Input {...args} value={value} onChange={setValue} />;
  },
};
