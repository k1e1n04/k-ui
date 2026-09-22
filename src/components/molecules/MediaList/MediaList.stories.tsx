import type { Meta, StoryObj } from "@storybook/react";

import { Price } from "../../atoms/Price";
import { MediaList } from "./MediaList";

const meta = {
  title: "Molecules/MediaList",
  component: MediaList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    columns: { control: "select", options: [1, 2, 3] },
  },
} satisfies Meta<typeof MediaList>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    id: "p1",
    title: "グランドメゾン渋谷",
    subtitle: "東京都渋谷区道玄坂1-1-1",
    description: "JR山手線 渋谷駅 徒歩5分",
    highlight: <Price value={128000} tone="primary" />,
    meta: [
      { label: "間取り", value: "1LDK" },
      { label: "専有面積", value: "40.2㎡" },
    ],
    tags: [{ label: "新着" }],
  },
  {
    id: "p2",
    title: "パークサイド目黒",
    subtitle: "東京都目黒区中目黒2-2-2",
    description: "東急東横線 中目黒駅 徒歩8分",
    highlight: <Price value={98000} tone="primary" />,
    meta: [
      { label: "間取り", value: "1K" },
      { label: "専有面積", value: "28.5㎡" },
    ],
  },
  {
    id: "p3",
    title: "リバーサイド新宿",
    subtitle: "東京都新宿区西新宿3-3-3",
    description: "都営大江戸線 都庁前駅 徒歩3分",
    highlight: <Price value={165000} tone="primary" />,
    meta: [
      { label: "間取り", value: "2LDK" },
      { label: "専有面積", value: "55.1㎡" },
    ],
    tags: [{ label: "おすすめ" }],
  },
];

export const Default: Story = {
  args: { items },
};

export const TwoColumns: Story = {
  args: { items, columns: 2 },
};

export const Loading: Story = {
  args: { items: [], loading: true, loadingCount: 4 },
};

export const Empty: Story = {
  args: { items: [] },
};
