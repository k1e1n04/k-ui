import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("デフォルトで textbox ロールでレンダリングされる", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("label が表示される", () => {
    render(<Textarea label="Note" />);
    expect(screen.getByText("Note")).toBeInTheDocument();
  });

  it("label なしでもレンダリングされる", () => {
    render(<Textarea />);
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("label と textarea が htmlFor / id で紐づく", () => {
    render(<Textarea label="Note" />);
    expect(screen.getByLabelText("Note")).toBeInTheDocument();
  });

  it("required=true のとき * が表示される", () => {
    render(<Textarea label="Note" required />);
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("required=true のとき textarea に required 属性がセットされる", () => {
    render(<Textarea label="Note" required />);
    expect(screen.getByLabelText("Note", { exact: false })).toBeRequired();
  });

  it("placeholder が表示される", () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("入力で onChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "a");
    expect(handleChange).toHaveBeenCalledWith("a");
  });

  it("disabled のとき disabled 属性がセットされる", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("disabled のとき入力しても onChange が呼ばれない", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea disabled onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "a");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("error が表示される", () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("error がないとき role=alert が表示されない", () => {
    render(<Textarea />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("error があるとき aria-invalid=true がセットされる", () => {
    render(<Textarea error="Error" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("error がないとき aria-invalid=false がセットされる", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("error と textarea が aria-describedby で紐づく", () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole("textbox");
    const errorElement = screen.getByRole("alert");
    expect(textarea).toHaveAttribute("aria-describedby", errorElement.id);
  });

  it("rows が反映される", () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  it("デフォルトの rows は 3", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3");
  });

  it.each([
    "small",
    "medium",
    "large",
  ] as const)("size=%s でレンダリングされる", (size) => {
    render(<Textarea size={size} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("className がルートラッパーに渡される", () => {
    const { container } = render(<Textarea className="mt-4" />);
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("onKeyDown が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();
    render(<Textarea onKeyDown={handleKeyDown} />);

    await user.type(screen.getByRole("textbox"), "{enter}");
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("onFocus / onBlur が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />);

    const textarea = screen.getByRole("textbox");
    await user.click(textarea);
    await user.tab();

    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("name / id / aria-* が透過される", () => {
    render(
      <Textarea
        id="custom-textarea-id"
        name="message"
        aria-label="Message"
        aria-describedby="hint-id"
      />,
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("id", "custom-textarea-id");
    expect(textarea).toHaveAttribute("name", "message");
    expect(textarea).toHaveAttribute("aria-label", "Message");
    expect(textarea).toHaveAttribute("aria-describedby", "hint-id");
  });

  it("error があるとき aria-describedby に既存値と error id の両方が入る", () => {
    render(<Textarea error="Error" aria-describedby="hint-id" />);
    const textarea = screen.getByRole("textbox");
    const errorElement = screen.getByRole("alert");

    expect(textarea).toHaveAttribute(
      "aria-describedby",
      `hint-id ${errorElement.id}`,
    );
  });
});
