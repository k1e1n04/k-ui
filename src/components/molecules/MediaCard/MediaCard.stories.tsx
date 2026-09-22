import type { Meta, StoryObj } from "@storybook/react";

import { Price } from "../../atoms/Price";
import { MediaCard } from "./MediaCard";

const meta = {
  title: "Molecules/MediaCard",
  component: MediaCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProps = {
  id: "p1",
  title: "グランドメゾン渋谷",
  subtitle: "東京都渋谷区道玄坂1-1-1",
  description: "JR山手線 渋谷駅 徒歩5分",
  highlight: <Price value={128000} size="lg" tone="primary" unit="/月" />,
  highlightCaption: "管理費 8,000円",
  meta: [
    { label: "間取り", value: "1LDK" },
    { label: "専有面積", value: "40.2㎡" },
    { label: "築年数", value: "築5年" },
  ],
  tags: [{ label: "新着" }],
  notes: ["敷金 12.8万円", "礼金 12.8万円"],
};

export const Default: Story = {
  args: baseProps,
};

export const WithImage: Story = {
  args: {
    ...baseProps,
    imageUrl:
      "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23d1d5db'/%3E%3Ctext x='200' y='150' font-size='24' text-anchor='middle' fill='%236b7280'%3Eメディア%3C/text%3E%3C/svg%3E",
  },
};

export const FavoriteAndSelectable: Story = {
  args: {
    ...baseProps,
    favorite: true,
    favoriteLabel: "お気に入り",
    onFavoriteChange: () => {},
    selectable: true,
    selected: true,
    selectLabel: "比較",
    onSelectedChange: () => {},
    onClick: () => {},
  },
};

export const Unavailable: Story = {
  args: {
    ...baseProps,
    tags: [],
    status: { label: "募集終了" },
  },
};
