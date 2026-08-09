import type React from "react";
/** ステッパーの手順。 @default undefined */
export interface StepperStep {
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
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 現在の手順と任意の手順クリックを提供する横並びステッパー。 @default undefined */
export declare const Stepper: React.FC<StepperProps>;
//# sourceMappingURL=Stepper.d.ts.map