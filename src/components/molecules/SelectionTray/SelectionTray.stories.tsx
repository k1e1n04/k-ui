import type { Meta, StoryObj } from "@storybook/react";

import { SelectionTray } from "./SelectionTray";

const meta = {
  title: "Molecules/SelectionTray",
  component: SelectionTray,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SelectionTray>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "p1", label: "グランドメゾン渋谷", description: "12.8万円" },
      { id: "p2", label: "パークサイド目黒", description: "9.8万円" },
    ],
    onRemove: () => {},
    onClear: () => {},
    onConfirm: () => {},
    confirmLabel: "比較する",
  },
};

export const Single: Story = {
  args: {
    items: [{ id: "p1", label: "グランドメゾン渋谷", description: "12.8万円" }],
    onRemove: () => {},
    onConfirm: () => {},
    confirmLabel: "比較する",
  },
};
