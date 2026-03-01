import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KeyValueList } from "./KeyValueList";

describe("KeyValueList", () => {
  const defaultItems = [
    { key: "Name", value: "John" },
    { key: "Age", value: "30" },
  ];

  it("デフォルトでレンダリングされる", () => {
    render(<KeyValueList items={defaultItems} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("dl 要素でレンダリングされる", () => {
    const { container } = render(<KeyValueList items={defaultItems} />);
    expect(container.querySelector("dl")).toBeInTheDocument();
  });

  it("dt/dd 要素でキーと値がレンダリングされる", () => {
    const { container } = render(<KeyValueList items={defaultItems} />);
    const dts = container.querySelectorAll("dt");
    const dds = container.querySelectorAll("dd");
    expect(dts).toHaveLength(2);
    expect(dds).toHaveLength(2);
  });

  it("ReactNode のキーと値を受け付ける", () => {
    render(
      <KeyValueList
        items={[
          {
            key: <span data-testid="custom-key">Custom Key</span>,
            value: <strong data-testid="custom-value">Custom Value</strong>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-key")).toBeInTheDocument();
    expect(screen.getByTestId("custom-value")).toBeInTheDocument();
  });

  it("tone='success' のとき成功スタイルが適用される", () => {
    const { container } = render(
      <KeyValueList
        items={[{ key: "Profit", value: "+100", tone: "success" }]}
      />,
    );
    const dd = container.querySelector("dd");
    expect(dd?.className).toContain("success");
  });

  it("tone='danger' のとき危険スタイルが適用される", () => {
    const { container } = render(
      <KeyValueList items={[{ key: "Loss", value: "-50", tone: "danger" }]} />,
    );
    const dd = container.querySelector("dd");
    expect(dd?.className).toContain("danger");
  });

  it("separator=true のとき区切り線クラスが適用される", () => {
    const { container } = render(
      <KeyValueList items={defaultItems} separator />,
    );
    const dl = container.querySelector("dl");
    expect(dl?.className).toContain("divide-y");
  });

  it("separator=false のとき区切り線クラスが適用されない", () => {
    const { container } = render(
      <KeyValueList items={defaultItems} separator={false} />,
    );
    const dl = container.querySelector("dl");
    expect(dl?.className).not.toContain("divide-y");
  });

  it.each(["sm", "md"] as const)("size=%s でレンダリングされる", (size) => {
    render(<KeyValueList items={defaultItems} size={size} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it.each([
    "horizontal",
    "vertical",
  ] as const)("layout=%s でレンダリングされる", (layout) => {
    render(<KeyValueList items={defaultItems} layout={layout} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("className がルートに渡される", () => {
    const { container } = render(
      <KeyValueList items={defaultItems} className="mt-4" />,
    );
    expect(container.querySelector("dl")).toHaveClass("mt-4");
  });

  it("空の items で空リストがレンダリングされる", () => {
    const { container } = render(<KeyValueList items={[]} />);
    const dl = container.querySelector("dl");
    expect(dl).toBeInTheDocument();
    expect(dl?.children).toHaveLength(0);
  });
});
