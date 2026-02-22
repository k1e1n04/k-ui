import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

const defaultOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("Select", () => {
  it("デフォルトで combobox ロールでレンダリングされる", () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("選択肢がレンダリングされる", () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cherry" })).toBeInTheDocument();
  });

  it("label が表示される", () => {
    render(<Select options={defaultOptions} label="Fruit" />);
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });

  it("label なしでもレンダリングされる", () => {
    render(<Select options={defaultOptions} />);
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("label と select が htmlFor / id で紐づく", () => {
    render(<Select options={defaultOptions} label="Fruit" />);
    expect(screen.getByLabelText("Fruit")).toBeInTheDocument();
  });

  it("required=true のとき * が表示される", () => {
    render(<Select options={defaultOptions} label="Fruit" required />);
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("required=true のとき select に required 属性がセットされる", () => {
    render(<Select options={defaultOptions} label="Fruit" required />);
    expect(screen.getByLabelText("Fruit", { exact: false })).toBeRequired();
  });

  it("placeholder が表示される", () => {
    render(
      <Select options={defaultOptions} placeholder="Select a fruit" value="" />,
    );
    expect(
      screen.getByRole("option", { name: "Select a fruit" }),
    ).toBeInTheDocument();
  });

  it("placeholder の option は disabled になる", () => {
    render(
      <Select options={defaultOptions} placeholder="Select a fruit" value="" />,
    );
    const placeholderOption = screen.getByRole("option", {
      name: "Select a fruit",
    });
    expect(placeholderOption).toBeDisabled();
  });

  it("clearable=true のとき placeholder の option が選択可能になる", () => {
    render(
      <Select
        options={defaultOptions}
        placeholder="Select a fruit"
        value=""
        clearable
      />,
    );
    const placeholderOption = screen.getByRole("option", {
      name: "Select a fruit",
    });
    expect(placeholderOption).not.toBeDisabled();
  });

  it("placeholder 指定時の未選択状態が安定し、初期値は空文字になる", () => {
    render(<Select options={defaultOptions} placeholder="Select a fruit" />);
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("選択変更で onChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select options={defaultOptions} value="" onChange={handleChange} />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "banana");
    expect(handleChange).toHaveBeenCalledWith("banana");
  });

  it("disabled のとき disabled 属性がセットされる", () => {
    render(<Select options={defaultOptions} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("disabled のとき選択しても onChange が呼ばれない", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select options={defaultOptions} disabled onChange={handleChange} />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "banana");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("error が表示される", () => {
    render(<Select options={defaultOptions} error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("error がないとき role=alert が表示されない", () => {
    render(<Select options={defaultOptions} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("error があるとき aria-invalid=true がセットされる", () => {
    render(<Select options={defaultOptions} error="Error" />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("error がないとき aria-invalid=false がセットされる", () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("error と select が aria-describedby で紐づく", () => {
    render(<Select options={defaultOptions} error="Error message" />);
    const select = screen.getByRole("combobox");
    const errorElement = screen.getByRole("alert");
    expect(select).toHaveAttribute("aria-describedby", errorElement.id);
  });

  it.each([
    "small",
    "medium",
    "large",
  ] as const)("size=%s でレンダリングされる", (size) => {
    render(<Select options={defaultOptions} size={size} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("disabled な選択肢がレンダリングされる", () => {
    const options = [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana", disabled: true },
    ];
    render(<Select options={options} />);
    expect(screen.getByRole("option", { name: "Banana" })).toBeDisabled();
  });

  it("name 属性がセットされる", () => {
    render(<Select options={defaultOptions} name="fruit" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("name", "fruit");
  });

  it('clearable=true のとき選択解除で onChange("") が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select
        options={defaultOptions}
        value="banana"
        placeholder="Select a fruit"
        clearable
        onChange={handleChange}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "");
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("id / aria-* が透過される", () => {
    render(
      <Select
        options={defaultOptions}
        id="fruit-select"
        aria-label="Fruit"
        aria-describedby="hint-id"
      />,
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("id", "fruit-select");
    expect(select).toHaveAttribute("aria-label", "Fruit");
    expect(select).toHaveAttribute("aria-describedby", "hint-id");
  });

  it("error があるとき aria-describedby に既存値と error id の両方が入る", () => {
    render(
      <Select
        options={defaultOptions}
        error="Error"
        aria-describedby="hint-id"
      />,
    );
    const select = screen.getByRole("combobox");
    const errorElement = screen.getByRole("alert");
    expect(select).toHaveAttribute(
      "aria-describedby",
      `hint-id ${errorElement.id}`,
    );
  });

  it("onFocus / onBlur が呼ばれる", async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(
      <Select
        options={defaultOptions}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );
    const select = screen.getByRole("combobox");
    await user.click(select);
    await user.tab();
    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("className がルートラッパーに渡される", () => {
    const { container } = render(
      <Select options={defaultOptions} className="mt-4" />,
    );
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
