import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Share with others",
  },
};

export const WithLabelChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Share with others",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    disabled: true,
    label: "Disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    disabled: true,
    label: "Disabled checked",
  },
};

export const Small: Story = {
  args: {
    checked: true,
    onChange: () => {},
    size: "small",
    label: "Small",
  },
};

export const Medium: Story = {
  args: {
    checked: true,
    onChange: () => {},
    size: "medium",
    label: "Medium",
  },
};

export const Large: Story = {
  args: {
    checked: true,
    onChange: () => {},
    size: "large",
    label: "Large",
  },
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Check me",
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};
