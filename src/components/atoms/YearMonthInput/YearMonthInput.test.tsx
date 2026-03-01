import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { YearMonthInput } from "./YearMonthInput";

describe("YearMonthInput", () => {
  it("デフォルトでレンダリングされる", () => {
    const { container } = render(<YearMonthInput />);
    const input = container.querySelector('input[type="month"]');
    expect(input).toBeInTheDocument();
  });

  it("label が表示される", () => {
    render(<YearMonthInput label="Month" />);
    expect(screen.getByText("Month")).toBeInTheDocument();
  });

  it("値が表示される", () => {
    const { container } = render(<YearMonthInput value="2026-03" />);
    const input = container.querySelector('input[type="month"]');
    expect(input).toHaveValue("2026-03");
  });

  it("値変更で onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    const { container } = render(<YearMonthInput onChange={handleChange} />);
    const input = container.querySelector('input[type="month"]');

    fireEvent.change(input as Element, { target: { value: "2026-06" } });
    expect(handleChange).toHaveBeenCalledWith("2026-06");
  });

  it("空文字で onChange に undefined が渡される", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <YearMonthInput value="2026-03" onChange={handleChange} />,
    );
    const input = container.querySelector('input[type="month"]');

    fireEvent.change(input as Element, { target: { value: "" } });
    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it("allowClear=true で値があるときクリアボタンが表示される", () => {
    render(<YearMonthInput value="2026-03" allowClear />);
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("allowClear=true でも値がないときクリアボタンが表示されない", () => {
    render(<YearMonthInput allowClear />);
    expect(
      screen.queryByRole("button", { name: "Clear" }),
    ).not.toBeInTheDocument();
  });

  it("クリアボタンをクリックすると onChange に undefined が渡される", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <YearMonthInput value="2026-03" allowClear onChange={handleChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it("disabled のとき disabled 属性がセットされる", () => {
    const { container } = render(<YearMonthInput disabled />);
    const input = container.querySelector('input[type="month"]');
    expect(input).toBeDisabled();
  });

  it("disabled のときクリアボタンが表示されない", () => {
    render(<YearMonthInput value="2026-03" allowClear disabled />);
    expect(
      screen.queryByRole("button", { name: "Clear" }),
    ).not.toBeInTheDocument();
  });

  it("error が表示される", () => {
    render(<YearMonthInput error="Invalid month" />);
    expect(screen.getByText("Invalid month")).toBeInTheDocument();
  });

  it("error があるとき aria-invalid=true がセットされる", () => {
    const { container } = render(<YearMonthInput error="Error" />);
    const input = container.querySelector('input[type="month"]');
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("required=true のとき * が表示される", () => {
    render(<YearMonthInput label="Month" required />);
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("min/max が input に設定される", () => {
    const { container } = render(
      <YearMonthInput min="2024-01" max="2026-12" />,
    );
    const input = container.querySelector('input[type="month"]');
    expect(input).toHaveAttribute("min", "2024-01");
    expect(input).toHaveAttribute("max", "2026-12");
  });

  it.each([
    "small",
    "medium",
    "large",
  ] as const)("size=%s でレンダリングされる", (size) => {
    const { container } = render(<YearMonthInput size={size} />);
    const input = container.querySelector('input[type="month"]');
    expect(input).toBeInTheDocument();
  });

  it("className がルートラッパーに渡される", () => {
    const { container } = render(<YearMonthInput className="mt-4" />);
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("name が input に設定される", () => {
    const { container } = render(<YearMonthInput name="start_month" />);
    const input = container.querySelector('input[type="month"]');
    expect(input).toHaveAttribute("name", "start_month");
  });
});
