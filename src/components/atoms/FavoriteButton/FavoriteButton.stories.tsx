import type { Meta, StoryObj } from "@storybook/react";

import { FavoriteButton } from "./FavoriteButton";

const meta = {
  title: "Atoms/FavoriteButton",
  component: FavoriteButton,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { favorite: false, onChange: () => {}, label: "この物件" },
};

export const Favorited: Story = {
  args: { favorite: true, onChange: () => {}, label: "この物件" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <FavoriteButton favorite size="sm" onChange={() => {}} />
      <FavoriteButton favorite size="md" onChange={() => {}} />
      <FavoriteButton favorite size="lg" onChange={() => {}} />
    </div>
  ),
};
