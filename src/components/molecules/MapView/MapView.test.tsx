import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MapControls } from "../MapControls";
import { MapMarker } from "../MapMarker";
import { useMap } from "./MapContext";
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

  it("ドラッグ中はタイルを再配置せず、タイル層の transform で追従する", () => {
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={5}
        tileUrl={() => "https://example.com/tile.png"}
      />,
    );
    const layer = screen.getByTestId("map-tiles");
    const tile = layer.querySelector("img") as HTMLImageElement;
    const tileLeft = tile.style.left;
    const tileTop = tile.style.top;
    const before = layer.style.transform;

    const map = screen.getByTestId("map-view");
    fireEvent.pointerDown(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerMove(map, { clientX: 340, clientY: 280, pointerId: 1 });

    // タイル自身は再配置されず、タイル層の transform だけが指の移動量ぶん動く
    expect(tile.style.left).toBe(tileLeft);
    expect(tile.style.top).toBe(tileTop);
    expect(layer.style.transform).not.toBe(before);
    expect(layer.style.transform).toBe(
      "translate3d(-172px, -232px, 0) scale(1)",
    );

    fireEvent.pointerUp(map, { clientX: 340, clientY: 280, pointerId: 1 });
  });

  it("タイルは常に 256px 固定で、拡大縮小は層の scale で表現する", () => {
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={5.4}
        tileUrl={() => "https://example.com/tile.png"}
      />,
    );
    const layer = screen.getByTestId("map-tiles");
    const tile = layer.querySelector("img") as HTMLImageElement;
    // 小数ズームでもタイル自身は拡大縮小されない（旧実装は scaledTile を再計算していた）
    expect(tile.style.width).toBe("256px");
    expect(tile.style.height).toBe("256px");
    expect(tile.style.left).toBe("0px");
    expect(tile.style.top).toBe("0px");
    // 小数ズームは層の scale に集約される
    expect(layer.style.transform).toMatch(/scale\(/);
    expect(layer.style.transformOrigin).toBe("0 0");
  });

  it("ピンチ中もタイルを再配置せず、タイル層の scale だけで拡大縮小する", () => {
    render(
      <MapView
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={5}
        tileUrl={() => "https://example.com/tile.png"}
      />,
    );
    const layer = screen.getByTestId("map-tiles");
    const tile = layer.querySelector("img") as HTMLImageElement;
    const before = {
      left: tile.style.left,
      top: tile.style.top,
      width: tile.style.width,
      height: tile.style.height,
    };
    const map = screen.getByTestId("map-view");

    fireEvent.pointerDown(map, {
      clientX: 300,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerDown(map, {
      clientX: 500,
      clientY: 300,
      pointerId: 2,
      button: 0,
    });
    fireEvent.pointerMove(map, { clientX: 250, clientY: 300, pointerId: 1 });
    fireEvent.pointerMove(map, { clientX: 550, clientY: 300, pointerId: 2 });

    // タイル自身の寸法・位置はピンチ中に変化しない（コンポジタの transform だけで動く）
    expect(tile.style.left).toBe(before.left);
    expect(tile.style.top).toBe(before.top);
    expect(tile.style.width).toBe(before.width);
    expect(tile.style.height).toBe(before.height);
    // 代わりに層の scale が変わる
    expect(layer.style.transform).not.toMatch(/scale\(1\)/);

    fireEvent.pointerUp(map, { clientX: 250, clientY: 300, pointerId: 1 });
    fireEvent.pointerUp(map, { clientX: 550, clientY: 300, pointerId: 2 });
  });

  it("下位ズームのタイルを下敷きに描いて白抜けを埋める", () => {
    render(
      <MapView
        center={{ lat: 0, lng: 0 }}
        zoom={5}
        tileUrl={(x, y, z) => `https://example.com/${z}/${x}/${y}.png`}
      />,
    );
    const base = screen.getByTestId("map-tiles-base");
    const detail = screen.getByTestId("map-tiles");
    const baseTile = base.querySelector("img") as HTMLImageElement;
    const detailTile = detail.querySelector("img") as HTMLImageElement;
    // 下敷きは 1 段低いズームのタイルを使う
    expect(baseTile.src).toContain("example.com/4/");
    expect(detailTile.src).toContain("example.com/5/");
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

  it("ドラッグ中は地図コンテキストを参照する子要素を再レンダリングしない", () => {
    let renders = 0;
    const Child = () => {
      useMap();
      renders += 1;
      return <span>child</span>;
    };
    render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={5}>
        <Child />
      </MapView>,
    );
    const initial = renders;
    const map = screen.getByTestId("map-view");

    fireEvent.pointerDown(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerMove(map, { clientX: 380, clientY: 290, pointerId: 1 });
    fireEvent.pointerMove(map, { clientX: 360, clientY: 280, pointerId: 1 });
    fireEvent.pointerMove(map, { clientX: 340, clientY: 270, pointerId: 1 });

    expect(renders).toBe(initial);
  });

  it("ドラッグ中は背景グリッドとマーカーが同じ方向・同じ量だけ動く", () => {
    const { container } = render(
      <MapView center={{ lat: 0, lng: 0 }} zoom={5} tileUrl={null}>
        <MapMarker position={{ lat: 0, lng: 0 }} label="テスト" />
      </MapView>,
    );
    const readGrid = () => {
      const grid = container.querySelector(
        'div[aria-hidden="true"]',
      ) as HTMLElement;
      const match = grid.style.backgroundPosition.match(
        /(-?[\d.]+)px (-?[\d.]+)px/,
      );
      return { x: Number(match?.[1]), y: Number(match?.[2]) };
    };
    const before = readGrid();
    const map = screen.getByTestId("map-view");

    fireEvent.pointerDown(map, {
      clientX: 400,
      clientY: 300,
      pointerId: 1,
      button: 0,
    });
    fireEvent.pointerMove(map, { clientX: 340, clientY: 280, pointerId: 1 });

    const after = readGrid();
    const layer = screen
      .getByTestId("map-content")
      .style.transform.match(/translate3d\((-?[\d.]+)px, (-?[\d.]+)px/);

    // 指の移動量(-60, -20)と同じ方向に、グリッドもマーカー層も同じ量だけ動く
    expect(after.x - before.x).toBeCloseTo(-60, 5);
    expect(after.y - before.y).toBeCloseTo(-20, 5);
    expect(after.x - before.x).toBeCloseTo(Number(layer?.[1]), 5);
    expect(after.y - before.y).toBeCloseTo(Number(layer?.[2]), 5);
  });
});
