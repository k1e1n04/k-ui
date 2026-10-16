import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActivityFeed } from "./ActivityFeed";

const meta = {
  title: "Molecules/ActivityFeed",
  component: ActivityFeed,
} satisfies Meta<typeof ActivityFeed>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      { id: "1", userName: "A", text: "候補を2件追加しました", time: "昨日" },
      { id: "2", userName: "B", text: "楽しみ!を押しました" },
    ],
  },
};
