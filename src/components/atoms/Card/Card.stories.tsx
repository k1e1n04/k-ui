import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md"],
    },
    border: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Card",
  },
};

export const PaddingNone: Story = {
  args: {
    children: "No padding",
    padding: "none",
  },
};

export const PaddingSm: Story = {
  args: {
    children: "Small padding",
    padding: "sm",
  },
};

export const PaddingLg: Story = {
  args: {
    children: "Large padding",
    padding: "lg",
  },
};

export const ShadowNone: Story = {
  args: {
    children: "No shadow",
    shadow: "none",
  },
};

export const ShadowSm: Story = {
  args: {
    children: "Small shadow",
    shadow: "sm",
  },
};

export const WithBorder: Story = {
  args: {
    children: "With border",
    border: true,
  },
};

export const Combined: Story = {
  args: {
    children: "Large padding, small shadow, with border",
    padding: "lg",
    shadow: "sm",
    border: true,
  },
};

export const RichContent: Story = {
  args: {
    padding: "md",
    shadow: "md",
  },
  render: (args) => (
    <Card {...args}>
      <h2 className="text-xl font-bold mb-4">Card with Rich Content</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        This is an example of a Card with more complex content.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </Card>
  ),
};
