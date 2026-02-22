import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
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
    rows: {
      control: "number",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Note",
  },
};

export const WithLabelAndPlaceholder: Story = {
  args: {
    label: "Note",
    placeholder: "Enter your note",
  },
};

export const Required: Story = {
  args: {
    label: "Note",
    required: true,
    placeholder: "Enter your note",
  },
};

export const WithError: Story = {
  args: {
    label: "Note",
    value: "x",
    error: "Note must be at least 10 characters",
  },
};

export const RequiredWithError: Story = {
  args: {
    label: "Note",
    required: true,
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Note",
    disabled: true,
    placeholder: "Enter your note",
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Note",
    disabled: true,
    value: "This is a read-only note.",
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
    placeholder: "Small textarea",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium",
    size: "medium",
    placeholder: "Medium textarea",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "large",
    placeholder: "Large textarea",
  },
};

export const CustomRows: Story = {
  args: {
    label: "Description",
    rows: 6,
    placeholder: "Enter a detailed description",
  },
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  args: {
    label: "Note",
    placeholder: "Enter your note",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
};
