import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SearchInput } from "./SearchInput";

const sampleItems = ["Milk", "Eggs", "Bread", "Apples", "Coffee"];

const meta = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    "aria-label": "Search items",
    placeholder: "Search...",
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
  },
};

export const WithValue: Story = {
  args: {
    value: "milk",
  },
};

export const Disabled: Story = {
  args: {
    value: "disabled query",
    disabled: true,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <SearchInput {...args} value={value} onChange={setValue} />;
  },
};

export const ListSearchExample: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const query = value.toLowerCase();
    const filtered = sampleItems.filter((item) =>
      item.toLowerCase().includes(query),
    );

    return (
      <div className="max-w-sm space-y-3">
        <SearchInput
          {...args}
          value={value}
          onChange={setValue}
          onClear={() => setValue("")}
          placeholder="Search grocery items"
          aria-label="Search grocery items"
        />
        <ul className="rounded-md border border-gray-200 dark:border-gray-700">
          {filtered.map((item) => (
            <li
              key={item}
              className="border-b border-gray-200 px-3 py-2 text-sm last:border-b-0 dark:border-gray-700"
            >
              {item}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-500">
              No matching items
            </li>
          )}
        </ul>
      </div>
    );
  },
};
