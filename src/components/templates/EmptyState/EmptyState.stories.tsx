import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../atoms/Button";
import { EmptyState } from "./EmptyState";

const CalendarIcon = () => (
  <svg
    className="h-10 w-10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v10.5A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V7.5A2.25 2.25 0 0 1 6 5.25Z"
    />
  </svg>
);

const meta = {
  title: "Templates/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No data available",
    description: "Add your first item to get started.",
  },
};

export const WithIconAndAction: Story = {
  args: {
    icon: <CalendarIcon />,
    title: "No trips found",
    description: "Create a trip and manage your travel schedule.",
    action: <Button variant="primary">Create trip</Button>,
  },
};

export const TitleOnly: Story = {
  args: {
    title: "No messages",
  },
};
