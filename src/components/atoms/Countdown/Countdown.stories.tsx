import type { Meta, StoryObj } from "@storybook/react-vite";
import { Countdown } from "./Countdown";

const meta = {
  title: "Atoms/Countdown",
  component: Countdown,
} satisfies Meta<typeof Countdown>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    targetDate: "2026-10-23",
    now: new Date("2026-10-11T00:00:00Z"),
    label: "出発まで",
  },
};

export const Today: StoryObj<typeof meta> = {
  args: {
    targetDate: "2026-10-23",
    now: new Date("2026-10-23T03:00:00+09:00"),
    label: "出発まで",
    size: "lg",
  },
};
