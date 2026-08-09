import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

describe("Combobox", () => {
  it("外側をクリックすると候補リストを閉じる", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Combobox
          options={[{ label: "東京", value: "tokyo" }]}
          onChange={vi.fn()}
        />
        <button type="button">外側</button>
      </>,
    );

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "外側" }));
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("閉じた候補リストの項目を aria-activedescendant で参照しない", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Combobox
          options={[{ label: "東京", value: "tokyo" }]}
          onChange={vi.fn()}
        />
        <button type="button">外側</button>
      </>,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("{ArrowDown}");
    await user.click(screen.getByRole("button", { name: "外側" }));

    expect(input).not.toHaveAttribute("aria-activedescendant");
  });

  it("Escape キーで候補リストを閉じる", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={[{ label: "東京", value: "tokyo" }]}
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("ArrowDown キーで最初の有効な候補をアクティブにする", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={[
          { label: "無効な候補", value: "disabled", disabled: true },
          { label: "東京", value: "tokyo" },
        ]}
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("{ArrowDown}");

    const activeOption = screen.getByRole("option", { name: "東京" });
    expect(input).toHaveAttribute("aria-activedescendant", activeOption.id);
    expect(activeOption).toHaveAttribute("data-active", "true");
  });

  it("ArrowUp キーで最後の有効な候補をアクティブにする", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={[
          { label: "東京", value: "tokyo" },
          { label: "大阪", value: "osaka" },
          { label: "無効な候補", value: "disabled", disabled: true },
        ]}
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("{ArrowUp}");

    const activeOption = screen.getByRole("option", { name: "大阪" });
    expect(input).toHaveAttribute("aria-activedescendant", activeOption.id);
    expect(activeOption).toHaveAttribute("data-active", "true");
  });

  it("Enter キーでアクティブな候補を選択する", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Combobox
        options={[
          { label: "東京", value: "tokyo" },
          { label: "大阪", value: "osaka" },
        ]}
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith("tokyo");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("入力で候補を絞り込み選択値を返す", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Combobox
        options={[
          { label: "東京", value: "tokyo" },
          { label: "大阪", value: "osaka" },
        ]}
        onChange={onChange}
      />,
    );
    await user.type(screen.getByRole("combobox"), "東");
    expect(screen.getByRole("option", { name: "東京" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "大阪" })).toBeNull();
    await user.click(screen.getByRole("option", { name: "東京" }));
    expect(onChange).toHaveBeenCalledWith("tokyo");
  });

  it("制御された単一選択値と外部更新を入力表示へ同期する", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState("tokyo");
      return (
        <>
          <button type="button" onClick={() => setValue("osaka")}>
            外部更新
          </button>
          <Combobox
            options={[
              { label: "東京", value: "tokyo" },
              { label: "大阪", value: "osaka" },
            ]}
            value={value}
            onChange={setValue}
          />
        </>
      );
    };
    render(<Controlled />);
    expect(screen.getByRole("combobox")).toHaveValue("東京");
    await user.click(screen.getByRole("button", { name: "外部更新" }));
    expect(screen.getByRole("combobox")).toHaveValue("大阪");
  });

  it("複数選択の制御値を選択済みラベルとして表示する", () => {
    render(
      <Combobox
        multiple
        value={["tokyo", "osaka"]}
        onChange={vi.fn()}
        options={[
          { label: "東京", value: "tokyo" },
          { label: "大阪", value: "osaka" },
        ]}
      />,
    );
    expect(screen.getByText("東京")).toBeInTheDocument();
    expect(screen.getByText("大阪")).toBeInTheDocument();
  });

  it("無効な候補を native disabled として公開しタブ順から除外する", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={[
          { label: "無効な候補", value: "disabled", disabled: true },
          { label: "選択可能", value: "enabled" },
        ]}
        onChange={vi.fn()}
      />,
    );
    const input = screen.getByRole("combobox");
    await user.click(input);
    expect(screen.getByRole("option", { name: "無効な候補" })).toBeDisabled();
    await user.tab();
    expect(screen.getByRole("option", { name: "選択可能" })).toHaveFocus();
  });
});
