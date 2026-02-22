import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppLayout } from "./AppLayout";

const drawerSections = [
  {
    title: "Main",
    items: [{ name: "Dashboard", path: "/dashboard" }],
  },
];

describe("AppLayout", () => {
  it("タイトルとメインコンテンツを表示する", () => {
    render(
      <AppLayout appTitle="K UI" drawerSections={drawerSections}>
        <div>Main content</div>
      </AppLayout>,
    );

    expect(screen.getByText("K UI")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "K UI" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("メニューボタンクリックでドロワーを開き、閉じるボタンで閉じる", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AppLayout appTitle="K UI" drawerSections={drawerSections}>
        <div>Main content</div>
      </AppLayout>,
    );

    expect(container.querySelector(".fixed.inset-0.bg-black\\/30")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(
      container.querySelector(".fixed.inset-0.bg-black\\/30"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(container.querySelector(".fixed.inset-0.bg-black\\/30")).toBeNull();
  });

  it("renderLink でタイトルリンクをカスタマイズできる", () => {
    const renderLink = vi.fn(({ href, children }) => (
      <a href={href} data-testid="custom-link">
        {children}
      </a>
    ));

    render(
      <AppLayout
        appTitle="K UI"
        drawerSections={drawerSections}
        renderLink={renderLink}
      >
        <div>Main content</div>
      </AppLayout>,
    );

    const links = screen.getAllByTestId("custom-link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/",
      "/dashboard",
    ]);
    expect(renderLink).toHaveBeenCalledWith(
      expect.objectContaining({ href: "/" }),
    );
  });
});
