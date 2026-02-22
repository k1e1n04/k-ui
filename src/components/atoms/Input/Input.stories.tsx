import type { Meta, StoryObj } from "@storybook/react";
import type { FormEvent } from "react";
import { useState } from "react";

import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "date", "time", "url", "month", "hidden"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Email",
  },
};

export const WithLabelAndPlaceholder: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    required: true,
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "invalid",
    error: "Please enter a valid email address",
  },
};

export const RequiredWithError: Story = {
  args: {
    label: "Email",
    required: true,
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    disabled: true,
    placeholder: "Enter your email",
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Email",
    disabled: true,
    value: "user@example.com",
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    size: "small",
    placeholder: "Small input",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium",
    size: "medium",
    placeholder: "Medium input",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "large",
    placeholder: "Large input",
  },
};

export const TypeDate: Story = {
  args: {
    type: "date",
    label: "Date",
  },
};

export const TypeNumber: Story = {
  args: {
    type: "number",
    label: "Amount",
    placeholder: "0",
  },
};

export const NumberWithConstraints: Story = {
  args: {
    type: "number",
    label: "Amount",
    name: "amount",
    min: 0,
    max: 100,
    step: 5,
    inputMode: "numeric",
    autoComplete: "off",
    placeholder: "0",
  },
};

export const TypeTime: Story = {
  args: {
    type: "time",
    label: "Time",
  },
};

export const TypeUrl: Story = {
  args: {
    type: "url",
    label: "Website",
    placeholder: "https://example.com",
  },
};

export const TypeMonth: Story = {
  args: {
    type: "month",
    label: "Month",
  },
};

/**
 * type="hidden" はフォームライブラリ（react-hook-form 等）で内部値を保持する際に使用する。
 * UI は一切レンダリングされず、name と value のみを持つ hidden input として機能する。
 */
export const TypeHidden: Story = {
  args: {
    type: "hidden",
    name: "csrf_token",
    value: "abc123",
  },
  render: (args) => (
    <div>
      <p className="text-sm text-gray-500 mb-2">
        Hidden input（画面には何も表示されません）
      </p>
      <Input {...args} />
    </div>
  ),
};

/** インタラクティブなデモ */
export const Interactive: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <Input {...args} value={value} onChange={setValue} />;
  },
};

/** フォーム送信時に name/value が連携される例 */
export const FormIntegration: Story = {
  render: () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [submitted, setSubmitted] = useState<Record<string, string> | null>(
      null,
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      setSubmitted({
        displayName: String(formData.get("displayName") ?? ""),
        age: String(formData.get("age") ?? ""),
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        <Input
          label="Display Name"
          name="displayName"
          value={name}
          onChange={setName}
          autoComplete="nickname"
        />
        <Input
          type="number"
          label="Age"
          name="age"
          value={age}
          onChange={setAge}
          min={0}
          max={120}
          step={1}
          inputMode="numeric"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-[var(--kui-color-info)] text-white text-sm"
        >
          Submit
        </button>
        {submitted && (
          <pre className="text-xs bg-gray-100 p-2 rounded-md">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        )}
      </form>
    );
  },
};
