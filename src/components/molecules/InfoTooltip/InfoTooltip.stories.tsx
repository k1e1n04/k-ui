import type { Meta, StoryObj } from "@storybook/react";

import { InfoTooltip } from "./InfoTooltip";

const meta = {
  title: "Molecules/InfoTooltip",
  component: InfoTooltip,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof InfoTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is helpful information.",
  },
};

export const WithRichContent: Story = {
  args: {
    content: (
      <div>
        <p className="font-semibold mb-1">Interest Rate</p>
        <p>The annual rate used to calculate your monthly payments.</p>
      </div>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    content: "Small tooltip trigger.",
    size: "sm",
  },
};

export const CustomLabel: Story = {
  args: {
    content: "Detailed explanation of this field.",
    label: "Field explanation",
  },
};

/** フォームラベル横に配置する例 */
export const WithFormLabel: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Interest Rate
      </span>
      <InfoTooltip
        content="The annual percentage rate applied to your loan balance."
        size="sm"
      />
    </div>
  ),
};
