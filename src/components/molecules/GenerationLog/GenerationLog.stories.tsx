import type { Meta, StoryObj } from "@storybook/react-vite";
import { GenerationLog } from "./GenerationLog";

const meta = {
  title: "Molecules/GenerationLog",
  component: GenerationLog,
} satisfies Meta<typeof GenerationLog>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      { id: "1", message: "川上庵の定休日を確認中…" },
      { id: "2", message: "営業時間を確認しました", status: "done" },
      { id: "3", message: "取得に失敗しました", status: "error" },
    ],
  },
};
