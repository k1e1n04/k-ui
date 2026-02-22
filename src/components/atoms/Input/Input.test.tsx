import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("デフォルトで textbox ロールでレンダリングされる", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("type=number のとき spinbutton ロールになる", () => {
    render(<Input type="number" />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("label が表示される", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("label なしでもレンダリングされる", () => {
    render(<Input />);
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("label と input が htmlFor / id で紐づく", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("required=true のとき * が表示される", () => {
    render(<Input label="Email" required />);
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("required=true のとき input に required 属性がセットされる", () => {
    render(<Input label="Email" required />);
    expect(screen.getByLabelText("Email", { exact: false })).toBeRequired();
  });

  it("placeholder が表示される", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("入力で onChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "a");
    expect(handleChange).toHaveBeenCalledWith("a");
  });

  it("disabled のとき disabled 属性がセットされる", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("disabled のとき入力しても onChange が呼ばれない", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input disabled onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "a");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("error が表示される", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("error がないとき role=alert が表示されない", () => {
    render(<Input />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("error があるとき aria-invalid=true がセットされる", () => {
    render(<Input error="Error" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("error がないとき aria-invalid=false がセットされる", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("error と input が aria-describedby で紐づく", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    const errorElement = screen.getByRole("alert");
    expect(input).toHaveAttribute("aria-describedby", errorElement.id);
  });

  it.each([
    "small",
    "medium",
    "large",
  ] as const)("size=%s でレンダリングされる", (size) => {
    render(<Input size={size} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it.each([
    "text",
    "number",
    "date",
    "time",
    "url",
    "month",
  ] as const)("type=%s でレンダリングされる", (type) => {
    const { container } = render(<Input type={type} />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", type);
  });

  describe("type=hidden", () => {
    it("type=hidden のとき hidden input のみレンダリングされる", () => {
      const { container } = render(<Input type="hidden" value="secret" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "hidden");
      expect(input).toHaveAttribute("value", "secret");
    });

    it("type=hidden のときラベルがレンダリングされない", () => {
      render(<Input type="hidden" label="Hidden Field" value="secret" />);
      expect(document.querySelector("label")).not.toBeInTheDocument();
    });

    it("type=hidden のときエラーメッセージがレンダリングされない", () => {
      render(<Input type="hidden" error="Error" value="secret" />);
      expect(document.querySelector("[role='alert']")).not.toBeInTheDocument();
    });

    it("type=hidden のとき name 属性がセットされる", () => {
      const { container } = render(
        <Input type="hidden" name="token" value="abc" />,
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("name", "token");
    });
  });

  it("className がルートラッパーに渡される", () => {
    const { container } = render(<Input className="mt-4" />);
    expect(container.firstChild).toHaveClass("mt-4");
  });

  describe("標準属性の透過", () => {
    it("min/max/step/name/id/inputMode/autoComplete/autoFocus を input に反映する", () => {
      render(
        <Input
          type="number"
          min={0}
          max={100}
          step={5}
          name="amount"
          id="amount-input"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
        />,
      );

      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
      expect(input).toHaveAttribute("step", "5");
      expect(input).toHaveAttribute("name", "amount");
      expect(input).toHaveAttribute("id", "amount-input");
      expect(input).toHaveAttribute("inputmode", "numeric");
      expect(input).toHaveAttribute("autocomplete", "off");
      expect(input).toHaveFocus();
    });
  });

  describe("イベント属性の透過", () => {
    it("onBlur が呼ばれる", () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      fireEvent.blur(screen.getByRole("textbox"));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("onFocus が呼ばれる", () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      fireEvent.focus(screen.getByRole("textbox"));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("onKeyDown が呼ばれる", () => {
      const handleKeyDown = vi.fn();
      render(<Input onKeyDown={handleKeyDown} />);

      fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("aria 属性の透過", () => {
    it("aria-label を透過する", () => {
      render(<Input aria-label="User name input" />);
      expect(screen.getByLabelText("User name input")).toBeInTheDocument();
    });

    it("error がない場合は aria-describedby を透過する", () => {
      render(<Input aria-describedby="hint-id" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "hint-id",
      );
    });

    it("error がある場合は aria-describedby に既存値とエラーIDをマージする", () => {
      render(<Input aria-describedby="hint-id" error="Error message" />);

      const input = screen.getByRole("textbox");
      const errorElement = screen.getByRole("alert");
      expect(input).toHaveAttribute(
        "aria-describedby",
        `hint-id ${errorElement.id}`,
      );
    });
  });
});
