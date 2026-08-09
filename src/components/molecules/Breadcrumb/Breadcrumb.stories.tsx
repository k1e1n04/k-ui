import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  args: {
    items: [
      { label: "ホーム", href: "/" },
      { label: "設定", href: "/settings" },
      { label: "現在" },
    ],
    maxItems: 3,
  },
};
