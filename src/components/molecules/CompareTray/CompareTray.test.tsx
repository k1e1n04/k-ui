import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CompareTray } from "./CompareTray";

const items = [
  { id: "p1", title: "物件A", rent: 80000 },
  { id: "p2", title: "物件B", rent: 120000 },
];

describe("CompareTray", () => {
  it("対象が0件のとき描画しない", () => {
    const { container } = render(
      <CompareTray items={[]} onRemove={vi.fn()} onCompare={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("比較対象を表示する", () => {
    render(
      <CompareTray items={items} onRemove={vi.fn()} onCompare={vi.fn()} />,
    );
    expect(screen.getByText("比較中 2 / 4 件")).toBeInTheDocument();
    expect(screen.getByText("物件A")).toBeInTheDocument();
  });

  it("削除を通知する", () => {
    const onRemove = vi.fn();
    render(
      <CompareTray items={items} onRemove={onRemove} onCompare={vi.fn()} />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "物件Aを比較から削除" }),
    );
    expect(onRemove).toHaveBeenCalledWith("p1");
  });

  it("2件以上で比較ボタンが有効になる", () => {
    const onCompare = vi.fn();
    render(
      <CompareTray items={items} onRemove={vi.fn()} onCompare={onCompare} />,
    );
    const button = screen.getByRole("button", { name: "比較する" });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(onCompare).toHaveBeenCalledTimes(1);
  });

  it("1件では比較ボタンが無効になる", () => {
    render(
      <CompareTray items={[items[0]]} onRemove={vi.fn()} onCompare={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "比較する" })).toBeDisabled();
  });
});
