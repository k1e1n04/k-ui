import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    size: {
      control: "select",
      options: ["xl", "lg", "md", "sm"],
    },
    tone: {
      control: "select",
      options: ["default", "muted", "inverse"],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: "h2",
    size: "md",
    children: "Section heading",
  },
};

export const Hierarchy: Story = {
  render: () => (
    <div className="space-y-3">
      <Heading as="h1" size="xl">
        H1 Page Title
      </Heading>
      <Heading as="h2" size="lg">
        H2 Section
      </Heading>
      <Heading as="h3" size="md">
        H3 Subsection
      </Heading>
      <Heading as="h4" size="sm">
        H4 Minor Heading
      </Heading>
    </div>
  ),
};
