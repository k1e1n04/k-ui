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
