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
});
