import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  PropertyFilterPanel,
  type PropertyFilterValue,
} from "./PropertyFilterPanel";

const meta = {
  title: "Molecules/PropertyFilterPanel",
  component: PropertyFilterPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PropertyFilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const initial: PropertyFilterValue = {
  rentMin: 50000,
  rentMax: 150000,
  layouts: ["1LDK"],
  facilities: ["auto-lock"],
  onlyAvailable: true,
};

export const Default: Story = {
  args: { value: initial, onChange: () => {} },
  render: function DefaultFilterPanel() {
    const [value, setValue] = useState(initial);
    return (
      <div className="max-w-md">
        <PropertyFilterPanel
          value={value}
          onChange={setValue}
          onReset={() =>
            setValue({
              rentMin: 0,
              rentMax: 300000,
              layouts: [],
              facilities: [],
              onlyAvailable: false,
            })
          }
          onSubmit={() => {}}
        />
      </div>
    );
  },
};
