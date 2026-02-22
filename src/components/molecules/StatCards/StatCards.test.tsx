import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatCards } from "./StatCards";

describe("StatCards", () => {
  const cards = [
    { label: "Total", value: 12, color: "blue" as const },
    { label: "Done", value: 8, color: "green" as const },
  ];

  it("カードのラベルと値を表示する", () => {
    render(<StatCards cards={cards} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("formatValue が適用される", () => {
    render(
      <StatCards cards={cards} formatValue={(value) => `#${String(value)}`} />,
    );
    expect(screen.getByText("#12")).toBeInTheDocument();
    expect(screen.getByText("#8")).toBeInTheDocument();
  });

  it("columns に応じたグリッドクラスが付与される", () => {
    const { container } = render(<StatCards cards={cards} columns={4} />);
    expect(container.firstChild).toHaveClass("lg:grid-cols-4");
  });
});
