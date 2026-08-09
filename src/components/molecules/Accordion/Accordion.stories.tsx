import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta = {
  title: "Molecules/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      {
        value: "profile",
        title: "プロフィール",
        content: "プロフィールに関する設定です。",
      },
      {
        value: "notifications",
        title: "通知",
        content: "通知に関する設定です。",
      },
      {
        value: "security",
        title: "セキュリティ",
        content: "セキュリティに関する設定です。",
      },
    ],
    defaultValue: "profile",
  },
};

export const Multiple: StoryObj<typeof meta> = {
  args: {
    type: "multiple",
    items: [
      {
        value: "profile",
        title: "プロフィール",
        content: "プロフィールに関する設定です。",
      },
      {
        value: "notifications",
        title: "通知",
        content: "通知に関する設定です。",
      },
      {
        value: "security",
        title: "セキュリティ",
        content: "セキュリティに関する設定です。",
      },
    ],
    defaultValue: ["profile", "notifications"],
  },
};
