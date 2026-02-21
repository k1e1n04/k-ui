import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { MonthSelector } from "./MonthSelector";

const meta = {
  title: "Molecules/MonthSelector",
  component: MonthSelector,
  tags: ["autodocs"],
} satisfies Meta<typeof MonthSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedMonth: "2026-02",
    onMonthChange: () => {},
  },
};

export const WithJapaneseFormat: Story = {
  args: {
    selectedMonth: "2026-02",
    onMonthChange: () => {},
    formatLabel: (year: number, month: number) => `${year}年${month}月`,
  },
};

export const Interactive: Story = {
  args: {
    selectedMonth: "2026-02",
    onMonthChange: () => {},
  },
  render: function InteractiveMonthSelector() {
    const [month, setMonth] = useState("2026-02");
    return <MonthSelector selectedMonth={month} onMonthChange={setMonth} />;
  },
};
