import type { Meta, StoryObj } from "@storybook/react";

import { MapView } from "../MapView";
import { MapControls } from "./MapControls";

const meta = {
  title: "Molecules/MapControls",
  component: MapControls,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MapControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standalone: Story = {
  args: {
    onZoomIn: () => {},
    onZoomOut: () => {},
    showReset: true,
    onReset: () => {},
    onLocate: () => {},
  },
};

export const InsideMap: Story = {
  args: {},
  render: () => (
    <MapView
      center={{ lat: 35.681236, lng: 139.767125 }}
      zoom={14}
      height={360}
    >
      <MapControls showReset onReset={() => {}} onLocate={() => {}} />
    </MapView>
  ),
};
