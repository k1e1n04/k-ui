import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("名前付きダイアログとして表示され Escape で閉じる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="詳細">
        内容
      </Drawer>,
    );
    expect(screen.getByRole("dialog", { name: "詳細" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("開いている間は背景を inert にし、上下配置では縦方向にレイアウトする", () => {
    const { container } = render(
      <>
        <button type="button">背景の操作</button>
        <Drawer open onClose={vi.fn()} placement="top" title="詳細">
          内容
        </Drawer>
      </>,
    );

    expect(container).toHaveAttribute("inert");
    expect(screen.getByRole("dialog", { name: "詳細" })).toHaveClass(
      "flex-col",
    );
  });

  it("重なったドロワーの最後が閉じるまで背景の inert を維持する", () => {
    const { container, rerender } = render(
      <>
        <button type="button">背景の操作</button>
        <Drawer open onClose={vi.fn()} title="下層">
          下層
        </Drawer>
        <Drawer open onClose={vi.fn()} title="上層">
          上層
        </Drawer>
      </>,
    );
    expect(container).toHaveAttribute("inert");

    rerender(
      <>
        <button type="button">背景の操作</button>
        <Drawer open={false} onClose={vi.fn()} title="下層">
          下層
        </Drawer>
        <Drawer open onClose={vi.fn()} title="上層">
          上層
        </Drawer>
      </>,
    );
    expect(container).toHaveAttribute("inert");

    rerender(
      <>
        <button type="button">背景の操作</button>
        <Drawer open={false} onClose={vi.fn()} title="下層">
          下層
        </Drawer>
        <Drawer open={false} onClose={vi.fn()} title="上層">
          上層
        </Drawer>
      </>,
    );
    expect(container).not.toHaveAttribute("inert");
    expect(container).not.toHaveAttribute("aria-hidden");
  });
});
