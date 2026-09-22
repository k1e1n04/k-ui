import { describe, expect, it } from "vitest";
import * as kui from "./index";

describe("public exports", () => {
  it("exports Card from package root", () => {
    expect(kui.Card).toBeTypeOf("function");
  });

  it("exports DataTable from package root", () => {
    expect(kui.DataTable).toBeTypeOf("function");
  });

  it("exports FormField from package root", () => {
    expect(kui.FormField).toBeTypeOf("function");
  });

  it("exports Phase 3 molecules from package root", () => {
    expect(kui.Accordion).toBeTypeOf("function");
    expect(kui.Stepper).toBeTypeOf("function");
    expect(kui.Timeline).toBeTypeOf("function");
    expect(kui.FileUploader).toBeTypeOf("function");
  });

  it("パッケージルートからオーバーレイ用フックをエクスポートする", () => {
    expect(kui.useFocusTrap).toBeTypeOf("function");
    expect(kui.usePortalContainer).toBeTypeOf("function");
    expect(kui.useFloatingElement).toBeTypeOf("function");
  });

  it("汎用のメディア・フォーム系コンポーネントをエクスポートする", () => {
    expect(kui.MediaCard).toBeTypeOf("function");
    expect(kui.MediaList).toBeTypeOf("function");
    expect(kui.FilterPanel).toBeTypeOf("function");
    expect(kui.ImageGallery).toBeTypeOf("function");
    expect(kui.FacilityList).toBeTypeOf("function");
    expect(kui.ContactForm).toBeTypeOf("function");
    expect(kui.SelectionTray).toBeTypeOf("function");
    expect(kui.BottomSheet).toBeTypeOf("function");
    expect(kui.SplitPaneLayout).toBeTypeOf("function");
  });

  it("地図関連のコンポーネントとユーティリティをエクスポートする", () => {
    expect(kui.MapView).toBeTypeOf("function");
    expect(kui.MapMarker).toBeTypeOf("function");
    expect(kui.MapControls).toBeTypeOf("function");
    expect(kui.useMap).toBeTypeOf("function");
    expect(kui.project).toBeTypeOf("function");
    expect(kui.unproject).toBeTypeOf("function");
  });
});
