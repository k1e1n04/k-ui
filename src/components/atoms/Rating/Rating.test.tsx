import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Rating } from "./Rating";

describe("Rating", () => {
  it("読み取り専用では評価値をラベルで示す", () => {
    render(<Rating value={4} readOnly label="総合評価" />);
    expect(
      screen.getByRole("img", { name: "総合評価 4 / 5" }),
    ).toBeInTheDocument();
  });

  it("showValue で数値を表示する", () => {
    render(<Rating value={3.5} readOnly showValue />);
    expect(screen.getByText("3.5")).toBeInTheDocument();
  });

  it("onChange を渡すと星を選択できる", async () => {
    const onChange = vi.fn();
    render(<Rating value={1} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "評価 4" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("読み取り専用ではボタンを表示しない", () => {
    render(<Rating value={3} readOnly />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
