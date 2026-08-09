import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./Timeline";

const meta = {
  title: "Molecules/Timeline",
  component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      {
        title: "申請を送信",
        timestamp: "10:00",
        content: "申請を受け付けました。",
      },
      {
        title: "確認中",
        timestamp: "10:30",
        content: "担当者が内容を確認しています。",
      },
      { title: "承認", timestamp: "11:00", content: "申請が承認されました。" },
    ],
  },
};

export const Alternate: StoryObj<typeof meta> = {
  args: {
    align: "alternate",
    items: [
      { title: "申請を送信", timestamp: "10:00" },
      { title: "確認中", timestamp: "10:30" },
      { title: "承認", timestamp: "11:00" },
    ],
  },
};
