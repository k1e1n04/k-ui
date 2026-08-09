import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox } from "./Combobox";

const meta = {
  title: "Molecules/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [value, setValue] = useState<string | string[]>("");
    return (
      <Combobox
        value={value}
        onChange={setValue}
        options={[
          { label: "東京", value: "tokyo" },
          { label: "大阪", value: "osaka" },
        ]}
      />
    );
  },
};
