import type { Meta, StoryObj } from "@storybook/react";

import { PropertyList } from "./PropertyList";

const meta = {
  title: "Molecules/PropertyList",
  component: PropertyList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3] },
  },
} satisfies Meta<typeof PropertyList>;

export default meta;
type Story = StoryObj<typeof meta>;

const properties = [
  {
    id: "p1",
    title: "グランドメゾン渋谷",
    rent: 128000,
    managementFee: 8000,
    address: "東京都渋谷区道玄坂1-1-1",
    access: "JR山手線 渋谷駅 徒歩5分",
    layout: "1LDK",
    area: 40.2,
    buildingAge: 5,
    tags: ["新着"],
  },
  {
    id: "p2",
    title: "パークサイド目黒",
    rent: 98000,
    managementFee: 6000,
    address: "東京都目黒区中目黒2-2-2",
    access: "東急東横線 中目黒駅 徒歩8分",
    layout: "1K",
    area: 28.5,
    buildingAge: 12,
  },
  {
    id: "p3",
    title: "リバーサイド新宿",
    rent: 165000,
    managementFee: 10000,
    address: "東京都新宿区西新宿3-3-3",
    access: "都営大江戸線 都庁前駅 徒歩3分",
    layout: "2LDK",
    area: 55.1,
    buildingAge: 2,
    tags: ["おすすめ"],
  },
];

export const Default: Story = {
  args: { properties },
};

export const TwoColumns: Story = {
  args: { properties, columns: 2 },
};

export const Loading: Story = {
  args: { properties: [], loading: true, loadingCount: 4 },
};

export const Empty: Story = {
  args: { properties: [] },
};
