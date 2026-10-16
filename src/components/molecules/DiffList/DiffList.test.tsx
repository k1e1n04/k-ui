import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DiffList } from "./DiffList";

describe("DiffList", () => {
  it("追加・変更・削除を記号とラベルで示す", () => {
    render(
      <DiffList
        items={[
          { id: "1", kind: "add", label: "星野温泉" },
          {
            id: "2",
            kind: "change",
            label: "夕食",
            before: "18:00",
            after: "19:00",
            reason: "到着が遅れるため",
          },
          { id: "3", kind: "remove", label: "旧軽井沢" },
        ]}
      />,
    );
    expect(screen.getByText("追加")).toBeInTheDocument();
    expect(screen.getByText("変更")).toBeInTheDocument();
    expect(screen.getByText("削除")).toBeInTheDocument();
    expect(screen.getByText("18:00").tagName).toBe("DEL");
    expect(screen.getByText("19:00")).toBeInTheDocument();
    expect(screen.getByText("理由：到着が遅れるため")).toBeInTheDocument();
  });
});
