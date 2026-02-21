import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../../atoms/Button";
import { Dialog } from "./Dialog";

const meta = {
  title: "Molecules/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Dialog Title",
    children: <p className="text-gray-700 dark:text-gray-300">Dialog content goes here.</p>,
  },
};

export const WithoutTitle: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: <p className="text-gray-700 dark:text-gray-300">Content without title.</p>,
  },
};

export const Large: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Large Dialog",
    maxWidth: "lg",
    children: <p className="text-gray-700 dark:text-gray-300">This is a large dialog.</p>,
  },
};

/** インタラクティブな開閉デモ */
export const Interactive: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: "Interactive Dialog",
    children: null,
  },
  render: function InteractiveDialog() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Interactive Dialog">
          <p className="text-gray-700 dark:text-gray-300">
            Press ESC or click outside to close.
          </p>
        </Dialog>
      </>
    );
  },
};
