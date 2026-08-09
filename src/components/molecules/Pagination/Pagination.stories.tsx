import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} totalPages={10} onChange={setPage} />;
  },
};
