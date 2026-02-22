import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  DataTable,
  type DataTableAction,
  type DataTableColumn,
} from "./DataTable";

type UserRow = {
  id: string;
  name: string;
  role: string;
};

const columns: DataTableColumn<UserRow>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => row.name,
  },
  {
    key: "role",
    header: "Role",
    render: (row) => row.role,
  },
];

const rows: UserRow[] = [
  { id: "1", name: "Ken", role: "Admin" },
  { id: "2", name: "Nao", role: "Editor" },
];

describe("DataTable", () => {
  it("ヘッダーと行データを表示する", () => {
    render(
      <DataTable<UserRow>
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
      />,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Ken")).toBeInTheDocument();
    expect(screen.getByText("Editor")).toBeInTheDocument();
  });

  it("isLoading=true でローディング表示を出す", () => {
    render(
      <DataTable<UserRow>
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        isLoading
        loadingLabel="Loading users"
      />,
    );

    expect(screen.getByText("Loading users")).toBeInTheDocument();
  });

  it("データ0件時に空状態メッセージを表示する", () => {
    render(
      <DataTable<UserRow>
        columns={columns}
        rows={[]}
        getRowId={(row) => row.id}
        emptyMessage="No users yet"
      />,
    );

    expect(screen.getByText("No users yet")).toBeInTheDocument();
  });

  it("アクション押下で行データを渡してコールバックを呼ぶ", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const actions: DataTableAction<UserRow>[] = [
      {
        label: "Edit",
        variant: "outline",
        onClick: onEdit,
      },
    ];

    render(
      <DataTable<UserRow>
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        actions={actions}
      />,
    );

    await user.click(screen.getAllByRole("button", { name: "Edit" })[0]);
    expect(onEdit).toHaveBeenCalledWith(rows[0]);
  });

  it("mobileMode=cards でカード表示をレンダリングする", () => {
    render(
      <DataTable<UserRow>
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        mobileMode="cards"
      />,
    );

    expect(screen.getAllByText("Name").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Nao").length).toBeGreaterThan(0);
  });
});
