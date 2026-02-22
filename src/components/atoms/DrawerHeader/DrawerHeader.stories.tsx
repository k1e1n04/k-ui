import type { Meta, StoryObj } from "@storybook/react";

import { DrawerHeader } from "./DrawerHeader";

const meta = {
  title: "Atoms/DrawerHeader",
  component: DrawerHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof DrawerHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    ),
  },
};
