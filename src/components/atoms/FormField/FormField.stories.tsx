import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Input } from "../Input";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { FormField } from "./FormField";

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const meta = {
  title: "Atoms/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    description: "通知先として使用します。",
  },
  render: (args) => (
    <FormField {...args}>
      {({ describedBy }) => (
        <Input
          placeholder="name@example.com"
          aria-describedby={describedBy}
          aria-label="Email"
        />
      )}
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    label: "Email",
    required: true,
    error: "メールアドレスの形式が不正です。",
  },
  render: (args) => (
    <FormField {...args}>
      {({ describedBy }) => (
        <Input
          value="invalid"
          aria-describedby={describedBy}
          aria-label="Email"
        />
      )}
    </FormField>
  ),
};

export const RecommendedComposition: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [fruit, setFruit] = useState("");
    const [note, setNote] = useState("");

    return (
      <div className="max-w-md space-y-4">
        <FormField
          label="Email"
          required
          description="アカウント通知に利用します。"
        >
          {({ describedBy }) => (
            <Input
              value={email}
              onChange={setEmail}
              placeholder="name@example.com"
              aria-describedby={describedBy}
              aria-label="Email"
            />
          )}
        </FormField>

        <FormField label="Favorite fruit">
          {({ describedBy }) => (
            <Select
              options={fruitOptions}
              value={fruit}
              onChange={setFruit}
              placeholder="Select a fruit"
              clearable
              aria-describedby={describedBy}
              aria-label="Favorite fruit"
            />
          )}
        </FormField>

        <FormField
          label="Note"
          description="10文字以上で入力してください。"
          error={
            note.length > 0 && note.length < 10
              ? "10文字以上必要です。"
              : undefined
          }
        >
          {({ describedBy }) => (
            <Textarea
              value={note}
              onChange={setNote}
              rows={4}
              placeholder="自由入力"
              aria-describedby={describedBy}
              aria-label="Note"
            />
          )}
        </FormField>
      </div>
    );
  },
};
