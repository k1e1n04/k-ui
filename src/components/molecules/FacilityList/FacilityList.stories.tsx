import type { Meta, StoryObj } from "@storybook/react";

import { FacilityList } from "./FacilityList";

const meta = {
  title: "Molecules/FacilityList",
  component: FacilityList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4] },
    size: { control: "select", options: ["sm", "md"] },
  },
} satisfies Meta<typeof FacilityList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "設備・条件",
    items: [
      { key: "bath", label: "バス・トイレ別" },
      { key: "auto-lock", label: "オートロック" },
      { key: "delivery", label: "宅配ボックス" },
      { key: "aircon", label: "エアコン" },
      { key: "parking", label: "駐車場", available: false },
      { key: "pet", label: "ペット可", available: false },
    ],
  },
};

export const ThreeColumns: Story = {
  args: { ...Default.args, columns: 3 },
};
