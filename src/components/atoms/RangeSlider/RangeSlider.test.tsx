import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RangeSlider } from "./RangeSlider";

describe("RangeSlider", () => {
  it("下限と上限の2つのスライダーを表示する", () => {
    render(<RangeSlider value={[20, 80]} onChange={vi.fn()} label="賃料" />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("矢印キーで下限を変更する", () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        value={[20, 80]}
        onChange={onChange}
        min={0}
        max={100}
        step={5}
        label="賃料"
      />,
    );
    fireEvent.keyDown(screen.getByRole("slider", { name: "賃料 下限" }), {
      key: "ArrowRight",
    });
    expect(onChange).toHaveBeenCalledWith([25, 80]);
  });

  it("上限は下限を下回らない", () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        value={[40, 45]}
        onChange={onChange}
        min={0}
        max={100}
        step={5}
        label="賃料"
      />,
    );
    fireEvent.keyDown(screen.getByRole("slider", { name: "賃料 上限" }), {
      key: "ArrowLeft",
    });
    expect(onChange).toHaveBeenCalledWith([40, 40]);
  });

  it("formatValue を aria-valuetext に反映する", () => {
    render(
      <RangeSlider
        value={[10000, 20000]}
        onChange={vi.fn()}
        min={0}
        max={100000}
        label="賃料"
        formatValue={(value) => `${value / 10000}万円`}
      />,
    );
    expect(screen.getByRole("slider", { name: "賃料 下限" })).toHaveAttribute(
      "aria-valuetext",
      "1万円",
    );
  });

  it("disabled では操作を通知しない", () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        value={[20, 80]}
        onChange={onChange}
        disabled
        label="賃料"
      />,
    );
    fireEvent.keyDown(screen.getByRole("slider", { name: "賃料 下限" }), {
      key: "ArrowRight",
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
