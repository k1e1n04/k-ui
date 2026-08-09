import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Stepper } from "./Stepper";

const steps = [
  { label: "入力", description: "情報を入力します" },
  { label: "確認", description: "内容を確認します" },
  { label: "完了", description: "手続きが完了します" },
];

const meta = {
  title: "Molecules/Stepper",
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { steps, activeStep: 1 },
};

export const Clickable: StoryObj<typeof meta> = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />
    );
  },
};
