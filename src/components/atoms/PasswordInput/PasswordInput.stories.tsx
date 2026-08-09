"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";

const meta = {
  title: "Atoms/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <PasswordInput value={value} onChange={setValue} label="Password" />;
  },
};
