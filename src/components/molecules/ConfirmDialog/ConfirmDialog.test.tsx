import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("タイトル、メッセージ、description を表示する", () => {
    render(
      <ConfirmDialog
        open
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete item"
        message="Are you sure?"
        description="This cannot be undone."
      />,
    );

    expect(screen.getByText("Delete item")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("キャンセルと確認のクリックでコールバックが呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        onClose={onClose}
        onConfirm={onConfirm}
        title="Delete item"
        message="Are you sure?"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onClose).toHaveBeenCalledOnce();
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("isProcessing=true のときボタンが disabled になり processingLabel を表示する", () => {
    render(
      <ConfirmDialog
        open
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete item"
        message="Are you sure?"
        isProcessing
        processingLabel="Deleting..."
      />,
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Deleting..." })).toBeDisabled();
  });
});
