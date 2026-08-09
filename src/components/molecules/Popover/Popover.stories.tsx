import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./Popover";

const meta = { title: "Molecules/Popover", component: Popover } satisfies Meta<
  typeof Popover
>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  args: {
    trigger: <button type="button">開く</button>,
    children: "ポップオーバーの内容",
  },
};
