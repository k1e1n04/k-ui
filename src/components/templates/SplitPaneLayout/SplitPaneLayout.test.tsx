import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SplitPaneLayout } from "./SplitPaneLayout";

describe("SplitPaneLayout", () => {
  it("ヘッダー・サイドバー・メインを描画する", () => {
    render(
      <SplitPaneLayout
        header={<span>ヘッダー</span>}
        sidebar={<span>サイドバー</span>}
        main={<span>メイン</span>}
      />,
    );
    expect(screen.getByText("ヘッダー")).toBeInTheDocument();
    expect(screen.getByText("サイドバー")).toBeInTheDocument();
    expect(screen.getByText("メイン")).toBeInTheDocument();
  });

  it("サイドバーにランドマークを付与する", () => {
    render(<SplitPaneLayout sidebar={<span>サイドバー</span>} />);
    expect(
      screen.getByRole("complementary", { name: "サイドバー" }),
    ).toBeInTheDocument();
  });

  it("サイドバーのラベルを変更できる", () => {
    render(
      <SplitPaneLayout
        sidebar={<span>サイドバー</span>}
        sidebarLabel="検索条件"
      />,
    );
    expect(
      screen.getByRole("complementary", { name: "検索条件" }),
    ).toBeInTheDocument();
  });
});
