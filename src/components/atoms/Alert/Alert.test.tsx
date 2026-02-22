import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, type AlertVariant } from "./Alert";

describe("Alert", () => {
  it("デフォルトpropsで正常にレンダリングされること", () => {
    render(<Alert message="Test message" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Test message");
    // デフォルトの variant は 'info'
    expect(alert.className).toContain("bg-[--kui-color-info-subtle]/20");
  });

  it("渡したclassNameがマージされること", () => {
    render(<Alert message="Test" className="custom-class" />);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("custom-class");
  });

  it.each([
    ["success", "bg-[--kui-color-success-subtle]"],
    ["info", "bg-[--kui-color-info-subtle]/20"],
    ["warning", "bg-[--kui-color-warning-subtle]/30"],
    ["error", "bg-[--kui-color-danger-subtle]"],
  ])("%s variantが正しいスタイルを適用すること", (variant, expectedClass) => {
    render(<Alert message="Test" variant={variant as AlertVariant} />);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain(expectedClass);
  });
});
