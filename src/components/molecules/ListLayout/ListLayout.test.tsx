import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ListLayout, type ListLayoutProps } from "./ListLayout";

const createProps = (
  overrides: Partial<ListLayoutProps> = {},
): ListLayoutProps => ({
  title: "Tasks",
  searchKeyword: "",
  onSearchChange: vi.fn(),
  showSearchForm: false,
  onToggleSearch: vi.fn(),
  showFilterOptions: false,
  onToggleFilter: vi.fn(),
  incompleteFilterLabel: "Only incomplete",
  children: null,
  ...overrides,
});

describe("ListLayout", () => {
  it("タイトルと空状態メッセージを表示する", () => {
    render(<ListLayout {...createProps()} />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("Add items to get started")).toBeInTheDocument();
  });

  it("検索ボタン押下で onToggleSearch(true) が呼ばれる", async () => {
    const user = userEvent.setup();
    const onToggleSearch = vi.fn();
    render(<ListLayout {...createProps({ onToggleSearch })} />);

    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(onToggleSearch).toHaveBeenCalledWith(true);
  });

  it("検索フォーム入力で onSearchChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <ListLayout
        {...createProps({
          showSearchForm: true,
          onSearchChange,
        })}
      />,
    );

    await user.type(screen.getByPlaceholderText("Search..."), "abc");
    expect(onSearchChange).toHaveBeenCalled();
  });

  it("フィルターボタン押下で onToggleFilter が呼ばれる", async () => {
    const user = userEvent.setup();
    const onToggleFilter = vi.fn();
    render(
      <ListLayout
        {...createProps({
          showFilterOptions: false,
          onToggleFilter,
        })}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(onToggleFilter).toHaveBeenCalledWith(true);
  });

  it("フィルターのチェック変更で onToggleIncomplete が呼ばれる", async () => {
    const user = userEvent.setup();
    const onToggleIncomplete = vi.fn();
    render(
      <ListLayout
        {...createProps({
          showFilterOptions: true,
          showOnlyIncomplete: false,
          onToggleIncomplete,
        })}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Only incomplete" }));
    expect(onToggleIncomplete).toHaveBeenCalledWith(true);
  });

  it("onToggleAddForm がある場合は追加/閉じるボタンでコールバックが呼ばれる", async () => {
    const user = userEvent.setup();
    const onToggleAddForm = vi.fn();
    render(
      <ListLayout
        {...createProps({
          onToggleAddForm,
          showAddForm: false,
        })}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Add new" }));
    expect(onToggleAddForm).toHaveBeenCalledWith(true);
  });

  it("isLoading=true のときローディング表示を出す", () => {
    const { container } = render(
      <ListLayout
        {...createProps({
          isLoading: true,
        })}
      />,
    );

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("isError=true のときエラー表示と再読込ボタンを出す", async () => {
    const user = userEvent.setup();
    const onReload = vi.fn();
    render(
      <ListLayout
        {...createProps({
          isError: true,
          onReload,
        })}
      />,
    );

    expect(screen.getByText("Failed to fetch data.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reload" }));
    expect(onReload).toHaveBeenCalledOnce();
  });
});
