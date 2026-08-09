import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("次ページとページ番号で onChange を呼ぶ", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "次のページ" }));
    await user.click(screen.getByRole("button", { name: "4ページ" }));
    expect(onChange).toHaveBeenNthCalledWith(1, 3);
    expect(onChange).toHaveBeenNthCalledWith(2, 4);
  });

  it("範囲外のページを有効範囲へ丸めて現在ページを公開する", () => {
    const { rerender } = render(
      <Pagination page={0} totalPages={3} onChange={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "1ページ" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    rerender(<Pagination page={99} totalPages={3} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "3ページ" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
