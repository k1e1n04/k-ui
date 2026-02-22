import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./EmptyState";

const CalendarIcon = () => (
  <svg data-testid="calendar-icon" viewBox="0 0 24 24">
    <title>calendar</title>
    <path d="M0 0h24v24H0z" />
  </svg>
);

describe("EmptyState", () => {
  it("必須 props でレンダリングされる", () => {
    render(<EmptyState title="No data" />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("description が表示される", () => {
    render(
      <EmptyState title="No data" description="Please add your first item." />,
    );
    expect(screen.getByText("Please add your first item.")).toBeInTheDocument();
  });

  it("icon が表示される", () => {
    render(<EmptyState title="No data" icon={<CalendarIcon />} />);
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
  });

  it("action が表示される", () => {
    render(
      <EmptyState
        title="No data"
        action={<button type="button">Add</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("description が未指定の場合は表示されない", () => {
    render(<EmptyState title="No data" />);
    expect(screen.queryByText("Please add your first item.")).toBeNull();
  });

  it("className がマージされる", () => {
    render(<EmptyState title="No data" className="custom-class" />);
    expect(screen.getByText("No data").parentElement).toHaveClass(
      "custom-class",
    );
  });

  it("追加の HTML 属性が渡される", () => {
    render(<EmptyState title="No data" data-testid="empty-state" id="empty" />);
    const emptyState = screen.getByTestId("empty-state");
    expect(emptyState).toHaveAttribute("id", "empty");
  });
});
