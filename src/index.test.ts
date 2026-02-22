import { describe, expect, it } from "vitest";
import * as kui from "./index";

describe("public exports", () => {
  it("exports Card from package root", () => {
    expect(kui.Card).toBeTypeOf("function");
  });
});
