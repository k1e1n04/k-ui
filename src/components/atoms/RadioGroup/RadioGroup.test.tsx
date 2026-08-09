import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
  { label: "Monthly", value: "month" },
  { label: "Yearly", value: "year", disabled: true },
];
describe("RadioGroup", () => {
  it("選択肢とラベルを表示する", () => {
    render(
      <RadioGroup
        label="Plan"
        options={options}
        value="month"
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByLabelText("Plan")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Monthly" })).toBeChecked();
  });
  it("選択時に値を通知する", async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} value="" onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Monthly" }));
    expect(onChange).toHaveBeenCalledWith("month");
  });
  it("無効な選択肢は操作できない", async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} value="" onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "Yearly" })).toBeDisabled();
    await userEvent.click(screen.getByRole("radio", { name: "Yearly" }));
    expect(onChange).not.toHaveBeenCalled();
  });
  it("required と error をネイティブ妥当性および aria-invalid に反映する", () => {
    render(
      <RadioGroup
        label="Plan"
        options={options}
        value=""
        onChange={vi.fn()}
        required
        error="Select a plan"
      />,
    );
    const radio = screen.getByRole("radio", { name: "Monthly" });
    expect(radio).toBeRequired();
    expect(radio).toHaveAttribute("aria-invalid", "true");
    expect(radio).toHaveAttribute("aria-describedby");
  });
  it.each(["horizontal", "vertical"] as const)(
    "orientation=%s のクラスを適用する",
    (orientation) => {
      render(
        <RadioGroup
          options={options}
          value=""
          onChange={vi.fn()}
          orientation={orientation}
          className="custom"
        />,
      );
      expect(screen.getByRole("radiogroup")).toHaveClass("custom");
    },
  );
});
