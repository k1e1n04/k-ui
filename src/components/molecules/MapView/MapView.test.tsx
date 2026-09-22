import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MapControls } from "../MapControls";
import { MapMarker } from "../MapMarker";
import { MapView } from "./MapView";

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

describe("MapView", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
      rect,
    );
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("地図キャンバスを描画する", () => {
    render(<MapView center={{ lat: 0, lng: 0 }} />);
    expect(screen.getByTestId("map-view")).toBeInTheDocument();
  });

  it("既定で地理院タイルと出典を表示する", () => {
    const { container } = render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={0} />,
    );
    expect(
      container.querySelector('img[src*="cyberjapandata.gsi.go.jp"]'),
    ).not.toBeNull();
    expect(screen.getByText(/国土地理院/)).toBeInTheDocument();
  });

  it("tileUrl=null ではタイルも出典も表示しない", () => {
    const { container } = render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={0} tileUrl={null} />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(screen.queryByText(/国土地理院/)).not.toBeInTheDocument();
  });

  it("カスタムタイルの出典を指定できる", () => {
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={0}
        tileUrl={() => "https://example.com/tile.png"}
        attribution="© Example"
      />,
    );
    expect(screen.getByText(/© Example/)).toBeInTheDocument();
  });

  it("タップした座標を通知する", () => {
    const onTap = vi.fn();
    render(<MapView center={{ lat: 0, lng: 0 }} zoom={0} onTap={onTap} />);
    const map = screen.getByTestId("map-view");
    fireEvent.pointerDown(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerUp(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    expect(onTap).toHaveBeenCalledTimes(1);
    expect(onTap.mock.calls[0][0].lat).toBeCloseTo(0, 3);
    expect(onTap.mock.calls[0][0].lng).toBeCloseTo(0, 3);
  });

  it("ドラッグではタップを通知せず中心を更新する", () => {
    const onTap = vi.fn();
    const onCenterChange = vi.fn();
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={5}
        onTap={onTap}
        onCenterChange={onCenterChange}
      />,
    );
    const map = screen.getByTestId("map-view");
    fireEvent.pointerDown(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerMove(map, { clientX: 300, clientY: 300, pointerId: 1 });
    fireEvent.pointerUp(map, { clientX: 300, clientY: 300, pointerId: 1 });
    expect(onTap).not.toHaveBeenCalled();
    expect(onCenterChange).toHaveBeenCalled();
  });

  it("矢印キーで中心を移動する", () => {
    const onCenterChange = vi.fn();
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={5}
        onCenterChange={onCenterChange}
      />,
    );
    fireEvent.keyDown(screen.getByTestId("map-view"), { key: "ArrowRight" });
    expect(onCenterChange).toHaveBeenCalled();
    expect(onCenterChange.mock.calls[0][0].lng).toBeGreaterThan(0);
  });

  it("MapControls からズームできる", () => {
    const onZoomChange = vi.fn();
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={10}
        onZoomChange={onZoomChange}
      >
        <MapControls />
      </MapView>,
    );
    fireEvent.click(screen.getByRole("button", { name: "拡大" }));
    expect(onZoomChange).toHaveBeenCalledWith(11);
  });

  it("MapMarker を配置できる", () => {
    render(
      <MapView center={{ lat: 35.68, lng: 139.76 }} zoom={14}>
        <MapMarker position={{ lat: 35.68, lng: 139.76 }} label="8.5万円" />
      </MapView>,
    );
    expect(screen.getByRole("button", { name: "8.5万円" })).toBeInTheDocument();
  });

  it("ドラッグ中はマーカーを再計算せず、マーカー層の transform で追従する", () => {
    render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={5}>
        <MapMarker position={{ lat: 0, lng: 0 }} label="テスト" />
      </MapView>,
    );
    const marker = screen.getByRole("button", { name: "テスト" });
    const before = marker.style.left;
    const map = screen.getByTestId("map-view");

    fireEvent.pointerDown(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerMove(map, { clientX: 340, clientY: 280, pointerId: 1 });

    // マーカー自身の位置は変わらず、親レイヤーの transform だけで移動する
    expect(marker.style.left).toBe(before);
    expect(screen.getByTestId("map-content").style.transform).toBe(
      "translate3d(-60px, -20px, 0)",
    );

    fireEvent.pointerUp(map, { clientX: 340, clientY: 280, pointerId: 1 });
    expect(screen.getByTestId("map-content").style.transform).toBe(
      "translate3d(0px, 0px, 0)",
    );
  });

  it("中心が変わるとマーカー位置が更新される", () => {
    const { rerender } = render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={5}>
        <MapMarker position={{ lat: 0, lng: 0 }} label="テスト" />
      </MapView>,
    );
    const before = screen.getByRole("button", { name: "テスト" }).style.left;

    rerender(
      <MapView center={{ lat: 0, lng: 1 }} zoom={5}>
        <MapMarker position={{ lat: 0, lng: 0 }} label="テスト" />
      </MapView>,
    );

    expect(screen.getByRole("button", { name: "テスト" }).style.left).not.toBe(
      before,
    );
  });
});
