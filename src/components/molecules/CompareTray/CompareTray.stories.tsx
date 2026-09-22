import type { Meta, StoryObj } from "@storybook/react";

import { CompareTray } from "./CompareTray";

const meta = {
  title: "Molecules/CompareTray",
  component: CompareTray,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CompareTray>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "p1", title: "グランドメゾン渋谷", rent: 128000 },
      { id: "p2", title: "パークサイド目黒", rent: 98000 },
    ],
    onRemove: () => {},
    onClear: () => {},
    onCompare: () => {},
  },
};

export const Single: Story = {
  args: {
    items: [{ id: "p1", title: "グランドメゾン渋谷", rent: 128000 }],
    onRemove: () => {},
    onCompare: () => {},
  },
};
