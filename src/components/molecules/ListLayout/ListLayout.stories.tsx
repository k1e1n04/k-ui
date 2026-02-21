import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { ListItem } from "../ListItem";
import { ListLayout } from "./ListLayout";

const meta = {
  title: "Molecules/ListLayout",
  component: ListLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof ListLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Shopping List",
    searchKeyword: "",
    onSearchChange: () => {},
    showSearchForm: false,
    onToggleSearch: () => {},
    showFilterOptions: false,
    onToggleFilter: () => {},
    incompleteFilterLabel: "Show incomplete only",
    onAddClick: () => {},
    children: (
      <>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: "Loading List",
    searchKeyword: "",
    onSearchChange: () => {},
    showSearchForm: false,
    onToggleSearch: () => {},
    showFilterOptions: false,
    onToggleFilter: () => {},
    incompleteFilterLabel: "Show incomplete only",
    isLoading: true,
    children: null,
  },
};

export const Error: Story = {
  args: {
    title: "Error List",
    searchKeyword: "",
    onSearchChange: () => {},
    showSearchForm: false,
    onToggleSearch: () => {},
    showFilterOptions: false,
    onToggleFilter: () => {},
    incompleteFilterLabel: "Show incomplete only",
    isError: true,
    onReload: () => {},
    children: null,
  },
};

export const Empty: Story = {
  args: {
    title: "Empty List",
    searchKeyword: "",
    onSearchChange: () => {},
    showSearchForm: false,
    onToggleSearch: () => {},
    showFilterOptions: false,
    onToggleFilter: () => {},
    incompleteFilterLabel: "Show incomplete only",
    emptyMessage: "No items yet. Add something!",
    onAddClick: () => {},
    children: null,
  },
};

export const Interactive: Story = {
  args: {
    title: "",
    searchKeyword: "",
    onSearchChange: () => {},
    showSearchForm: false,
    onToggleSearch: () => {},
    showFilterOptions: false,
    onToggleFilter: () => {},
    incompleteFilterLabel: "Show incomplete only",
    children: null,
  },
  render: function InteractiveListLayout() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [showIncomplete, setShowIncomplete] = useState(false);

    const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <ListLayout
        title="Fruits"
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        showSearchForm={showSearch}
        onToggleSearch={setShowSearch}
        showFilterOptions={showFilter}
        onToggleFilter={setShowFilter}
        showOnlyIncomplete={showIncomplete}
        onToggleIncomplete={setShowIncomplete}
        incompleteFilterLabel="Show favorites only"
        onAddClick={() => alert("Add clicked")}
        emptyMessage="No fruits"
        noSearchResultsMessage="No matching fruits"
      >
        {filtered.map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </ListLayout>
    );
  },
};
