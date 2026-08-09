import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Calendar } from "./Calendar";

const meta = {
  title: "Molecules/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [value, setValue] = useState("2026-08-09");
    return <Calendar value={value} onChange={setValue} />;
  },
};
