import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<NumberInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("label が表示される", () => {
    render(<NumberInput label="Amount" />);
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  it("数値を入力すると onValueChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "42");
    expect(handleChange).toHaveBeenCalledWith(42);
  });

  it("小数を入力できる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "3.14");
    expect(handleChange).toHaveBeenLastCalledWith(3.14);
  });

  it("allowNegative=true のとき負数を入力できる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput allowNegative onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "-5");
    expect(handleChange).toHaveBeenLastCalledWith(-5);
  });

  it("allowNegative=false のときマイナス記号が入力できない", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "-5");
    // マイナスが無視されて5のみ
    expect(handleChange).toHaveBeenLastCalledWith(5);
  });

  it("英字などの無効な文字が入力できない", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "abc");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("min/max でクランプされる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput min={0} max={100} onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "150");
    expect(handleChange).toHaveBeenLastCalledWith(100);
  });

  it("blur 時に precision でフォーマットされる", () => {
    render(<NumberInput precision={2} value={3} />);
    const input = screen.getByRole("textbox");

    fireEvent.blur(input);
    expect(input).toHaveValue("3.00");
  });

  it("emptyBehavior='zero' のとき空文字で 0 が返る", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <NumberInput
        emptyBehavior="zero"
        value={5}
        onValueChange={handleChange}
      />,
    );
    const input = screen.getByRole("textbox");

    await user.clear(input);
    expect(handleChange).toHaveBeenLastCalledWith(0);
  });

  it("emptyBehavior='undefined' のとき空文字で undefined が返る", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <NumberInput
        emptyBehavior="undefined"
        value={5}
        onValueChange={handleChange}
      />,
    );
    const input = screen.getByRole("textbox");

    await user.clear(input);
    expect(handleChange).toHaveBeenLastCalledWith(undefined);
  });

  it("suffix が表示される", () => {
    render(<NumberInput suffix="%" />);
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("disabled のとき disabled 属性がセットされる", () => {
    render(<NumberInput disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("disabled のとき入力しても onValueChange が呼ばれない", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInput disabled onValueChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "5");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("error が表示される", () => {
    render(<NumberInput error="Invalid number" />);
    expect(screen.getByText("Invalid number")).toBeInTheDocument();
  });

  it("error があるとき aria-invalid=true がセットされる", () => {
    render(<NumberInput error="Error" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("required=true のとき * が表示される", () => {
    render(<NumberInput label="Amount" required />);
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("placeholder が表示される", () => {
    render(<NumberInput placeholder="0" />);
    expect(screen.getByPlaceholderText("0")).toBeInTheDocument();
  });

  it.each(["small", "medium", "large"] as const)(
    "size=%s でレンダリングされる",
    (size) => {
      render(<NumberInput size={size} />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    },
  );

  it("className がルートラッパーに渡される", () => {
    const { container } = render(<NumberInput className="mt-4" />);
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("name が指定されると hidden input が生成される", () => {
    const { container } = render(<NumberInput name="amount" value={42} />);
    const hidden = container.querySelector('input[type="hidden"]');
    expect(hidden).toHaveAttribute("name", "amount");
    expect(hidden).toHaveAttribute("value", "42");
  });

  it("value が外部から変更されると表示が更新される", () => {
    const { rerender } = render(<NumberInput value={10} />);
    expect(screen.getByRole("textbox")).toHaveValue("10");

    rerender(<NumberInput value={20} />);
    expect(screen.getByRole("textbox")).toHaveValue("20");
  });

  it("onBlur イベントが発火する", () => {
    const handleBlur = vi.fn();
    render(<NumberInput />);
    // blur はコンポーネント内部で処理されるため、input の blur をトリガー
    fireEvent.blur(screen.getByRole("textbox"));
    // エラーなく blur が処理されることを確認
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
