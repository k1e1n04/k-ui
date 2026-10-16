import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SortableList } from "./SortableList";

const items = [
  { id: "a", content: "一つ目" },
  { id: "b", content: "二つ目" },
  { id: "c", content: "三つ目" },
];

describe("SortableList", () => {
  it("ハンドルの矢印キーで項目を下へ動かす", () => {
    const onReorder = vi.fn();
    render(<SortableList items={items} onReorder={onReorder} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "a を並べ替え" }), {
      key: "ArrowDown",
    });
    expect(onReorder).toHaveBeenCalledWith(0, 1);
  });

  it("ハンドルの矢印キーで項目を上へ動かす", () => {
    const onReorder = vi.fn();
    render(<SortableList items={items} onReorder={onReorder} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "c を並べ替え" }), {
      key: "ArrowUp",
    });
    expect(onReorder).toHaveBeenCalledWith(2, 1);
  });

  it("上へ／下へボタンでも並べ替えられる", () => {
    const onReorder = vi.fn();
    render(<SortableList items={items} onReorder={onReorder} />);
    fireEvent.click(screen.getByRole("button", { name: "b を上へ" }));
    expect(onReorder).toHaveBeenCalledWith(1, 0);
    expect(screen.getByRole("button", { name: "a を上へ" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "c を下へ" })).toBeDisabled();
  });
});
