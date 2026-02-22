import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    children: "Planned",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Completed",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Attention",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Error",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Archived",
  },
};
