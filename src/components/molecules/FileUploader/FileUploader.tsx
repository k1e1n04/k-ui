"use client";

import type React from "react";
import { useId, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

/** ドラッグ&ドロップとファイル入力に対応するファイルアップローダーのプロパティ。 @default undefined */
export interface FileUploaderProps {
  /** 受け入れるファイル形式。 @default undefined */
  accept?: string;
  /** 複数ファイルを選択できるか。 @default false */
  multiple?: boolean;
  /** 1 ファイルあたりの最大バイト数。 @default undefined */
  maxSizeBytes?: number;
  /** 有効なファイルを選択した時の処理。 @default undefined */
  onFilesSelected: (files: File[]) => void;
  /** 無効状態。 @default false */
  disabled?: boolean;
  /** 操作ラベル。 @default "ファイルを選択" */
  label?: string;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

const acceptsFile = (file: File, accept?: string) => {
  if (!accept) return true;
  return accept.split(",").some((rule) => {
    const accepted = rule.trim().toLowerCase();
    if (!accepted) return true;
    if (accepted.startsWith("."))
      return file.name.toLowerCase().endsWith(accepted);
    if (accepted.endsWith("/*"))
      return file.type.toLowerCase().startsWith(accepted.slice(0, -1));
    return file.type.toLowerCase() === accepted;
  });
};

/** 選択・ドロップしたファイルを検証して通知するアップローダー。 @default undefined */
export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  multiple = false,
  maxSizeBytes,
  onFilesSelected,
  disabled = false,
  label = "ファイルを選択",
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [error, setError] = useState<string>();
  const [selectedCount, setSelectedCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const selectFiles = (fileList: FileList | File[]) => {
    if (disabled) return;
    const candidates = Array.from(fileList);
    const limitedCandidates = multiple ? candidates : candidates.slice(0, 1);
    const rejected = limitedCandidates.filter(
      (file) =>
        !acceptsFile(file, accept) ||
        (maxSizeBytes !== undefined && file.size > maxSizeBytes),
    );
    const valid = limitedCandidates.filter((file) => !rejected.includes(file));
    setError(
      rejected.length
        ? `次のファイルは形式またはサイズの条件を満たしていません: ${rejected.map((file) => file.name).join("、")}`
        : undefined,
    );
    setSelectedCount(valid.length);
    if (valid.length) onFilesSelected(valid);
  };
  return (
    <div className={className}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label}
        className="sr-only"
        onChange={(event) => {
          if (event.target.files) selectFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          selectFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center rounded border-2 border-dashed border-border-strong bg-surface-raised px-6 py-8 text-center text-sm text-foreground hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50",
          isDragging && "border-primary-main bg-surface-sunken",
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="mt-1 text-muted">
          ドラッグ&ドロップでも追加できます
        </span>
      </button>
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-2 text-sm text-danger-main"
        >
          {error}
        </p>
      )}
      {selectedCount > 0 && !error && (
        <output className="mt-2 text-sm text-muted">
          {selectedCount}件のファイルを選択しました
        </output>
      )}
    </div>
  );
};
