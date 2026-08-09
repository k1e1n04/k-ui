import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it.each([
    "text",
    "circular",
    "rectangular",
  ] as const)("variant=%s を表示する", (variant) => {
    render(<Skeleton variant={variant} className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("custom");
  });
  it.each([
    "none",
    "pulse",
  ] as const)("animation=%s を適用する", (animation) => {
    render(<Skeleton animation={animation} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
