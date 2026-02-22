import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../atoms/Button";
import { EmptyState } from "./EmptyState";

const CalendarIcon = () => (
  <svg
    className="h-10 w-10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v10.5A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V7.5A2.25 2.25 0 0 1 6 5.25Z"
    />
  </svg>
);

const meta = {
  title: "Templates/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    align: {
      control: "select",
      options: ["left", "center"],
    },
    actionPlacement: {
      control: "select",
      options: ["below", "inline"],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No data available",
    description: "Add your first item to get started.",
    size: "md",
    align: "center",
    actionPlacement: "below",
  },
};

export const WithIconAndAction: Story = {
  args: {
    icon: <CalendarIcon />,
    title: "No trips found",
    description: "Create a trip and manage your travel schedule.",
    action: <Button variant="primary">Create trip</Button>,
    size: "md",
    align: "center",
    actionPlacement: "below",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "No messages",
    size: "md",
    align: "center",
  },
};

export const ListEmptyState: Story = {
  args: {
    icon: <CalendarIcon />,
    title: "表示できる案件がありません",
    description: "条件に一致するデータがまだ登録されていません。",
    action: <Button variant="secondary">新規作成</Button>,
    size: "lg",
    align: "left",
    actionPlacement: "below",
  },
  parameters: {
    layout: "padded",
  },
};

export const NoSearchResults: Story = {
  args: {
    title: "検索結果が見つかりません",
    description: "キーワードやフィルターを変更して再検索してください。",
    action: <Button variant="ghost">条件をリセット</Button>,
    size: "sm",
    align: "center",
    actionPlacement: "inline",
  },
};
