import type { Meta, StoryObj } from "@storybook/react";

import { StatCards } from "./StatCards";

const meta = {
  title: "Molecules/StatCards",
  component: StatCards,
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4],
    },
  },
} satisfies Meta<typeof StatCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: [
      { label: "Total", value: 150000, color: "blue" },
      { label: "My Share", value: 80000, color: "green" },
      { label: "Partner's Share", value: 70000, color: "purple" },
    ],
  },
};

export const WithFormatter: Story = {
  args: {
    cards: [
      { label: "Revenue", value: 1500000, color: "blue" },
      { label: "Expenses", value: 800000, color: "red" },
      { label: "Profit", value: 700000, color: "green" },
    ],
    formatValue: (value) =>
      new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(Number(value)),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    cards: [
      { label: "Users", value: "1,234", color: "blue" },
      { label: "Sessions", value: "5,678", color: "green" },
    ],
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    cards: [
      { label: "Total", value: "100", color: "blue" },
      { label: "Active", value: "80", color: "green" },
      { label: "Pending", value: "15", color: "yellow" },
      { label: "Failed", value: "5", color: "red" },
    ],
  },
};
