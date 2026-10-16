"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cn } from "../../../utils/cn";

/** お祝いの種類。 @default undefined */
export type CelebrationVariant = "confetti" | "stamp";

/** お祝い演出のプロパティ。 @default undefined */
export interface CelebrationProps {
  /** 表示するか。 @default undefined */
  show: boolean;
  /** 演出の種類。 @default "confetti" */
  variant?: CelebrationVariant;
  /** 表示するメッセージ。 @default undefined */
  message?: React.ReactNode;
  /** 表示時間（ミリ秒）。 @default 800 */
  duration?: number;
  /** 表示が終わった時の処理。 @default undefined */
  onDone?: () => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 紙吹雪の色。トークンの範囲で複数色を混ぜる。 */
const particleColors = [
  "bg-accent-main",
  "bg-cat-move",
  "bg-cat-meal",
  "bg-cat-sight",
  "bg-cat-shopping",
];

/** 紙吹雪の粒。位置と色を固定し、安定した識別子を持たせる。 */
const particles = Array.from({ length: 12 }, (_, index) => ({
  id: `particle-${index}`,
  color: particleColors[index % particleColors.length],
  left: `${(index / 12) * 100}%`,
  delay: `${(index % 4) * 40}ms`,
}));

/**
 * プラン確定や準備完了を祝う演出。音とバイブは使わない（§7.2）。
 * 動きを減らす設定ではフェードだけになる。
 */
export const Celebration: React.FC<CelebrationProps> = ({
  show,
  variant = "confetti",
  message,
  duration = 800,
  onDone,
  className,
}) => {
  const reduced = useReducedMotion();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => onDoneRef.current?.(), duration);
    return () => clearTimeout(timer);
  }, [show, duration]);

  if (!show) return null;
  const showParticles = !reduced && variant === "confetti";

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-none fixed inset-0 z-[var(--kui-z-overlay)] flex items-center justify-center",
        className,
      )}
    >
      {showParticles && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className={cn(
                "absolute top-0 block size-2 rounded-sm animate-kui-slide-down",
                particle.color,
              )}
              style={{ left: particle.left, animationDelay: particle.delay }}
            />
          ))}
        </div>
      )}
      <p className="animate-kui-fade-in rounded-xl bg-surface px-6 py-4 text-center text-2xl font-semibold text-foreground shadow-lg">
        {message ?? (variant === "stamp" ? "準備完了" : "決定しました")}
      </p>
    </div>
  );
};
