import type { Meta, StoryObj } from "@storybook/react";

import {
  DataTable,
  type DataTableAction,
  type DataTableColumn,
} from "./DataTable";

type TaskRow = {
  id: string;
  title: string;
  owner: string;
  status: "Open" | "Done";
};

const taskColumns: DataTableColumn<TaskRow>[] = [
  {
    key: "title",
    header: "Title",
    render: (row) => row.title,
  },
  {
    key: "owner",
    header: "Owner",
    render: (row) => row.owner,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => row.status,
  },
];

const taskRows: TaskRow[] = [
  { id: "task-1", title: "Refresh landing copy", owner: "Ken", status: "Open" },
  { id: "task-2", title: "Fix mobile spacing", owner: "Nao", status: "Done" },
  { id: "task-3", title: "Update docs", owner: "Ken", status: "Open" },
];

const largeTaskRows: TaskRow[] = Array.from({ length: 2000 }, (_, idx) => ({
  id: `task-${idx + 1}`,
  title: `Task ${idx + 1}`,
  owner: idx % 2 === 0 ? "Ken" : "Nao",
  status: idx % 3 === 0 ? "Done" : "Open",
}));

const taskActions: DataTableAction<TaskRow>[] = [
  {
    label: "Edit",
    variant: "outline",
    onClick: () => {},
  },
  {
    label: "Delete",
    variant: "danger",
    onClick: () => {},
  },
];

const meta = {
  title: "Molecules/DataTable",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataTable<TaskRow>
      columns={taskColumns}
      rows={taskRows}
      getRowId={(row) => row.id}
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <DataTable<TaskRow>
      columns={taskColumns}
      rows={taskRows}
      getRowId={(row) => row.id}
      actions={taskActions}
      actionHeader="Actions"
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DataTable<TaskRow>
      columns={taskColumns}
      rows={taskRows}
      getRowId={(row) => row.id}
      isLoading
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable<TaskRow>
      columns={taskColumns}
      rows={[]}
      getRowId={(row) => row.id}
      emptyMessage="No tasks available"
    />
  ),
};

export const MobileCards: Story = {
  render: () => (
    <DataTable<TaskRow>
      columns={taskColumns}
      rows={taskRows}
      getRowId={(row) => row.id}
      actions={taskActions}
      mobileMode="cards"
    />
  ),
};

export const VirtualizedLargeDataset: Story = {
  render: () => (
    <DataTable<TaskRow>
      columns={taskColumns}
      rows={largeTaskRows}
      getRowId={(row) => row.id}
      virtualized
      height={420}
      rowHeight={52}
      overscan={6}
    />
  ),
};
