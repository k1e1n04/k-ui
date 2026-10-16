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

  it("旅行機能のコンポーネントをエクスポートする", () => {
    expect(kui.Countdown).toBeTypeOf("function");
    expect(kui.ChoiceCard).toBeTypeOf("function");
    expect(kui.Carousel).toBeTypeOf("function");
    expect(kui.SortableList).toBeTypeOf("function");
    expect(kui.DiffList).toBeTypeOf("function");
    expect(kui.ReactionButton).toBeTypeOf("function");
    expect(kui.ActivityFeed).toBeTypeOf("function");
    expect(kui.GenerationLog).toBeTypeOf("function");
    expect(kui.FloatingActionButton).toBeTypeOf("function");
    expect(kui.StickyActionBar).toBeTypeOf("function");
    expect(kui.CopyButton).toBeTypeOf("function");
    expect(kui.WeatherBadge).toBeTypeOf("function");
    expect(kui.OfflineBanner).toBeTypeOf("function");
    expect(kui.Celebration).toBeTypeOf("function");
  });

  it("旅行機能のユーティリティとフックをエクスポートする", () => {
    expect(kui.useReducedMotion).toBeTypeOf("function");
    expect(kui.TIMELINE_SLOTS).toBeDefined();
    expect(kui.DIFF_KIND_META).toBeDefined();
    expect(kui.TRAVEL_CATEGORY_LABELS).toBeDefined();
  });
});
