import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("デフォルトでレンダリングされる", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("label が表示される", () => {
    render(<Spinner label="Loading data..." />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it.each([
    ["small", "h-5"],
    ["medium", "h-8"],
    ["large", "h-12"],
  ] as const)("size=%s のスタイルが適用される", (size, expectedClass) => {
    const { container } = render(<Spinner size={size} />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toHaveClass(expectedClass);
  });
});
