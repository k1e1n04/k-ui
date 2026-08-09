import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Popconfirm } from "./Popconfirm";

describe("Popconfirm", () => {
  it("確認時のみ onConfirm を呼ぶ", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <Popconfirm title="削除しますか？" onConfirm={onConfirm}>
        <button type="button">削除</button>
      </Popconfirm>,
    );
    await user.click(screen.getByRole("button", { name: "削除" }));
    await user.click(screen.getByRole("button", { name: "確認" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
