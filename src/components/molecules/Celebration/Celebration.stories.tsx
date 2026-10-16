import type { Meta, StoryObj } from "@storybook/react-vite";
import { Celebration } from "./Celebration";

const meta = {
  title: "Molecules/Celebration",
  component: Celebration,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Celebration>;

export default meta;

export const Confetti: StoryObj<typeof meta> = {
  args: { show: true, message: "決定しました" },
};

export const Stamp: StoryObj<typeof meta> = {
  args: { show: true, variant: "stamp", message: "準備100%" },
};
