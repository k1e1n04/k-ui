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

  it("デフォルトで info バリアントの配色が適用される", () => {
    render(<Alert message="テスト" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-info-subtle");
    expect(alert).toHaveClass("border-info-main/25");
    expect(alert).toHaveClass("border-l-info-main");
    expect(alert).toHaveClass("border-l-4");
  });

  it.each(["success", "info", "warning", "error"] as const)(
    "variant=%s でレンダリングされる",
    (variant) => {
      render(<Alert message="テスト" variant={variant} />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    },
  );

  it.each([
    ["success", "bg-success-subtle", "border-l-success-main"],
    ["info", "bg-info-subtle", "border-l-info-main"],
    ["warning", "bg-warning-subtle", "border-l-warning-main"],
    ["error", "bg-danger-subtle", "border-l-danger-main"],
  ] as const)(
    "variant=%s のとき対応する配色が適用される",
    (variant, background, accent) => {
      render(<Alert message="テスト" variant={variant} />);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass(background);
      expect(alert).toHaveClass(accent);
    },
  );

  it("バリアントごとのアイコンを表示する", () => {
    const { container } = render(<Alert message="テスト" variant="warning" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
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
