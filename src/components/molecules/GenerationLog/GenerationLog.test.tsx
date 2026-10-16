import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GenerationLog } from "./GenerationLog";

describe("GenerationLog", () => {
  it("polite で読み上げるログとして表示する", () => {
    render(
      <GenerationLog
        items={[
          { id: "1", message: "川上庵の定休日を確認中…" },
          { id: "2", message: "営業時間を確認しました", status: "done" },
          { id: "3", message: "取得に失敗しました", status: "error" },
        ]}
      />,
    );
    const log = screen.getByRole("log");
    expect(log).toHaveAttribute("aria-live", "polite");
    expect(log).toHaveTextContent("川上庵の定休日を確認中…");
    expect(log).toHaveTextContent("営業時間を確認しました");
  });
});
