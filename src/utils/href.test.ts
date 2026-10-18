import { describe, expect, it } from "vitest";

import { sanitizeHref } from "./href";

describe("sanitizeHref", () => {
  it("相対パスを許可する", () => {
    expect(sanitizeHref("/dashboard")).toBe("/dashboard");
    expect(sanitizeHref("./child")).toBe("./child");
    expect(sanitizeHref("settings/profile")).toBe("settings/profile");
    expect(sanitizeHref("#section")).toBe("#section");
    expect(sanitizeHref("?page=2")).toBe("?page=2");
  });

  it("http / https を許可する", () => {
    expect(sanitizeHref("https://example.com")).toBe("https://example.com");
    expect(sanitizeHref("http://example.com/path")).toBe(
      "http://example.com/path",
    );
    expect(sanitizeHref("HTTPS://example.com")).toBe("HTTPS://example.com");
  });

  it("危険なスキームを拒否する", () => {
    expect(sanitizeHref("javascript:alert(1)")).toBeUndefined();
    expect(sanitizeHref("JavaScript:alert(1)")).toBeUndefined();
    expect(sanitizeHref("data:text/html,<script>")).toBeUndefined();
    expect(sanitizeHref("vbscript:msgbox(1)")).toBeUndefined();
  });

  it("プロトコル相対URL・制御文字・空文字を拒否する", () => {
    expect(sanitizeHref("//evil.example.com")).toBeUndefined();
    expect(sanitizeHref("/\\evil.example.com")).toBeUndefined();
    expect(sanitizeHref("java\nscript:alert(1)")).toBeUndefined();
    expect(sanitizeHref("   ")).toBeUndefined();
    expect(sanitizeHref("")).toBeUndefined();
  });

  it("undefined は undefined を返す", () => {
    expect(sanitizeHref(undefined)).toBeUndefined();
  });
});
