import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("open=false のとき表示されない", () => {
    render(
      <Dialog open={false} onClose={vi.fn()}>
        Hidden
      </Dialog>,
    );
    expect(screen.queryByText("Hidden")).toBeNull();
  });

  it("open=true のとき title と children が表示される", () => {
    render(
      <Dialog open onClose={vi.fn()} title="Dialog title">
        Dialog body
      </Dialog>,
    );
    expect(screen.getByText("Dialog title")).toBeInTheDocument();
    expect(screen.getByText("Dialog body")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("閉じるボタンで onClose が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose}>
        Dialog body
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("背景クリックで onClose が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Dialog open onClose={onClose}>
        Dialog body
      </Dialog>,
    );

    const backdrop = container.querySelector(".fixed.inset-0");
    expect(backdrop).toBeInTheDocument();
    if (backdrop) {
      await user.click(backdrop);
    }

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("disableOutsideClick=true のとき背景クリックで閉じない", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Dialog open onClose={onClose} disableOutsideClick>
        Dialog body
      </Dialog>,
    );

    const backdrop = container.querySelector(".fixed.inset-0");
    expect(backdrop).toBeInTheDocument();
    if (backdrop) {
      await user.click(backdrop);
    }

    expect(onClose).not.toHaveBeenCalled();
  });

  it("Escape キーで onClose が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose}>
        Dialog body
      </Dialog>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("open=true のとき body overflow を hidden にする", () => {
    render(
      <Dialog open onClose={vi.fn()}>
        Dialog body
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });
});
