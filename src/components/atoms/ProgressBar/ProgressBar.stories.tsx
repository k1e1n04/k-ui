import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: "number", min: 1, max: 200, step: 1 },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 45,
    max: 100,
    size: "md",
    label: "Progress 45/100",
  },
};

export const Small: Story = {
  args: {
    value: 25,
    size: "sm",
    label: "Progress 25/100",
  },
};

export const Large: Story = {
  args: {
    value: 80,
    size: "lg",
    label: "Progress 80/100",
  },
};

export const CustomMax: Story = {
  args: {
    value: 32,
    max: 40,
    size: "md",
    label: "Progress 32/40",
  },
};
