"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { ToastProvider, useToast } from "./ToastProvider";

const Trigger = () => {
  const toast = useToast();
  return <Button onClick={() => toast.success("Saved")}>Show toast</Button>;
};
const meta = {
  title: "Molecules/ToastProvider",
  component: ToastProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};

const UndoTrigger = () => {
  const toast = useToast();
  return (
    <Button onClick={() => toast.undo("並べ替えました", () => {})}>
      元に戻す例
    </Button>
  );
};

export const Undo: Story = {
  render: () => (
    <ToastProvider undoDuration={8000}>
      <UndoTrigger />
    </ToastProvider>
  ),
};
