import type { Meta, StoryObj } from "@storybook/react";

import { Price } from "./Price";

const meta = {
  title: "Atoms/Price",
  component: Price,
  tags: ["autodocs"],
  argTypes: {
    format: { control: "select", options: ["man", "yen"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: {
      control: "select",
      options: ["default", "primary", "accent", "muted"],
    },
  },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 85000 },
};

export const WithCaption: Story = {
  args: {
    value: 128000,
    size: "lg",
    tone: "primary",
    unit: "/月",
    caption: "管理費 8,000円",
  },
};

export const Yen: Story = {
  args: { value: 85000, format: "yen" },
};
