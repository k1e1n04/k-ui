import type { Meta, StoryObj } from "@storybook/react";

import { Rating } from "./Rating";

const meta = {
  title: "Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true, label: "総合評価" },
};

export const WithValue: Story = {
  args: { value: 3.5, readOnly: true, showValue: true, label: "レビュー" },
};

export const Interactive: Story = {
  args: { value: 3, label: "評価を選択" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Rating value={4} readOnly size="sm" />
      <Rating value={4} readOnly size="md" />
      <Rating value={4} readOnly size="lg" />
    </div>
  ),
};
