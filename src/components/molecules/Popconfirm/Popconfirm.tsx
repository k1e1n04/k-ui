"use client";

import type React from "react";
import { useState } from "react";
import { Popover } from "../Popover";

/** 確認ポップオーバーのプロパティ。 @default undefined */
export interface PopconfirmProps {
  /** ポップオーバーを開くトリガー要素。 @default undefined */
  children: React.ReactElement;
  /** 確認の見出し。 @default undefined */
  title: React.ReactNode;
  /** 確認の説明。 @default undefined */
  description?: React.ReactNode;
  /** 確認時の処理。 @default undefined */
  onConfirm: () => void;
  /** キャンセル時の処理。 @default undefined */
  onCancel?: () => void;
  /** 確認ボタンのラベル。 @default "確認" */
  confirmLabel?: string;
  /** キャンセルボタンのラベル。 @default "キャンセル" */
  cancelLabel?: string;
}
/** 操作前にインラインで確認を求めるポップオーバー。 @default undefined */
export const Popconfirm: React.FC<PopconfirmProps> = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "確認",
  cancelLabel = "キャンセル",
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover trigger={children} open={open} onOpenChange={setOpen}>
      <p className="font-medium">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            onCancel?.();
            setOpen(false);
          }}
          className="rounded px-3 py-1.5 text-sm hover:bg-surface-sunken"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
          className="rounded bg-primary-main px-3 py-1.5 text-sm text-inverse hover:bg-primary-light"
        >
          {confirmLabel}
        </button>
      </div>
    </Popover>
  );
};
