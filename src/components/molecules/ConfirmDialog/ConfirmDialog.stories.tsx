import type { Meta, StoryObj } from "@storybook/react";

import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Molecules/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["danger", "warning", "info"],
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Delete item?",
    message: 'You are about to delete "Sample Item".',
    description: "This action cannot be undone.",
    variant: "danger",
    confirmLabel: "Delete",
  },
};

export const Warning: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Archive item?",
    message: "This item will be moved to archive.",
    variant: "warning",
    confirmLabel: "Archive",
  },
};

export const Info: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Mark as complete?",
    message: "This item will be marked as completed.",
    variant: "info",
    confirmLabel: "Complete",
  },
};

export const Processing: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Delete item?",
    message: 'Deleting "Sample Item"...',
    variant: "danger",
    isProcessing: true,
    processingLabel: "Deleting...",
    confirmLabel: "Delete",
  },
};
