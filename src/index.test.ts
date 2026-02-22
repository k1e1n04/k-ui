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
});
