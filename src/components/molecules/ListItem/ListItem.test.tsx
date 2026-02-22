import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ListItem } from "./ListItem";

describe("ListItem", () => {
  it("children を表示する", () => {
    render(<ListItem>Task item</ListItem>);
    expect(screen.getByText("Task item")).toBeInTheDocument();
  });

  it("hoverable=false のとき hover クラスを付与しない", () => {
    render(<ListItem hoverable={false}>Task item</ListItem>);
    const item = screen.getByText("Task item").closest("div");
    expect(item).not.toHaveClass("hover:bg-gray-50");
  });

  it("bordered=false のとき border クラスを付与しない", () => {
    render(<ListItem bordered={false}>Task item</ListItem>);
    const item = screen.getByText("Task item").closest("div");
    expect(item).not.toHaveClass("border");
  });
});
