import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("ラベル付き区切り線を表示する", () => {
    render(<Divider label="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });
  it.each(["horizontal", "vertical"] as const)(
    "orientation=%s を公開する",
    (orientation) => {
      render(<Divider orientation={orientation} className="custom" />);
      expect(screen.getByRole("separator")).toHaveAttribute(
        "aria-orientation",
        orientation,
      );
      expect(screen.getByRole("separator")).toHaveClass("custom");
    },
  );
});
