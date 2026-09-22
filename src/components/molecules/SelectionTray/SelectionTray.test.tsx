import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SelectionTray } from "./SelectionTray";

const items = [
  { id: "p1", label: "物件A", description: "8万円" },
  { id: "p2", label: "物件B", description: "12万円" },
];

const removeLabel = (item: { label: unknown }) =>
  `${String(item.label)}を選択から削除`;

describe("SelectionTray", () => {
  it("0件のとき描画しない", () => {
    const { container } = render(
      <SelectionTray items={[]} onRemove={vi.fn()} onConfirm={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("選択中アイテムを表示する", () => {
    render(
      <SelectionTray items={items} onRemove={vi.fn()} onConfirm={vi.fn()} />,
    );
    expect(screen.getByText("選択中 2 / 4 件")).toBeInTheDocument();
    expect(screen.getByText("物件A")).toBeInTheDocument();
  });

  it("削除を通知する", () => {
    const onRemove = vi.fn();
    render(
      <SelectionTray
        items={items}
        onRemove={onRemove}
        onConfirm={vi.fn()}
        removeLabel={removeLabel}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "物件Aを選択から削除" }),
    );
    expect(onRemove).toHaveBeenCalledWith("p1");
  });

  it("2件以上で確定ボタンが有効になる", () => {
    const onConfirm = vi.fn();
    render(
      <SelectionTray
        items={items}
        onRemove={vi.fn()}
        onConfirm={onConfirm}
        confirmLabel="比較する"
      />,
    );
    const button = screen.getByRole("button", { name: "比較する" });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("1件では確定ボタンが無効になる", () => {
    render(
      <SelectionTray
        items={[items[0]]}
        onRemove={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "実行する" })).toBeDisabled();
  });

  it("クリアを通知する", () => {
    const onClear = vi.fn();
    render(
      <SelectionTray
        items={items}
        onRemove={vi.fn()}
        onConfirm={vi.fn()}
        onClear={onClear}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "クリア" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
