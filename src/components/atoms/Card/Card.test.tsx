import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<Card>テストコンテンツ</Card>);
    expect(screen.getByText("テストコンテンツ")).toBeInTheDocument();
  });

  it("デフォルトクラスが適用される", () => {
    render(<Card data-testid="card">コンテンツ</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "rounded-lg",
      "p-6",
      "shadow",
    );
  });

  it.each([
    "none",
    "sm",
    "md",
    "lg",
  ] as const)("padding=%s でレンダリングされる", (padding) => {
    render(
      <Card padding={padding} data-testid="card">
        コンテンツ
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
  });

  it("padding=none のとき p-* クラスが適用されない", () => {
    render(
      <Card padding="none" data-testid="card">
        コンテンツ
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).not.toHaveClass("p-3", "p-6", "p-8");
  });

  it("padding=sm のとき p-3 が適用される", () => {
    render(
      <Card padding="sm" data-testid="card">
        コンテンツ
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("p-3");
  });

  it("padding=lg のとき p-8 が適用される", () => {
    render(
      <Card padding="lg" data-testid="card">
        コンテンツ
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("p-8");
  });

  it.each([
    "none",
    "sm",
    "md",
  ] as const)("shadow=%s でレンダリングされる", (shadow) => {
    render(
      <Card shadow={shadow} data-testid="card">
        コンテンツ
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
  });

  it("shadow=none のとき shadow クラスが適用されない", () => {
    render(
      <Card shadow="none" data-testid="card">
        コンテンツ
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).not.toHaveClass("shadow", "shadow-sm");
  });

  it("shadow=sm のとき shadow-sm が適用される", () => {
    render(
      <Card shadow="sm" data-testid="card">
        コンテンツ
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("shadow-sm");
  });

  it("border が true のときボーダークラスが適用される", () => {
    render(
      <Card border data-testid="card">
        コンテンツ
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass(
      "border",
      "border-gray-200",
      "dark:border-gray-700",
    );
  });

  it("border が false のときボーダークラスが適用されない", () => {
    render(
      <Card border={false} data-testid="card">
        コンテンツ
      </Card>,
    );
    expect(screen.getByTestId("card")).not.toHaveClass("border");
  });

  it("className が渡される", () => {
    render(
      <Card className="custom-class" data-testid="card">
        コンテンツ
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });

  it("追加の HTML 属性が渡される", () => {
    render(
      <Card id="test-id" title="テストタイトル" data-testid="card">
        コンテンツ
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("id", "test-id");
    expect(card).toHaveAttribute("title", "テストタイトル");
  });
});
