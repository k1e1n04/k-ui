"use client";

import type React from "react";
import { useId, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

/** アコーディオン項目。 @default undefined */
export interface AccordionItem {
  /** 項目を識別する値。 @default undefined */
  value: string;
  /** 見出し。 @default undefined */
  title: React.ReactNode;
  /** 展開時の内容。 @default undefined */
  content: React.ReactNode;
  /** 無効状態。 @default false */
  disabled?: boolean;
}

interface AccordionBaseProps {
  /** 項目一覧。 @default undefined */
  items: AccordionItem[];
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** 単一選択アコーディオンのプロパティ。 @default undefined */
export interface AccordionSingleProps extends AccordionBaseProps {
  /** 選択方式。 @default "single" */
  type?: "single";
  /** 制御時の展開項目。 @default undefined */
  value?: string;
  /** 非制御時の初期展開項目。 @default undefined */
  defaultValue?: string;
  /** 展開項目の変更時の処理。 @default undefined */
  onValueChange?: (value: string) => void;
}

/** 複数選択アコーディオンのプロパティ。 @default undefined */
export interface AccordionMultipleProps extends AccordionBaseProps {
  /** 選択方式。 @default undefined */
  type: "multiple";
  /** 制御時の展開項目。 @default undefined */
  value?: string[];
  /** 非制御時の初期展開項目。 @default undefined */
  defaultValue?: string[];
  /** 展開項目の変更時の処理。 @default undefined */
  onValueChange?: (value: string[]) => void;
}

/** フラットな項目 API を持つアコーディオンのプロパティ。 @default undefined */
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

/** 単一・複数選択とキーボード操作に対応するアコーディオン。 @default undefined */
export const Accordion: React.FC<AccordionProps> = (props) => {
  const { items, className } = props;
  const type = props.type ?? "single";
  const isMultiple = type === "multiple";
  const isControlled = props.value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    () => props.defaultValue ?? (isMultiple ? [] : ""),
  );
  const value = isControlled ? props.value : uncontrolledValue;
  const openValues = isMultiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === "string" && value
      ? [value]
      : [];
  const baseId = useId();
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (index: number, direction: number) => {
    let next = index;
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length;
      if (!items[next]?.disabled) {
        triggers.current[next]?.focus();
        return;
      }
    }
  };

  const setOpenValues = (next: string | string[]) => {
    if (!isControlled) setUncontrolledValue(next);
    (
      props.onValueChange as
        | ((nextValue: string | string[]) => void)
        | undefined
    )?.(next);
  };

  return (
    <div
      className={cn("divide-y divide-border border-y border-border", className)}
    >
      {items.map((item, index) => {
        const isOpen = openValues.includes(item.value);
        const triggerId = `${baseId}-${item.value}-trigger`;
        const panelId = `${baseId}-${item.value}-panel`;
        return (
          <div key={item.value}>
            <h3>
              <button
                ref={(element) => {
                  triggers.current[index] = element;
                }}
                id={triggerId}
                type="button"
                disabled={item.disabled}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  if (isMultiple) {
                    setOpenValues(
                      isOpen
                        ? openValues.filter(
                            (valueItem) => valueItem !== item.value,
                          )
                        : [...openValues, item.value],
                    );
                    return;
                  }
                  setOpenValues(isOpen ? "" : item.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    moveFocus(index, 1);
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    moveFocus(index, -1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    const first = items.findIndex(
                      (candidate) => !candidate.disabled,
                    );
                    if (first !== -1) triggers.current[first]?.focus();
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    let last = -1;
                    for (
                      let itemIndex = items.length - 1;
                      itemIndex >= 0;
                      itemIndex -= 1
                    ) {
                      if (!items[itemIndex]?.disabled) {
                        last = itemIndex;
                        break;
                      }
                    }
                    if (last !== -1) triggers.current[last]?.focus();
                  }
                }}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-medium text-foreground hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item.title}
                <span aria-hidden="true" className="text-muted">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {isOpen && (
              <section
                id={panelId}
                aria-labelledby={triggerId}
                className="px-4 pb-4 text-foreground"
              >
                {item.content}
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
};
