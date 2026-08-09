import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("最大件数を超える中間項目をメニューに折りたたむ", async () => {
    const user = userEvent.setup();
    render(
      <Breadcrumb
        maxItems={3}
        items={[
          { label: "ホーム", href: "/" },
          { label: "部門", href: "/dept" },
          { label: "チーム", href: "/team" },
          { label: "現在" },
        ]}
      />,
    );
    expect(screen.queryByRole("link", { name: "部門" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "省略したパンくず" }));
    expect(screen.getByRole("menuitem", { name: "部門" })).toBeInTheDocument();
  });

  it("折りたたんだリンクにも renderLink を利用する", async () => {
    const user = userEvent.setup();
    const renderLink = vi.fn(({ href, children }) => (
      <a href={href}>{children}</a>
    ));
    render(
      <Breadcrumb
        maxItems={3}
        renderLink={renderLink}
        items={[
          { label: "ホーム", href: "/" },
          { label: "部門", href: "/dept" },
          { label: "チーム", href: "/team" },
          { label: "現在" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "省略したパンくず" }));
    expect(screen.getByRole("menuitem", { name: "部門" })).toHaveAttribute(
      "href",
      "/dept",
    );
  });
});
