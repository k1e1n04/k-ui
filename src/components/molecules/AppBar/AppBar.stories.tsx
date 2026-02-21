import type { Meta, StoryObj } from "@storybook/react";

import { AppBar } from "./AppBar";

const meta = {
  title: "Molecules/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["fixed", "static", "absolute", "relative", "sticky"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "transparent"],
    },
  },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    position: "static",
    children: (
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">App Title</h1>
        <button className="p-2 rounded-full hover:bg-white/10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    ),
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    position: "static",
    children: (
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">App Title</h1>
      </div>
    ),
  },
};

export const Transparent: Story = {
  args: {
    color: "transparent",
    position: "static",
    children: (
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold text-gray-900">App Title</h1>
      </div>
    ),
  },
};
