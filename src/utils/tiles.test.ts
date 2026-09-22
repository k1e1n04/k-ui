import { describe, expect, it } from "vitest";

import {
  GSI_ATTRIBUTION,
  GSI_PALE_TILE_URL,
  GSI_PHOTO_TILE_URL,
  GSI_STANDARD_TILE_URL,
} from "./tiles";

describe("tiles", () => {
  it("地理院タイル（淡色）のURLを生成する", () => {
    expect(GSI_PALE_TILE_URL(1, 2, 3)).toBe(
      "https://cyberjapandata.gsi.go.jp/xyz/pale/3/1/2.png",
    );
  });

  it("地理院タイル（標準・航空写真）のURLを生成する", () => {
    expect(GSI_STANDARD_TILE_URL(0, 0, 0)).toBe(
      "https://cyberjapandata.gsi.go.jp/xyz/std/0/0/0.png",
    );
    expect(GSI_PHOTO_TILE_URL(0, 0, 0)).toBe(
      "https://cyberjapandata.gsi.go.jp/xyz/ort/0/0/0.png",
    );
  });

  it("出典表示の文言を提供する", () => {
    expect(GSI_ATTRIBUTION).toBe("国土地理院");
  });
});
