import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popconfirm } from "./Popconfirm";

const meta = {
  title: "Molecules/Popconfirm",
  component: Popconfirm,
} satisfies Meta<typeof Popconfirm>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  args: {
    title: "削除しますか？",
    onConfirm: () => undefined,
    children: <button type="button">削除</button>,
  },
};
