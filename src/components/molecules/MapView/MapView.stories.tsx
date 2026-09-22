import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { GSI_STANDARD_TILE_URL } from "../../../utils/tiles";
import { MapControls } from "../MapControls";
import { MapMarker } from "../MapMarker";
import { DEFAULT_MAP_CENTER, MapView } from "./MapView";

const meta = {
  title: "Molecules/MapView",
  component: MapView,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MapView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { center: DEFAULT_MAP_CENTER, zoom: 14, height: 420 },
};

export const WithMarkers: Story = {
  args: { center: DEFAULT_MAP_CENTER, zoom: 14, height: 420 },
  render: (args) => (
    <MapView {...args}>
      <MapMarker
        position={{ lat: 35.681236, lng: 139.767125 }}
        label="8.5万円"
      />
      <MapMarker
        position={{ lat: 35.684, lng: 139.762 }}
        label="12万円"
        tone="primary"
      />
      <MapMarker
        position={{ lat: 35.679, lng: 139.772 }}
        label="9.2万円"
        tone="success"
        selected
      />
      <MapControls showReset onReset={() => {}} />
    </MapView>
  ),
};

export const TapToAddMarker: Story = {
  args: { defaultCenter: DEFAULT_MAP_CENTER, defaultZoom: 14, height: 420 },
  render: function TapToAddMarker() {
    const [points, setPoints] = useState<
      { id: number; lat: number; lng: number }[]
    >([{ id: 0, ...DEFAULT_MAP_CENTER }]);
    return (
      <MapView
        defaultCenter={DEFAULT_MAP_CENTER}
        defaultZoom={14}
        height={420}
        onTap={(latlng) =>
          setPoints((prev) => [
            ...prev,
            { id: prev.length, lat: latlng.lat, lng: latlng.lng },
          ])
        }
      >
        {points.map((point, index) => (
          <MapMarker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            label={`ピン${index + 1}`}
          />
        ))}
      </MapView>
    );
  },
};

export const GridBackground: Story = {
  args: {
    center: DEFAULT_MAP_CENTER,
    zoom: 14,
    height: 420,
    tileUrl: null,
  },
};

export const StandardTiles: Story = {
  args: {
    center: DEFAULT_MAP_CENTER,
    zoom: 14,
    height: 420,
    tileUrl: GSI_STANDARD_TILE_URL,
  },
};

export const CustomTileSource: Story = {
  args: {
    center: DEFAULT_MAP_CENTER,
    zoom: 14,
    height: 420,
    tileUrl: (x, y, z) => `https://tile.openstreetmap.org/${z}/${x}/${y}.png`,
    attribution: "© OpenStreetMap contributors",
  },
};
