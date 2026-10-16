import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReactionButton } from "./ReactionButton";

const meta = {
  title: "Molecules/ReactionButton",
  component: ReactionButton,
} satisfies Meta<typeof ReactionButton>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { label: "楽しみ!", count: 1 },
};

export const WithAvatars: StoryObj<typeof meta> = {
  args: {
    label: "楽しみ!",
    count: 2,
    active: true,
    avatars: [{ name: "A" }, { name: "B" }],
  },
};
