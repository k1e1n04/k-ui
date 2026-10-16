import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../atoms/Card";
import { Carousel } from "./Carousel";

const meta = {
  title: "Molecules/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      {
        id: "a",
        content: <Card>一案目</Card>,
      },
      {
        id: "b",
        content: <Card>二案目</Card>,
      },
      {
        id: "c",
        content: <Card>三案目</Card>,
      },
    ],
  },
};
