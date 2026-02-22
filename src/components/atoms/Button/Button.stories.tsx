import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "outline",
        "ghost",
        "danger",
      ],
    },
    tone: {
      control: "select",
      options: ["solid", "plain", "subtle"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Success Button",
    variant: "success",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Info: Story = {
  args: {
    children: "Info Button",
    variant: "info",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "large",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const IconOnly: Story = {
  args: {
    children: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
    iconOnly: true,
    variant: "ghost",
  },
};

const IconPlus = (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

export const IconOnlySemanticTones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button
        iconOnly
        variant="success"
        tone="plain"
        aria-label="success plain"
      >
        {IconPlus}
      </Button>
      <Button
        iconOnly
        variant="success"
        tone="subtle"
        aria-label="success subtle"
      >
        {IconPlus}
      </Button>
      <Button iconOnly variant="info" tone="plain" aria-label="info plain">
        {IconPlus}
      </Button>
      <Button iconOnly variant="info" tone="subtle" aria-label="info subtle">
        {IconPlus}
      </Button>
      <Button iconOnly variant="danger" tone="plain" aria-label="danger plain">
        {IconPlus}
      </Button>
      <Button
        iconOnly
        variant="danger"
        tone="subtle"
        aria-label="danger subtle"
      >
        {IconPlus}
      </Button>
    </div>
  ),
};
