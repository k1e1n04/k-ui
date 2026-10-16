import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeatherBadge } from "./WeatherBadge";

const meta = {
  title: "Atoms/WeatherBadge",
  component: WeatherBadge,
} satisfies Meta<typeof WeatherBadge>;

export default meta;

export const Sunny: StoryObj<typeof meta> = {
  args: { condition: "sunny", temperature: 24 },
};

export const Rainy: StoryObj<typeof meta> = {
  args: { condition: "rainy", temperature: 18 },
};
