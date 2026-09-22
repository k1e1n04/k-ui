import type { Meta, StoryObj } from "@storybook/react";

import { MapView } from "../MapView";
import { MapMarker } from "./MapMarker";

const meta = {
  title: "Molecules/MapMarker",
  component: MapMarker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MapMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

const center = { lat: 35.681236, lng: 139.767125 };

export const Default: Story = {
  args: { position: center, label: "8.5万円" },
  render: (args) => (
    <MapView center={center} zoom={14} height={360}>
      <MapMarker {...args} />
    </MapView>
  ),
};

export const Selected: Story = {
  args: { position: center, label: "12万円", selected: true },
  render: (args) => (
    <MapView center={center} zoom={14} height={360}>
      <MapMarker {...args} />
    </MapView>
  ),
};

export const CustomContent: Story = {
  args: { position: center, ariaLabel: "カスタムマーカー" },
  render: (args) => (
    <MapView center={center} zoom={14} height={360}>
      <MapMarker {...args}>
        <span className="rounded-full bg-danger-main px-3 py-1 text-xs font-semibold text-inverse shadow-md">
          カスタム
        </span>
      </MapMarker>
    </MapView>
  ),
};
