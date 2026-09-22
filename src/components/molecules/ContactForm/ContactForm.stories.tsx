import type { Meta, StoryObj } from "@storybook/react";

import { ContactForm } from "./ContactForm";

const meta = {
  title: "Molecules/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subject: "グランドメゾン渋谷",
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <ContactForm {...args} />
    </div>
  ),
};

export const WithDefaults: Story = {
  args: {
    subject: "パークサイド目黒",
    defaultValues: {
      name: "山田 太郎",
      email: "taro@example.com",
      message: "見学を希望します。",
    },
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <ContactForm {...args} />
    </div>
  ),
};

export const MinimalFields: Story = {
  args: {
    subject: "お問い合わせ",
    showPhone: false,
    showDate: false,
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <ContactForm {...args} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    subject: "グランドメゾン渋谷",
    loading: true,
    onSubmit: () => {},
  },
  render: (args) => (
    <div className="max-w-lg">
      <ContactForm {...args} />
    </div>
  ),
};
