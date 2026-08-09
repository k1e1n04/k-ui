import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("パスワード入力とラベルを表示する", () => {
    render(
      <PasswordInput label="Password" value="secret" onChange={vi.fn()} />,
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });
  it("表示切替で入力タイプを変更する", async () => {
    render(<PasswordInput value="secret" onChange={vi.fn()} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Show password" }),
    );
    expect(screen.getByDisplayValue("secret")).toHaveAttribute("type", "text");
  });
  it("入力値を通知する", async () => {
    const onChange = vi.fn();
    render(<PasswordInput value="" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Password"), "a");
    expect(onChange).toHaveBeenCalledWith("a");
  });
  it.each([true, false])("showToggle=%s を反映する", (showToggle) => {
    render(
      <PasswordInput
        value=""
        onChange={vi.fn()}
        showToggle={showToggle}
        className="custom"
      />,
    );
    expect(screen.queryByRole("button")).toBe(
      showToggle ? screen.getByRole("button") : null,
    );
    expect(screen.getByLabelText("Password").parentElement).toHaveClass(
      "custom",
    );
  });
  it("呼び出し元の aria-describedby とフィールド説明を結合する", () => {
    render(
      <PasswordInput
        value=""
        onChange={vi.fn()}
        description="Use 12 characters"
        aria-describedby="external-hint"
      />,
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("external-hint"),
    );
  });
});
