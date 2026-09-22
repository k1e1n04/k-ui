import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../../atoms/Button";
import { BottomSheet } from "./BottomSheet";

const meta = {
  title: "Molecules/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: true, children: null, title: "検索結果" },
  render: function DefaultBottomSheet() {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen bg-surface-raised p-4">
        <Button onClick={() => setOpen(true)}>シートを開く</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="検索結果"
          snapPoints={[0.35, 0.9]}
        >
          <p className="text-foreground">
            ハンドルをドラッグ、または矢印キーで高さを変更できます。
          </p>
        </BottomSheet>
      </div>
    );
  },
};

export const WithBackdrop: Story = {
  args: { open: true, children: null, showBackdrop: true },
  render: function BackdropBottomSheet() {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen bg-surface-raised p-4">
        <Button onClick={() => setOpen(true)}>シートを開く</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          showBackdrop
          title="絞り込み"
        >
          <p className="text-foreground">背景をクリックすると閉じます。</p>
        </BottomSheet>
      </div>
    );
  },
};
