"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "./Slider";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    return (
      <Slider
        label="Volume"
        value={value}
        onChange={(next) => setValue(next as number)}
      />
    );
  },
};
