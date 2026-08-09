import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("トリガーで開閉し、Escape と外側クリックで閉じる", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">前の要素</button>
        <Popover trigger={<button type="button">開く</button>}>内容</Popover>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "開く" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("内容");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("閉じるとトリガーへフォーカスを戻す", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover
        trigger={<button type="button">開く</button>}
        onOpenChange={onOpenChange}
      >
        内容
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "開く" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});
