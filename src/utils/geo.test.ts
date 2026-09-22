import { describe, expect, it } from "vitest";

import { MAX_LATITUDE, project, TILE_SIZE, unproject, worldSize } from "./geo";

describe("geo", () => {
  it("ズーム0ではワールドが256pxになる", () => {
    expect(worldSize(0)).toBe(TILE_SIZE);
    expect(worldSize(1)).toBe(TILE_SIZE * 2);
  });

  it("経度0・緯度0はワールドの中心になる", () => {
    const point = project({ lat: 0, lng: 0 }, 0);
    expect(point.x).toBeCloseTo(TILE_SIZE / 2, 6);
    expect(point.y).toBeCloseTo(TILE_SIZE / 2, 6);
  });

  it("project と unproject が往復する", () => {
    const original = { lat: 35.681236, lng: 139.767125 };
    const restored = unproject(project(original, 14), 14);
    expect(restored.lat).toBeCloseTo(original.lat, 6);
    expect(restored.lng).toBeCloseTo(original.lng, 6);
  });

  it("緯度はWebメルカトルの範囲にクランプされる", () => {
    const point = project({ lat: 89.9, lng: 0 }, 0);
    const restored = unproject(point, 0);
    expect(restored.lat).toBeLessThanOrEqual(MAX_LATITUDE + 1e-6);
  });

  it("ズームが1増えると座標が2倍になる", () => {
    const base = project({ lat: 35, lng: 139 }, 10);
    const zoomed = project({ lat: 35, lng: 139 }, 11);
    expect(zoomed.x).toBeCloseTo(base.x * 2, 6);
    expect(zoomed.y).toBeCloseTo(base.y * 2, 6);
  });
});
