import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";

import { Typography } from "./Typography";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div", "label", "small"],
    },
    variant: {
      control: "select",
      options: ["body-sm", "body-md", "body-lg", "caption", "label"],
    },
    tone: {
      control: "select",
      options: [
        "default",
        "muted",
        "inverse",
        "danger",
        "success",
        "info",
        "warning",
      ],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    truncate: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "body-md",
    tone: "default",
    children: "Standard body text",
  },
};

export const Tones: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography tone="default">Default tone</Typography>
      <Typography tone="muted">Muted tone</Typography>
      <Typography tone="danger">Danger tone</Typography>
      <Typography tone="success">Success tone</Typography>
      <Typography tone="info">Info tone</Typography>
      <Typography tone="warning">Warning tone</Typography>
      <div className="rounded-md bg-[--kui-color-text] p-3">
        <Typography tone="inverse">Inverse tone</Typography>
      </div>
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div className="max-w-56">
      <Typography truncate>
        This is very long text for one-line truncation behavior in list cards.
      </Typography>
    </div>
  ),
};

export const LightDarkComparison: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-md border border-[--kui-color-border] bg-[--kui-color-surface] p-4">
        <Typography as="div" variant="label">
          Light
        </Typography>
        <Typography tone="default">Readable primary text</Typography>
        <Typography tone="muted">Readable secondary text</Typography>
      </div>
      <div
        className="rounded-md border p-4"
        style={
          {
            "--kui-color-surface": "#1f2937",
            "--kui-color-border": "#374151",
            "--kui-color-text": "#f3f4f6",
            "--kui-color-text-muted": "#9ca3af",
          } as React.CSSProperties
        }
      >
        <Typography as="div" variant="label">
          Dark
        </Typography>
        <Typography tone="default">Readable primary text</Typography>
        <Typography tone="muted">Readable secondary text</Typography>
      </div>
    </div>
  ),
};
