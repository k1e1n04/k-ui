"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "./AvatarGroup";

const meta = {
  title: "Molecules/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { avatars: [{ name: "Jane Doe" }, { name: "John Smith" }] },
};
