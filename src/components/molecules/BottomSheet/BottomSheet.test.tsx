import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BottomSheet } from "./BottomSheet";

describe("BottomSheet", () => {
  it("open=false のとき何も描画しない", () => {
    const { container } = render(<BottomSheet open={false}>内容</BottomSheet>);
    expect(container).toBeEmptyDOMElement();
  });

  it("open=true で内容を描画する", () => {
    render(
      <BottomSheet open title="物件一覧">
        <p>シート内容</p>
      </BottomSheet>,
    );
    expect(
      screen.getByRole("dialog", { name: "物件一覧" }),
    ).toBeInTheDocument();
    expect(screen.getByText("シート内容")).toBeInTheDocument();
  });

  it("矢印キーでスナップ位置を変更する", () => {
    const onSnapChange = vi.fn();
    render(
      <BottomSheet open snapPoints={[0.3, 0.8]} onSnapChange={onSnapChange}>
        内容
      </BottomSheet>,
    );
    fireEvent.keyDown(
      screen.getByRole("button", { name: "シートの高さを変更" }),
      { key: "ArrowUp" },
    );
    expect(onSnapChange).toHaveBeenCalledWith(1, 0.8);
  });

  it("閉じるボタンで onClose を呼ぶ", () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open title="物件一覧" onClose={onClose}>
        内容
      </BottomSheet>,
    );
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
