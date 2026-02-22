import * as kui from "./index";

import { describe, expect, it } from "vitest";

describe("public exports", () => {
  it("exports Card from package root", () => {
    expect(kui.Card).toBeTypeOf("function");
  });
});
