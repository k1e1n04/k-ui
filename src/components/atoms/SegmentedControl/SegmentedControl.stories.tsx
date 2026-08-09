"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Atoms/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("day");
    return (
      <SegmentedControl
        options={[
          { label: "Day", value: "day" },
          { label: "Week", value: "week" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
