"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { variant: "success", message: "Saved" },
};
