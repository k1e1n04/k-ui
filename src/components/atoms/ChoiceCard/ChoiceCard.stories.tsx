import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChoiceCard } from "./ChoiceCard";

const meta = {
  title: "Atoms/ChoiceCard",
  component: ChoiceCard,
} satisfies Meta<typeof ChoiceCard>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { value: "relaxed", title: "のんびり過ごす" },
};

export const Selected: StoryObj<typeof meta> = {
  args: {
    value: "active",
    title: "たくさん歩く",
    description: "1日3万歩",
    selected: true,
  },
};
