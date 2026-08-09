import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Drawer } from "./Drawer";

const meta = { title: "Molecules/Drawer", component: Drawer } satisfies Meta<
  typeof Drawer
>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          開く
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="詳細">
          コンテンツ
        </Drawer>
      </>
    );
  },
};
