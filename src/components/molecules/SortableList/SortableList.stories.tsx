import type { Meta, StoryObj } from "@storybook/react-vite";
import { SortableList } from "./SortableList";

const meta = {
  title: "Molecules/SortableList",
  component: SortableList,
} satisfies Meta<typeof SortableList>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      { id: "a", content: "川上庵で蕎麦" },
      { id: "b", content: "旧軽井沢を散歩" },
      { id: "c", content: "星野温泉" },
    ],
    onReorder: () => {},
  },
};
