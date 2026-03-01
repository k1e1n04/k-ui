import type { Meta, StoryObj } from "@storybook/react";

import { KeyValueList } from "./KeyValueList";

const meta = {
  title: "Molecules/KeyValueList",
  component: KeyValueList,
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    separator: { control: "boolean" },
  },
} satisfies Meta<typeof KeyValueList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { key: "Name", value: "John Doe" },
  { key: "Email", value: "john@example.com" },
  { key: "Role", value: "Admin" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems,
    layout: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    items: sampleItems,
    layout: "vertical",
  },
};

export const WithSeparator: Story = {
  args: {
    items: sampleItems,
    separator: true,
  },
};

export const SmallSize: Story = {
  args: {
    items: sampleItems,
    size: "sm",
  },
};

export const WithTones: Story = {
  args: {
    items: [
      { key: "Revenue", value: "+¥1,200,000", tone: "success" as const },
      { key: "Expenses", value: "-¥800,000", tone: "danger" as const },
      { key: "Net Income", value: "¥400,000" },
    ],
    separator: true,
  },
};

/** 財務サマリー表示の例 */
export const FinancialSummary: Story = {
  args: {
    items: [
      { key: "Monthly Income", value: "¥500,000" },
      { key: "Housing Loan", value: "-¥120,000", tone: "danger" as const },
      { key: "Living Expenses", value: "-¥200,000", tone: "danger" as const },
      { key: "Savings", value: "+¥180,000", tone: "success" as const },
    ],
    separator: true,
    size: "md",
  },
};
