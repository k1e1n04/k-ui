import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta = { title: "Molecules/Tabs", component: Tabs } satisfies Meta<
  typeof Tabs
>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [value, setValue] = useState("first");
    return (
      <Tabs
        value={value}
        onChange={setValue}
        items={[
          { value: "first", label: "一", content: "一つ目" },
          { value: "second", label: "二", content: "二つ目" },
        ]}
      />
    );
  },
};
