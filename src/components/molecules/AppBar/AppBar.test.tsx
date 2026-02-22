import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppBar } from "./AppBar";

describe("AppBar", () => {
  it("children を表示する", () => {
    render(<AppBar>Top area</AppBar>);
    expect(screen.getByText("Top area")).toBeInTheDocument();
  });

  it("position と color のクラスが適用される", () => {
    render(
      <AppBar position="fixed" color="secondary">
        Header
      </AppBar>,
    );
    const header = screen.getByText("Header").closest("header");
    expect(header).toHaveClass("fixed", "top-0", "bg-secondary-main");
  });

  it("className と追加属性が渡される", () => {
    render(
      <AppBar className="custom-appbar" data-testid="appbar">
        Header
      </AppBar>,
    );
    expect(screen.getByTestId("appbar")).toHaveClass("custom-appbar");
  });
});
