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

  it("トラックのタッチ操作を無効化し、ドラッグ中に背面がスクロールしない", () => {
    render(<RangeSlider value={[20, 80]} onChange={vi.fn()} label="賃料" />);
    expect(screen.getByTestId("range-slider-track")).toHaveClass("touch-none");
  });

  it("ドラッグ終了時に onChangeEnd を最終値で1回だけ呼ぶ", () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    render(
      <RangeSlider
        value={[20, 80]}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        min={0}
        max={100}
        step={5}
        label="賃料"
      />,
    );
    const track = screen.getByTestId("range-slider-track");
    vi.spyOn(track, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 100,
      top: 0,
      height: 0,
      right: 100,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    fireEvent.pointerDown(track, { clientX: 20, pointerId: 1 });
    fireEvent.pointerMove(track, { clientX: 30, pointerId: 1 });
    fireEvent.pointerMove(track, { clientX: 40, pointerId: 1 });

    // ドラッグ中は確定しない
    expect(onChangeEnd).not.toHaveBeenCalled();

    fireEvent.pointerUp(track, { pointerId: 1 });
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).toHaveBeenCalledWith([40, 80]);
  });

  it("キーボード操作の確定で onChangeEnd を呼ぶ", () => {
    const onChangeEnd = vi.fn();
    render(
      <RangeSlider
        value={[20, 80]}
        onChange={vi.fn()}
        onChangeEnd={onChangeEnd}
        min={0}
        max={100}
        step={5}
        label="賃料"
      />,
    );
    fireEvent.keyDown(screen.getByRole("slider", { name: "賃料 下限" }), {
      key: "ArrowRight",
    });
    expect(onChangeEnd).toHaveBeenCalledWith([25, 80]);
  });

  it("値が変わらなければ onChangeEnd を呼ばない", () => {
    const onChangeEnd = vi.fn();
    render(
      <RangeSlider
        value={[20, 80]}
        onChange={vi.fn()}
        onChangeEnd={onChangeEnd}
        label="賃料"
      />,
    );
    fireEvent.pointerDown(screen.getByRole("slider", { name: "賃料 下限" }), {
      pointerId: 1,
    });
    fireEvent.pointerUp(screen.getByTestId("range-slider-track"), {
      pointerId: 1,
    });
    expect(onChangeEnd).not.toHaveBeenCalled();
  });

  it("onChangeEnd 未指定でもドラッグ操作で例外にならない", () => {
    render(<RangeSlider value={[20, 80]} onChange={vi.fn()} label="賃料" />);
    const track = screen.getByTestId("range-slider-track");
    expect(() => {
      fireEvent.pointerDown(track, { clientX: 20, pointerId: 1 });
      fireEvent.pointerMove(track, { clientX: 60, pointerId: 1 });
      fireEvent.pointerUp(track, { pointerId: 1 });
    }).not.toThrow();
  });
});
