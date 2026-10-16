import type { Meta, StoryObj } from "@storybook/react-vite";
import { FloatingActionButton } from "./FloatingActionButton";

const meta = {
  title: "Atoms/FloatingActionButton",
  component: FloatingActionButton,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FloatingActionButton>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { label: "AIと計画する" },
};

export const Extended: StoryObj<typeof meta> = {
  args: {
    label: "AIと計画する",
    extended: true,
    children: "AIと計画する",
  },
};
