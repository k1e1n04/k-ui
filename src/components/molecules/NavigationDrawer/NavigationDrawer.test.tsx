import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NavigationDrawer } from "./NavigationDrawer";

const sections = [
  {
    title: "General",
    items: [
      { name: "Home", path: "/" },
      { name: "Settings", path: "/settings" },
    ],
  },
];

describe("NavigationDrawer", () => {
  it("セクションとアイテムが表示される", () => {
    render(<NavigationDrawer open onClose={vi.fn()} sections={sections} />);
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("閉じているときはリンクをアクセシビリティツリーとタブ順から除外する", () => {
    render(
      <NavigationDrawer open={false} onClose={vi.fn()} sections={sections} />,
    );

    expect(screen.queryByRole("link", { name: "Home" })).toBeNull();
    expect(screen.getByText("Home").closest("div.fixed")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByText("Home").closest("div.fixed")).toHaveAttribute(
      "inert",
    );
  });

  it("開いているときは名前付きモーダルダイアログとして公開する", () => {
    render(<NavigationDrawer open onClose={vi.fn()} sections={sections} />);

    expect(
      screen.getByRole("dialog", { name: "Navigation menu" }),
    ).toHaveAttribute("aria-modal", "true");
  });

  it("オーバーレイと閉じるボタンで onClose が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <NavigationDrawer open onClose={onClose} sections={sections} />,
    );

    const overlay = container.querySelector(".fixed.inset-0");
    expect(overlay).toBeInTheDocument();
    if (overlay) {
      await user.click(overlay);
    }
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("リンククリックでも onClose が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NavigationDrawer open onClose={onClose} sections={sections} />);

    await user.click(screen.getByRole("link", { name: "Settings" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Escape キーで onClose が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NavigationDrawer open onClose={onClose} sections={sections} />);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Tab キーでドロワー内のフォーカスを循環させる", async () => {
    const user = userEvent.setup();
    render(<NavigationDrawer open onClose={vi.fn()} sections={sections} />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Settings" })).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it("閉じたときに開く前の要素へフォーカスを戻す", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <>
        <button type="button">メニューを開く</button>
        <NavigationDrawer open={false} onClose={onClose} sections={sections} />
      </>,
    );
    const trigger = screen.getByRole("button", { name: "メニューを開く" });
    trigger.focus();

    rerender(
      <>
        <button type="button">メニューを開く</button>
        <NavigationDrawer open onClose={onClose} sections={sections} />
      </>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();

    rerender(
      <>
        <button type="button">メニューを開く</button>
        <NavigationDrawer open={false} onClose={onClose} sections={sections} />
      </>,
    );
    expect(trigger).toHaveFocus();
  });

  it("ドロワーとオーバーレイを専用の z-index トークンで表示する", () => {
    const { container } = render(
      <NavigationDrawer open onClose={vi.fn()} sections={sections} />,
    );

    expect(container.querySelector(".fixed.inset-0")).toHaveClass(
      "z-[var(--kui-z-drawer)]",
    );
    expect(container.querySelector(".fixed.top-0.right-0")).toHaveClass(
      "z-[var(--kui-z-overlay)]",
    );
  });

  it("開いたドロワーの閉じるボタンをクリックできる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NavigationDrawer open onClose={onClose} sections={sections} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("onLogout がある場合ログアウトボタンが表示される", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    render(
      <NavigationDrawer
        open
        onClose={vi.fn()}
        sections={sections}
        onLogout={onLogout}
        logoutLabel="Sign out"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Sign out" }));
    expect(onLogout).toHaveBeenCalledOnce();
  });
});
