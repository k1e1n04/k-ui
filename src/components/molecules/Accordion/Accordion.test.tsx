import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { value: "profile", title: "プロフィール", content: "プロフィールの内容" },
  { value: "settings", title: "設定", content: "設定の内容" },
  { value: "billing", title: "請求", content: "請求の内容", disabled: true },
];

describe("Accordion", () => {
  it("単一選択を非制御で開閉する", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultValue="profile" />);

    expect(screen.getByText("プロフィールの内容")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "設定" }));
    expect(screen.queryByText("プロフィールの内容")).toBeNull();
    expect(screen.getByText("設定の内容")).toBeInTheDocument();
  });

  it("複数選択の制御値を変更として通知する", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Accordion
        type="multiple"
        items={items}
        value={["profile"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "設定" }));
    expect(onValueChange).toHaveBeenCalledWith(["profile", "settings"]);
  });

  it("ARIA の関連付けと矢印キーによる見出し間の移動を提供する", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultValue="profile" />);
    const profile = screen.getByRole("button", { name: "プロフィール" });
    const settings = screen.getByRole("button", { name: "設定" });

    expect(profile).toHaveAttribute("aria-expanded", "true");
    expect(profile).toHaveAttribute("aria-controls");
    await user.click(profile);
    await user.keyboard("{ArrowDown}");
    expect(settings).toHaveFocus();
    await user.keyboard("{End}");
    expect(settings).toHaveFocus();
  });
});
