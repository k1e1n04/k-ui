import type { Meta, StoryObj } from "@storybook/react";

import { PropertyCard } from "./PropertyCard";

const meta = {
  title: "Molecules/PropertyCard",
  component: PropertyCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PropertyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "p1",
    title: "グランドメゾン渋谷",
    rent: 128000,
    managementFee: 8000,
    deposit: 128000,
    keyMoney: 128000,
    address: "東京都渋谷区道玄坂1-1-1",
    access: "JR山手線 渋谷駅 徒歩5分",
    layout: "1LDK",
    area: 40.2,
    buildingAge: 5,
    floor: "3階 / 10階建",
    tags: ["新着"],
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    imageUrl:
      "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23d1d5db'/%3E%3Ctext x='200' y='150' font-size='24' text-anchor='middle' fill='%236b7280'%3E物件写真%3C/text%3E%3C/svg%3E",
  },
};

export const FavoriteAndCompare: Story = {
  args: {
    ...Default.args,
    favorite: true,
    onFavoriteChange: () => {},
    compared: true,
    onCompareChange: () => {},
    onClick: () => {},
  },
};

export const NotAvailable: Story = {
  args: {
    ...Default.args,
    available: false,
    tags: [],
  },
};
