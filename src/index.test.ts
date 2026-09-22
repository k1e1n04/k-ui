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

  it("賃貸検索向けコンポーネントをエクスポートする", () => {
    expect(kui.PropertyCard).toBeTypeOf("function");
    expect(kui.PropertyList).toBeTypeOf("function");
    expect(kui.PropertyFilterPanel).toBeTypeOf("function");
    expect(kui.ImageGallery).toBeTypeOf("function");
    expect(kui.FacilityList).toBeTypeOf("function");
    expect(kui.InquiryForm).toBeTypeOf("function");
    expect(kui.CompareTray).toBeTypeOf("function");
    expect(kui.BottomSheet).toBeTypeOf("function");
    expect(kui.MapSearchLayout).toBeTypeOf("function");
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
