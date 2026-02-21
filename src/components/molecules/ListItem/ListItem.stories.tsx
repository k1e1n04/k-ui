import type { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "./ListItem";

const meta = {
  title: "Molecules/ListItem",
  component: ListItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>List item content</span>,
  },
};

export const WithoutHover: Story = {
  args: {
    children: <span>Non-hoverable item</span>,
    hoverable: false,
  },
};

export const WithoutBorder: Story = {
  args: {
    children: <span>Borderless item</span>,
    bordered: false,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-2">
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </div>
  ),
};
