import type { Meta, StoryObj } from "@storybook/react";

import { AppLayout } from "./AppLayout";

const meta = {
  title: "Templates/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Settings", path: "/settings" },
    ],
  },
  {
    title: "Features",
    items: [
      { name: "Shopping", path: "/shopping" },
      { name: "Expenses", path: "/expenses" },
    ],
  },
];

export const Default: Story = {
  args: {
    appTitle: "My App",
    drawerSections: sampleSections,
    onLogout: () => alert("Logout"),
    children: (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This is the main content area.
        </p>
      </div>
    ),
  },
};

export const WithTitleSuffix: Story = {
  args: {
    appTitle: "My App",
    drawerSections: sampleSections,
    titleSuffix: (
      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">STG</span>
    ),
    children: (
      <div className="p-4">
        <p>Content with environment label</p>
      </div>
    ),
  },
};
