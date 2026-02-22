import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DrawerHeader } from "./DrawerHeader";

describe("DrawerHeader", () => {
  it("children を表示する", () => {
    render(
      <DrawerHeader>
        <span>header content</span>
      </DrawerHeader>,
    );

    expect(screen.getByText("header content")).toBeInTheDocument();
  });

  it("className がマージされる", () => {
    const { container } = render(<DrawerHeader className="custom-header" />);
    expect(container.firstChild).toHaveClass("custom-header");
  });

  it("追加の HTML 属性が渡される", () => {
    render(<DrawerHeader data-testid="drawer-header" id="drawer-header-id" />);
    expect(screen.getByTestId("drawer-header")).toHaveAttribute(
      "id",
      "drawer-header-id",
    );
  });
});
