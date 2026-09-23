"use client";

import type React from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../../utils/cn";

/**
 * コンボボックスの選択肢。
 *
 * @default undefined
 */
export interface ComboboxOption {
  /** 表示ラベル。 @default undefined */
  label: string;
  /** 選択時に返す値。 @default undefined */
  value: string;
  /** 選択肢を無効化するか。 @default false */
  disabled?: boolean;
}

/**
 * コンボボックスのプロパティ。
 *
 * @default undefined
 */
export interface ComboboxProps {
  /** 選択肢の一覧。 @default undefined */
  options: ComboboxOption[];
  /** 制御された選択値。 @default undefined */
  value?: string | string[];
  /** 選択値が変わったときのコールバック。 @default undefined */
  onChange: (value: string | string[]) => void;
  /** 検索語が変わったときのコールバック。 @default undefined */
  onQuery?: (query: string) => void;
  /** 複数選択を有効にするか。 @default false */
  multiple?: boolean;
  /**
   * 候補に一致しない自由入力を許可するか（単一選択のみ）。
   * 入力した文字列がそのまま値として onChange に渡る。 @default false
   */
  freeSolo?: boolean;
  /** 入力欄のラベルテキスト。 @default undefined */
  label?: string;
  /** 値が未選択のときに表示する文言。 @default "選択してください" */
  placeholder?: string;
  /** コンボボックス全体を無効化するか。 @default false */
  disabled?: boolean;
  /** ルート要素に追加するクラス名。 @default undefined */
  className?: string;
}

/**
 * 入力による候補絞り込みと単一・複数選択に対応するコンボボックス。
 *
 * @default undefined
 */
export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  onQuery,
  multiple = false,
  freeSolo = false,
  label,
  placeholder = "選択してください",
  disabled = false,
  className,
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listId = useId();
  const closeOptions = useCallback(() => {
    setOpen(false);
    setActiveIndex(null);
  }, []);
  const selected = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === "string"
      ? value
      : "";
  const selectedOptions = options.filter((option) =>
    multiple
      ? (selected as string[]).includes(option.value)
      : selected === option.value,
  );
  const selectedSingleLabel = multiple
    ? ""
    : (selectedOptions[0]?.label ??
      (freeSolo && typeof value === "string" ? value : ""));

  useEffect(() => {
    if (multiple) return;
    setQuery(selectedSingleLabel);
  }, [multiple, selectedSingleLabel]);
  useEffect(() => {
    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeOptions();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointerDown);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
  }, [closeOptions]);
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [options, query],
  );
  const choose = (option: ComboboxOption) => {
    if (option.disabled) return;
    if (multiple) {
      const current = selected as string[];
      onChange(
        current.includes(option.value)
          ? current.filter((item) => item !== option.value)
          : [...current, option.value],
      );
    } else {
      onChange(option.value);
      setQuery(option.label);
      closeOptions();
    }
  };
  const activateNextOption = () => {
    for (let offset = 1; offset <= filtered.length; offset += 1) {
      const nextIndex = ((activeIndex ?? -1) + offset) % filtered.length;
      if (!filtered[nextIndex].disabled) {
        setActiveIndex(nextIndex);
        return;
      }
    }
  };
  const activatePreviousOption = () => {
    for (let offset = 1; offset <= filtered.length; offset += 1) {
      const previousIndex =
        ((activeIndex ?? 0) - offset + filtered.length) % filtered.length;
      if (!filtered[previousIndex].disabled) {
        setActiveIndex(previousIndex);
        return;
      }
    }
  };
  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      {multiple && selectedOptions.length > 0 && (
        <div className="mb-1 flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="rounded bg-surface-sunken px-2 py-1 text-xs text-foreground"
            >
              {option.label}
            </span>
          ))}
        </div>
      )}
      <input
        id={inputId}
        role="combobox"
        aria-controls={listId}
        aria-expanded={open}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-activedescendant={
          activeIndex === null ? undefined : `${listId}-option-${activeIndex}`
        }
        disabled={disabled}
        placeholder={placeholder}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          const nextQuery = event.target.value;
          setQuery(nextQuery);
          setActiveIndex(null);
          setOpen(true);
          onQuery?.(nextQuery);
          if (freeSolo && !multiple) {
            onChange(nextQuery);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeOptions();
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            activateNextOption();
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            activatePreviousOption();
          }
          if (event.key === "Enter" && activeIndex !== null) {
            event.preventDefault();
            choose(filtered[activeIndex]);
          }
        }}
        className="w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-info-main disabled:cursor-not-allowed disabled:opacity-50"
      />
      {open && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-[var(--kui-z-popover)] mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-surface p-1 shadow-lg"
        >
          {filtered.map((option, index) => {
            const selectedOption = multiple
              ? (selected as string[]).includes(option.value)
              : selected === option.value;
            return (
              <button
                key={option.value}
                id={`${listId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={selectedOption}
                data-active={activeIndex === index || undefined}
                disabled={option.disabled}
                onClick={() => choose(option)}
                className={cn(
                  "block w-full cursor-pointer rounded px-3 py-2 text-left text-sm hover:bg-surface-sunken",
                  option.disabled && "cursor-not-allowed opacity-50",
                  selectedOption && "bg-surface-sunken",
                )}
              >
                {option.label}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-3 py-2 text-sm text-muted">候補がありません</p>
          )}
        </div>
      )}
    </div>
  );
};
