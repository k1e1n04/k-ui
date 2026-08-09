import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu } from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("矢印キーでメニュー項目のフォーカスを移動して選択する", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu
        trigger={<button type="button">操作</button>}
        items={[
          { label: "編集", value: "edit" },
          { label: "削除", value: "delete" },
        ]}
        onSelect={onSelect}
      />,
    );
    await user.click(screen.getByRole("button", { name: "操作" }));
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith("delete");
  });

  it("初期フォーカスと Home/End で無効項目を飛ばす", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        trigger={<button type="button">操作</button>}
        items={[
          { label: "無効", value: "disabled-first", disabled: true },
          { label: "編集", value: "edit" },
          { label: "無効", value: "disabled-last", disabled: true },
          { label: "削除", value: "delete" },
        ]}
      />,
    );
    await user.click(screen.getByRole("button", { name: "操作" }));
    const edit = screen.getByRole("menuitem", { name: "編集" });
    const remove = screen.getByRole("menuitem", { name: "削除" });
    expect(edit).toHaveAttribute("tabindex", "0");
    await user.keyboard("{End}");
    expect(remove).toHaveFocus();
    await user.keyboard("{Home}");
    expect(edit).toHaveFocus();
  });
});
