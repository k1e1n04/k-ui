import type { Meta, StoryObj } from "@storybook/react";
import { MapControls } from "../../molecules/MapControls";
import { MapMarker } from "../../molecules/MapMarker";
import { MapView } from "../../molecules/MapView";
import { PropertyFilterPanel } from "../../molecules/PropertyFilterPanel";
import { PropertyList } from "../../molecules/PropertyList";
import { MapSearchLayout } from "./MapSearchLayout";

const meta = {
  title: "Templates/MapSearchLayout",
  component: MapSearchLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MapSearchLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const properties = [
  {
    id: "p1",
    title: "グランドメゾン渋谷",
    rent: 128000,
    address: "東京都渋谷区道玄坂1-1-1",
    layout: "1LDK",
    area: 40.2,
    buildingAge: 5,
  },
  {
    id: "p2",
    title: "パークサイド目黒",
    rent: 98000,
    address: "東京都目黒区中目黒2-2-2",
    layout: "1K",
    area: 28.5,
    buildingAge: 12,
  },
];

export const Default: Story = {
  args: {
    header: (
      <div className="border-b border-border bg-surface px-4 py-3 font-semibold text-foreground">
        賃貸物件検索
      </div>
    ),
    sidebar: (
      <div className="flex flex-col gap-4 p-4">
        <PropertyFilterPanel
          value={{
            rentMin: 0,
            rentMax: 150000,
            layouts: [],
            facilities: [],
            onlyAvailable: true,
          }}
          onChange={() => {}}
        />
        <PropertyList properties={properties} columns={1} />
      </div>
    ),
    map: (
      <MapView
        center={{ lat: 35.681236, lng: 139.767125 }}
        zoom={14}
        height={560}
      >
        <MapMarker
          position={{ lat: 35.681236, lng: 139.767125 }}
          label="12.8万円"
          selected
        />
        <MapMarker
          position={{ lat: 35.684, lng: 139.762 }}
          label="9.8万円"
          tone="primary"
        />
        <MapControls showReset onReset={() => {}} onLocate={() => {}} />
      </MapView>
    ),
  },
};
