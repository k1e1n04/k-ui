import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu } from "./DropdownMenu";

const meta = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  args: {
    trigger: <button type="button">操作</button>,
    items: [
      { label: "編集", value: "edit" },
      { label: "削除", value: "delete" },
    ],
  },
};
