import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<Alert message="テストメッセージ" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("テストメッセージ");
  });

  it("デフォルトで info バリアントのスタイルが適用される", () => {
    render(<Alert message="テスト" />);
    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("style")).toContain(
      "background-color: var(--kui-color-info-subtle);",
    );
    expect(alert.getAttribute("style")).toContain(
      "border-color: var(--kui-color-info);",
    );
    expect(alert.getAttribute("style")).toContain(
      "color: var(--kui-color-info);",
    );
    expect(alert).toHaveClass("border-l-4");
  });

  it.each([
    "success",
    "info",
    "warning",
    "error",
  ] as const)("variant=%s でレンダリングされる", (variant) => {
    render(<Alert message="テスト" variant={variant} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("variant=error のとき danger スタイルが適用される", () => {
    render(<Alert message="テスト" variant="error" />);
    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("style")).toContain(
      "background-color: var(--kui-color-danger-subtle);",
    );
    expect(alert.getAttribute("style")).toContain(
      "border-color: var(--kui-color-danger);",
    );
    expect(alert.getAttribute("style")).toContain(
      "color: var(--kui-color-danger);",
    );
  });

  it("variant=success のとき success スタイルが適用される", () => {
    render(<Alert message="テスト" variant="success" />);
    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("style")).toContain(
      "background-color: var(--kui-color-success-subtle);",
    );
    expect(alert.getAttribute("style")).toContain(
      "border-color: var(--kui-color-success);",
    );
    expect(alert.getAttribute("style")).toContain(
      "color: var(--kui-color-success);",
    );
  });

  it("variant=warning のとき warning スタイルが適用される", () => {
    render(<Alert message="テスト" variant="warning" />);
    const alert = screen.getByRole("alert");
    expect(alert.getAttribute("style")).toContain(
      "background-color: var(--kui-color-warning-subtle);",
    );
    expect(alert.getAttribute("style")).toContain(
      "border-color: var(--kui-color-warning);",
    );
    expect(alert.getAttribute("style")).toContain(
      "color: var(--kui-color-warning);",
    );
  });

  it("className が渡される", () => {
    render(<Alert message="テスト" className="custom-class" />);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("追加の HTML 属性が渡される", () => {
    render(<Alert message="テスト" data-testid="alert" id="test-id" />);
    const alert = screen.getByTestId("alert");
    expect(alert).toHaveAttribute("id", "test-id");
  });
});
