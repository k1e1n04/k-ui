import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../atoms/Button";
import { StickyActionBar } from "./StickyActionBar";

const meta = {
  title: "Molecules/StickyActionBar",
  component: StickyActionBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StickyActionBar>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <Button fullWidth>この条件で作る</Button>,
  },
};
