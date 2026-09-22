import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MapView } from "../MapView";
import { MapMarker } from "./MapMarker";

const rect = {
  width: 800,
  height: 600,
  top: 0,
  left: 0,
  right: 800,
  bottom: 600,
  x: 0,
  y: 0,
  toJSON: () => ({}),
} as DOMRect;

describe("MapMarker", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
      rect,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("ラベル付きのマーカーを描画する", () => {
    render(
      <MapView center={{ lat: 35.68, lng: 139.76 }} zoom={14}>
        <MapMarker position={{ lat: 35.68, lng: 139.76 }} label="8.5万円" />
      </MapView>,
    );
    expect(screen.getByText("8.5万円")).toBeInTheDocument();
  });

  it("クリックを通知する", () => {
    const onClick = vi.fn();
    render(
      <MapView center={{ lat: 35.68, lng: 139.76 }} zoom={14}>
        <MapMarker
          position={{ lat: 35.68, lng: 139.76 }}
          label="8.5万円"
          onClick={onClick}
        />
      </MapView>,
    );
    fireEvent.click(screen.getByRole("button", { name: "8.5万円" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("カスタムマーカー内容を表示する", () => {
    render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={10}>
        <MapMarker position={{ lat: 0, lng: 0 }} ariaLabel="カスタム">
          <span>独自マーカー</span>
        </MapMarker>
      </MapView>,
    );
    expect(screen.getByText("独自マーカー")).toBeInTheDocument();
  });
});
