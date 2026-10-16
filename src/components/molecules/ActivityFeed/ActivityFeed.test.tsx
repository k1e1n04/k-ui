import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActivityFeed } from "./ActivityFeed";

describe("ActivityFeed", () => {
  it("操作した人と内容を一覧表示する", () => {
    render(
      <ActivityFeed
        items={[
          {
            id: "1",
            userName: "A",
            text: "候補を2件追加しました",
            time: "昨日",
          },
          { id: "2", avatar: { name: "B" }, text: "楽しみ!を押しました" },
        ]}
      />,
    );
    expect(
      screen.getByRole("list", { name: "アクティビティ" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("候補を2件追加しました")).toBeInTheDocument();
    expect(screen.getByText("昨日")).toBeInTheDocument();
  });
});
