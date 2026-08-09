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
