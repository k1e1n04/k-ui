import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../../atoms/Button";
import { NavigationDrawer } from "./NavigationDrawer";

const meta = {
  title: "Molecules/NavigationDrawer",
  component: NavigationDrawer,
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationDrawer>;

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
    open: true,
    onClose: () => {},
    sections: sampleSections,
    onLogout: () => {},
  },
};

export const Interactive: Story = {
  args: {
    open: false,
    onClose: () => {},
    sections: sampleSections,
  },
  render: function InteractiveDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <NavigationDrawer
          open={open}
          onClose={() => setOpen(false)}
          sections={sampleSections}
          onLogout={() => alert("Logout")}
        />
      </>
    );
  },
};
