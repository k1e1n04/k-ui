import type { Meta, StoryObj } from "@storybook/react";

import { InquiryForm } from "./InquiryForm";

const meta = {
  title: "Molecules/InquiryForm",
  component: InquiryForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof InquiryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    propertyName: "グランドメゾン渋谷",
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <InquiryForm {...args} />
    </div>
  ),
};

export const WithDefaults: Story = {
  args: {
    propertyName: "パークサイド目黒",
    defaultValues: {
      name: "山田 太郎",
      email: "taro@example.com",
      message: "見学を希望します。",
    },
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <InquiryForm {...args} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    propertyName: "グランドメゾン渋谷",
    loading: true,
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <InquiryForm {...args} />
    </div>
  ),
};
