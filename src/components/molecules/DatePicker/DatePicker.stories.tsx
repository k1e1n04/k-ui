import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Molecules/DatePicker",
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [value, setValue] = useState("2026-08-09");
    return <DatePicker value={value} onChange={setValue} clearable />;
  },
};
