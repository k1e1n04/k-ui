import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

const meta = {
  title: "Atoms/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "info", "warning", "error"],
    },
    message: {
      control: "text",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "info",
    message: "This is a default alert.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    message: "Your operation was successful.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    message: "Here is some information for you.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    message: "This is a warning message.",
  },
};

export const ErrorVariant: Story = {
  args: {
    variant: "error",
    message: "An error has occurred.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <Alert variant="success" message="Your operation was successful." />
      <Alert variant="info" message="Here is some information for you." />
      <Alert variant="warning" message="This is a warning message." />
      <Alert variant="error" message="An error has occurred." />
    </div>
  ),
};
