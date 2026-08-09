"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { ButtonGroup } from "./ButtonGroup";

const meta = {
  title: "Atoms/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  ),
};
