import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("単一値スライダーを表示して変更を通知する", () => {
    const onChange = vi.fn();
    render(
      <Slider
        label="Volume"
        value={20}
        onChange={onChange}
        min={0}
        max={100}
      />,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    fireEvent.change(slider, { target: { value: "30" } });
    expect(onChange).toHaveBeenCalledWith(30);
  });
  it("範囲値では二つのスライダーを表示する", () => {
    render(<Slider value={[20, 80]} onChange={vi.fn()} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });
  it("disabled では操作を通知しない", () => {
    const onChange = vi.fn();
    render(<Slider value={20} onChange={onChange} disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });
  it.each([false, true])("marks=%s を反映する", (marks) => {
    render(
      <Slider value={20} onChange={vi.fn()} marks={marks} className="custom" />,
    );
    expect(screen.getByRole("slider").parentElement).toHaveClass("custom");
  });
});
