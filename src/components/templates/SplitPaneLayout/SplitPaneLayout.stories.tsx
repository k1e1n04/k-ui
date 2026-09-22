import type { Meta, StoryObj } from "@storybook/react";

import { Price } from "../../atoms/Price";
import { FilterPanel } from "../../molecules/FilterPanel";
import { MapControls } from "../../molecules/MapControls";
import { MapMarker } from "../../molecules/MapMarker";
import { MapView } from "../../molecules/MapView";
import { MediaList } from "../../molecules/MediaList";
import { SplitPaneLayout } from "./SplitPaneLayout";

const meta = {
  title: "Templates/SplitPaneLayout",
  component: SplitPaneLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SplitPaneLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    id: "p1",
    title: "グランドメゾン渋谷",
    subtitle: "東京都渋谷区道玄坂1-1-1",
    highlight: <Price value={128000} tone="primary" />,
    meta: [
      { label: "間取り", value: "1LDK" },
      { label: "専有面積", value: "40.2㎡" },
    ],
  },
  {
    id: "p2",
    title: "パークサイド目黒",
    subtitle: "東京都目黒区中目黒2-2-2",
    highlight: <Price value={98000} tone="primary" />,
    meta: [
      { label: "間取り", value: "1K" },
      { label: "専有面積", value: "28.5㎡" },
    ],
  },
];

export const Default: Story = {
  args: {
    header: (
      <div className="border-b border-border bg-surface px-4 py-3 font-semibold text-foreground">
        検索
      </div>
    ),
    sidebar: (
      <div className="flex flex-col gap-4 p-4">
        <FilterPanel
          fields={[
            {
              type: "range",
              key: "rent",
              label: "賃料",
              min: 0,
              max: 300000,
              step: 5000,
              value: [0, 150000],
              formatValue: (value) => `${value / 10000}万円`,
            },
            {
              type: "toggle",
              key: "available",
              label: "募集中のみ",
              value: true,
            },
          ]}
          onChange={() => {}}
        />
        <MediaList items={items} columns={1} />
      </div>
    ),
    main: (
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
