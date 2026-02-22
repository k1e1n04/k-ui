import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("textbox ロールでレンダリングされる", () => {
    render(<SearchInput aria-label="Search items" />);
    expect(screen.getByRole("textbox", { name: "Search items" })).toBeVisible();
  });

  it("入力値の変更で onChange が呼ばれる", async () => {
    const handleChange = vi.fn();
    render(
      <SearchInput
        aria-label="Search items"
        value=""
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ab" } });
    expect(handleChange).toHaveBeenCalledWith("ab");
  });

  it("値があるとき clear ボタンが表示される", () => {
    render(<SearchInput aria-label="Search items" value="milk" />);
    expect(screen.getByRole("button", { name: "Clear search" })).toBeVisible();
  });

  it("値がないとき clear ボタンが表示されない", () => {
    render(<SearchInput aria-label="Search items" value="" />);
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("clear ボタン押下で onChange('') と onClear が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const handleClear = vi.fn();
    render(
      <SearchInput
        aria-label="Search items"
        value="milk"
        onChange={handleChange}
        onClear={handleClear}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(handleChange).toHaveBeenCalledWith("");
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("placeholder が表示される", () => {
    render(<SearchInput aria-label="Search items" placeholder="Find task" />);
    expect(screen.getByPlaceholderText("Find task")).toBeVisible();
  });

  it("disabled のとき clear ボタンが表示されない", () => {
    render(<SearchInput aria-label="Search items" value="milk" disabled />);
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("className がルートラッパーに渡される", () => {
    const { container } = render(
      <SearchInput aria-label="Search items" className="mt-4" />,
    );
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
