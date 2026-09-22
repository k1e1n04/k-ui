import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MapSearchLayout } from "./MapSearchLayout";

describe("MapSearchLayout", () => {
  it("ヘッダー・サイドバー・地図を描画する", () => {
    render(
      <MapSearchLayout
        header={<span>ヘッダー</span>}
        sidebar={<span>サイドバー</span>}
        map={<span>地図</span>}
      />,
    );
    expect(screen.getByText("ヘッダー")).toBeInTheDocument();
    expect(screen.getByText("サイドバー")).toBeInTheDocument();
    expect(screen.getByText("地図")).toBeInTheDocument();
  });

  it("サイドバーにランドマークを付与する", () => {
    render(<MapSearchLayout sidebar={<span>サイドバー</span>} />);
    expect(
      screen.getByRole("complementary", { name: "検索条件と結果" }),
    ).toBeInTheDocument();
  });
});
