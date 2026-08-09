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

    const backdrop = container.querySelector("button.absolute.inset-0");
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

    const backdrop = container.querySelector("button.absolute.inset-0");
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

  it("Tab キーでダイアログ内のフォーカスを循環させる", async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onClose={vi.fn()}>
        <button type="button">実行</button>
      </Dialog>,
    );

    const closeButton = screen.getByRole("button", { name: "Close dialog" });
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "実行" })).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it("閉じたときに開く前の要素へフォーカスを戻す", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <>
        <button type="button">ダイアログを開く</button>
        <Dialog open={false} onClose={onClose}>
          Dialog body
        </Dialog>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "ダイアログを開く" });
    trigger.focus();

    rerender(
      <>
        <button type="button">ダイアログを開く</button>
        <Dialog open onClose={onClose}>
          Dialog body
        </Dialog>
      </>,
    );
    expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();

    rerender(
      <>
        <button type="button">ダイアログを開く</button>
        <Dialog open={false} onClose={onClose}>
          Dialog body
        </Dialog>
      </>,
    );
    expect(trigger).toHaveFocus();
  });

  it("操作要素がないダイアログではコンテナにフォーカスを保つ", async () => {
    const user = userEvent.setup();
    render(
      <Dialog open onClose={vi.fn()} hideCloseButton>
        操作できない説明
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("tabindex", "-1");
    expect(dialog).toHaveFocus();

    await user.tab();
    expect(dialog).toHaveFocus();
  });

  it("open=true のとき body overflow を hidden にする", () => {
    render(
      <Dialog open onClose={vi.fn()}>
        Dialog body
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("開く前の body overflow 値を最後のダイアログが閉じるまで保持する", () => {
    document.body.style.overflow = "scroll";
    const { rerender } = render(
      <>
        <Dialog open onClose={vi.fn()}>
          First dialog
        </Dialog>
        <Dialog open onClose={vi.fn()}>
          Second dialog
        </Dialog>
      </>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <>
        <Dialog open onClose={vi.fn()}>
          First dialog
        </Dialog>
        <Dialog open={false} onClose={vi.fn()}>
          Second dialog
        </Dialog>
      </>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <>
        <Dialog open={false} onClose={vi.fn()}>
          First dialog
        </Dialog>
        <Dialog open={false} onClose={vi.fn()}>
          Second dialog
        </Dialog>
      </>,
    );
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("単一のダイアログを閉じたときに任意の body overflow 値を復元する", () => {
    document.body.style.overflow = "clip";
    const { rerender } = render(
      <Dialog open onClose={vi.fn()}>
        Dialog body
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Dialog open={false} onClose={vi.fn()}>
        Dialog body
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe("clip");
  });

  it("タイトルをダイアログのアクセシブル名にする", () => {
    render(
      <Dialog open onClose={vi.fn()} title="設定">
        Dialog body
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "設定" })).toBeInTheDocument();
  });

  it("タイトルがないダイアログに既定のアクセシブル名を付与する", () => {
    render(
      <Dialog open onClose={vi.fn()}>
        Dialog body
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "Dialog" })).toBeInTheDocument();
  });
});
