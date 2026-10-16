"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

/** コピーボタンのプロパティ。 @default undefined */
export interface CopyButtonProps {
  /** コピーする文字列。 @default undefined */
  value: string;
  /** 通常時のラベル。 @default "コピー" */
  label?: string;
  /** コピー後のラベル。 @default "コピーしました" */
  copiedLabel?: string;
  /** コピー完了時の処理。 @default undefined */
  onCopied?: () => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
  /** ルート要素への ref。 @default undefined */
  ref?: React.Ref<HTMLButtonElement>;
}

/** クリップボードへ文字列をコピーするボタン。 */
export function CopyButton({
  value,
  label = "コピー",
  copiedLabel = "コピーしました",
  onCopied,
  className,
  ref,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = async () => {
    const clipboard =
      typeof navigator !== "undefined" ? navigator.clipboard : undefined;
    if (clipboard?.writeText) {
      try {
        await clipboard.writeText(value);
      } catch {
        // クリップボードが使えない環境でも操作は続ける
      }
    }
    setCopied(true);
    onCopied?.();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        onClick={handleCopy}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-sunken",
          className,
        )}
      >
        {copied ? copiedLabel : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
