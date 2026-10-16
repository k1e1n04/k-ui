import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyButton } from "./CopyButton";

const meta = {
  title: "Atoms/CopyButton",
  component: CopyButton,
} satisfies Meta<typeof CopyButton>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { value: "ABC-123" },
};
