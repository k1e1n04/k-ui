"use client";

import type React from "react";
import { cn } from "../../../utils/cn";

/** ステッパーの手順。 @default undefined */
export interface StepperStep {
  /** 手順の一意な識別子。 @default undefined */
  id?: string;
  /** 手順のラベル。 @default undefined */
  label: React.ReactNode;
  /** 手順の説明。 @default undefined */
  description?: React.ReactNode;
  /** 無効状態。 @default false */
  disabled?: boolean;
}

/** 手順の進行状況を表示するステッパーのプロパティ。 @default undefined */
export interface StepperProps {
  /** 手順一覧。 @default undefined */
  steps: StepperStep[];
  /** 現在の手順インデックス。 @default undefined */
  activeStep: number;
  /** 手順クリック時の処理。 @default undefined */
  onStepClick?: (step: number) => void;
  /** 説明を省いた小さい表示にする。 @default false */
  compact?: boolean;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 現在の手順と任意の手順クリックを提供する横並びステッパー。 @default undefined */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  compact = false,
  className,
}) => {
  const currentStep = Math.min(
    Math.max(activeStep, 0),
    Math.max(steps.length - 1, 0),
  );
  return (
    <ol className={cn("flex w-full", className)} aria-label="手順">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const content = (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full border font-medium",
                compact ? "size-5 text-xs" : "size-7 text-sm",
                isActive || isCompleted
                  ? "border-primary-main bg-primary-main text-inverse"
                  : "border-border-strong bg-surface text-muted",
              )}
            >
              {isCompleted ? "✓" : index + 1}
            </span>
            <span className="min-w-0 text-left">
              <span
                className={cn(
                  "block font-medium text-foreground",
                  compact ? "text-xs" : "text-sm",
                )}
              >
                {step.label}
              </span>
              {!compact && step.description && (
                <span className="block text-xs text-muted">
                  {step.description}
                </span>
              )}
            </span>
          </>
        );
        return (
          <li
            key={step.id ?? String(step.label)}
            aria-current={isActive ? "step" : undefined}
            className="flex min-w-0 flex-1 items-start"
          >
            {onStepClick ? (
              <button
                type="button"
                disabled={step.disabled}
                onClick={() => onStepClick(index)}
                className="flex min-w-0 items-start gap-2 text-left focus-visible:outline-2 focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50"
              >
                {content}
              </button>
            ) : (
              <span className="flex min-w-0 items-start gap-2">{content}</span>
            )}
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px min-w-3 flex-1 bg-border",
                  compact ? "mx-2 mt-2.5" : "mx-3 mt-3",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};
