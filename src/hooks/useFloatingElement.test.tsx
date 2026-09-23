"use client";

import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const floatingMocks = vi.hoisted(() => ({
  autoUpdate: vi.fn(),
  computePosition: vi.fn(() => Promise.resolve({ x: 0, y: 0 })),
  flip: vi.fn((options?: unknown) => ({ name: "flip", options })),
  offset: vi.fn((options?: unknown) => ({ name: "offset", options })),
  shift: vi.fn((options?: unknown) => ({ name: "shift", options })),
  size: vi.fn((options?: unknown) => ({ name: "size", options })),
  update: vi.fn(),
  useFloating: vi.fn(),
}));

vi.mock("@floating-ui/react-dom", () => ({
  autoUpdate: floatingMocks.autoUpdate,
  computePosition: floatingMocks.computePosition,
  flip: floatingMocks.flip,
  offset: floatingMocks.offset,
  shift: floatingMocks.shift,
  size: floatingMocks.size,
  useFloating: floatingMocks.useFloating,
}));

import { useFloatingElement } from "./useFloatingElement";

interface FloatingElementFixtureProps {
  autoUpdate?: boolean;
  flip?: boolean;
  offset?: number;
  placement?: "bottom-start" | "top-end";
  shift?: boolean | { padding: number };
  size?: boolean | { padding: number };
}

const FloatingElementFixture = (options: FloatingElementFixtureProps) => {
  const { floatingRef, floatingStyles, referenceRef } =
    useFloatingElement(options);

  return (
    <>
      <button ref={referenceRef} type="button">
        基準
      </button>
      <div ref={floatingRef} style={floatingStyles} />
    </>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  floatingMocks.useFloating.mockReturnValue({
    floatingStyles: { left: 0, position: "absolute", top: 0 },
    refs: {
      floating: { current: null },
      reference: { current: null },
      setFloating: vi.fn(),
      setReference: vi.fn(),
    },
    update: floatingMocks.update,
  });
});

describe("useFloatingElement", () => {
  it("デフォルトのミドルウェアと自動更新を useFloating に渡す", () => {
    render(<FloatingElementFixture />);

    expect(floatingMocks.offset).toHaveBeenCalledWith(8);
    expect(floatingMocks.flip).toHaveBeenCalledOnce();
    expect(floatingMocks.shift).toHaveBeenCalledWith({ padding: 8 });
    expect(floatingMocks.useFloating).toHaveBeenCalledWith({
      middleware: [
        { name: "offset", options: 8 },
        { name: "flip", options: undefined },
        { name: "shift", options: { padding: 8 } },
      ],
      placement: "bottom-start",
      whileElementsMounted: floatingMocks.autoUpdate,
    });
  });

  it("配置、オフセット、shift パディング、自動更新の指定を反映する", () => {
    render(
      <FloatingElementFixture
        autoUpdate={false}
        flip={false}
        offset={4}
        placement="top-end"
        shift={{ padding: 24 }}
      />,
    );

    expect(floatingMocks.offset).toHaveBeenCalledWith(4);
    expect(floatingMocks.flip).not.toHaveBeenCalled();
    expect(floatingMocks.shift).toHaveBeenCalledWith({ padding: 24 });
    expect(floatingMocks.useFloating).toHaveBeenCalledWith({
      middleware: [
        { name: "offset", options: 4 },
        { name: "shift", options: { padding: 24 } },
      ],
      placement: "top-end",
      whileElementsMounted: undefined,
    });
  });

  it("size=true で基準要素の幅に合わせる size ミドルウェアを追加する", () => {
    render(<FloatingElementFixture size />);

    expect(floatingMocks.size).toHaveBeenCalledWith(
      expect.objectContaining({ apply: expect.any(Function) }),
    );
    expect(floatingMocks.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        middleware: expect.arrayContaining([
          { name: "size", options: expect.anything() },
        ]),
      }),
    );
  });

  it("size にオプションを渡すとそのまま size ミドルウェアへ渡す", () => {
    render(<FloatingElementFixture size={{ padding: 12 }} />);

    expect(floatingMocks.size).toHaveBeenCalledWith({ padding: 12 });
  });
});
