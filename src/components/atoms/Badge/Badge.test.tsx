import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<Badge>Planned</Badge>);
    expect(screen.getByText("Planned")).toBeInTheDocument();
  });

  it("デフォルトで info バリアントのスタイルが適用される", () => {
    render(<Badge>Info</Badge>);
    expect(screen.getByText("Info")).toHaveClass(
      "bg-[--kui-color-info-subtle]",
    );
  });

  it.each([
    "info",
    "success",
    "warning",
    "danger",
    "neutral",
  ] as const)("variant=%s でレンダリングされる", (variant) => {
    render(<Badge variant={variant}>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("variant=success のとき success スタイルが適用される", () => {
    render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass(
      "bg-[--kui-color-success-subtle]",
    );
  });

  it("variant=warning のとき warning スタイルが適用される", () => {
    render(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText("Warning")).toHaveClass(
      "bg-[--kui-color-warning-subtle]",
    );
  });

  it("variant=danger のとき danger スタイルが適用される", () => {
    render(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText("Danger")).toHaveClass(
      "bg-[--kui-color-danger-subtle]",
    );
  });

  it("variant=neutral のとき neutral スタイルが適用される", () => {
    render(<Badge variant="neutral">Neutral</Badge>);
    expect(screen.getByText("Neutral")).toHaveClass(
      "bg-[--kui-color-surface-raised]",
    );
  });

  it("className が渡される", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });

  it("追加の HTML 属性が渡される", () => {
    render(
      <Badge data-testid="badge" id="badge-id">
        Test
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("id", "badge-id");
  });
});
