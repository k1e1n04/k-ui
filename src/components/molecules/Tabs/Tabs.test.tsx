import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("矢印キーでタブを切り替え対応するパネルを表示する", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs
        value="one"
        onChange={onChange}
        items={[
          { value: "one", label: "一", content: "一の内容" },
          { value: "two", label: "二", content: "二の内容" },
        ]}
      />,
    );
    await user.click(screen.getByRole("tab", { name: "一" }));
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("two");
  });
});
