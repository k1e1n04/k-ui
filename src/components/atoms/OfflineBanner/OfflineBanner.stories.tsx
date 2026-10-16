import type { Meta, StoryObj } from "@storybook/react-vite";
import { OfflineBanner } from "./OfflineBanner";

const meta = {
  title: "Atoms/OfflineBanner",
  component: OfflineBanner,
} satisfies Meta<typeof OfflineBanner>;

export default meta;

export const Offline: StoryObj<typeof meta> = {
  args: { offline: true },
};
