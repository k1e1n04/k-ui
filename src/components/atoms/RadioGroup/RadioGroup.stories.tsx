"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("one");
    return (
      <RadioGroup
        label="Plan"
        options={[
          { label: "One", value: "one" },
          { label: "Two", value: "two" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
