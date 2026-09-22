import type { Meta, StoryObj } from "@storybook/react";

import { MapPin } from "./MapPin";

const meta = {
  title: "Atoms/MapPin",
  component: MapPin,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "accent", "success", "danger", "muted"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof MapPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "8.5万円" },
};

export const Selected: Story = {
  args: { label: "12万円", tone: "accent", selected: true },
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <MapPin label="8.5万" tone="primary" />
      <MapPin label="9.2万" tone="accent" selected />
      <MapPin label="10万" tone="success" />
      <MapPin label="12万" tone="muted" />
    </div>
  ),
};
