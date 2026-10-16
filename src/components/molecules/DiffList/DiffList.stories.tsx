import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiffList } from "./DiffList";

const meta = {
  title: "Molecules/DiffList",
  component: DiffList,
} satisfies Meta<typeof DiffList>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      { id: "1", kind: "add", label: "星野温泉" },
      {
        id: "2",
        kind: "change",
        label: "夕食",
        before: "18:00",
        after: "19:00",
        reason: "到着が遅れるため",
      },
      { id: "3", kind: "remove", label: "旧軽井沢" },
    ],
  },
};
