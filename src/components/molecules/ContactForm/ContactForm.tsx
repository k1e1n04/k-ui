"use client";

import type React from "react";
import { useState } from "react";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/Button";
import { Checkbox } from "../../atoms/Checkbox";
import { Heading } from "../../atoms/Heading";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { Typography } from "../../atoms/Typography";

/** 問い合わせフォームの値 */
export interface ContactFormValues {
  /** 氏名 */
  name: string;
  /** メールアドレス */
  email: string;
  /** 電話番号 */
  phone?: string;
  /** 希望日 */
  date?: string;
  /** 問い合わせ内容 */
  message: string;
  /** 同意フラグ */
  consent: boolean;
}

export interface ContactFormProps {
  /** 見出し。 @default "お問い合わせ" */
  title?: React.ReactNode;
  /** 対象の補足（物件名など） */
  subject?: React.ReactNode;
  /** 対象ラベル。 @default "対象" */
  subjectLabel?: string;
  /** 電話番号欄を表示するか。 @default true */
  showPhone?: boolean;
  /** 希望日欄を表示するか。 @default true */
  showDate?: boolean;
  /** 希望日欄のラベル。 @default "希望日" */
  dateLabel?: string;
  /** 問い合わせ内容欄のラベル。 @default "お問い合わせ内容" */
  messageLabel?: string;
  /** 問い合わせ内容のプレースホルダー */
  messagePlaceholder?: string;
  /** 同意チェックのラベル。 @default "個人情報の取り扱いに同意します" */
  consentLabel?: string;
  /** 送信ボタンのラベル。 @default "送信する" */
  submitLabel?: string;
  /** 初期値 */
  defaultValues?: Partial<ContactFormValues>;
  /** 送信時 */
  onSubmit: (values: ContactFormValues) => void | Promise<void>;
  /** 送信中の状態（外部制御） */
  loading?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof ContactFormValues, string>>;

/**
 * ContactForm コンポーネント
 *
 * 氏名・メール・内容・同意を含む汎用の問い合わせフォーム。
 * 必須チェックとメール形式の検証を行う。
 *
 * @example
 * <ContactForm
 *   subject="グランドメゾン渋谷"
 *   onSubmit={async (values) => { await send(values); }}
 * />
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  title = "お問い合わせ",
  subject,
  subjectLabel = "対象",
  showPhone = true,
  showDate = true,
  dateLabel = "希望日",
  messageLabel = "お問い合わせ内容",
  messagePlaceholder,
  consentLabel = "個人情報の取り扱いに同意します",
  submitLabel = "送信する",
  defaultValues,
  onSubmit,
  loading = false,
  className,
}) => {
  const [values, setValues] = useState<ContactFormValues>({
    ...INITIAL,
    ...defaultValues,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (partial: Partial<ContactFormValues>) => {
    setValues((prev) => ({ ...prev, ...partial }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "氏名を入力してください。";
    if (!values.email.trim()) {
      next.email = "メールアドレスを入力してください。";
    } else if (!EMAIL_PATTERN.test(values.email)) {
      next.email = "メールアドレスの形式が正しくありません。";
    }
    if (!values.message.trim()) {
      next.message = "内容を入力してください。";
    }
    if (!values.consent) {
      next.consent = "同意が必要です。";
    }
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const busy = loading || submitting;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-surface p-4",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <Heading as="h3" size="sm">
          {title}
        </Heading>
        {subject && (
          <Typography variant="caption" tone="muted">
            {`${subjectLabel}: `}
            {subject}
          </Typography>
        )}
      </div>

      <Input
        label="氏名"
        required
        value={values.name}
        onChange={(name) => update({ name })}
        error={errors.name}
        placeholder="山田 太郎"
      />
      <Input
        type="text"
        label="メールアドレス"
        required
        value={values.email}
        onChange={(email) => update({ email })}
        error={errors.email}
        placeholder="taro@example.com"
      />
      {(showPhone || showDate) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {showPhone && (
            <Input
              label="電話番号"
              value={values.phone ?? ""}
              onChange={(phone) => update({ phone })}
              placeholder="090-0000-0000"
            />
          )}
          {showDate && (
            <Input
              type="date"
              label={dateLabel}
              value={values.date ?? ""}
              onChange={(date) => update({ date })}
            />
          )}
        </div>
      )}
      <Textarea
        label={messageLabel}
        required
        rows={4}
        value={values.message}
        onChange={(message) => update({ message })}
        error={errors.message}
        placeholder={messagePlaceholder}
      />

      <div className="flex flex-col gap-1">
        <Checkbox
          checked={values.consent}
          onChange={(consent) => update({ consent })}
          label={consentLabel}
        />
        {errors.consent && (
          <p role="alert" className="text-xs text-danger-main">
            {errors.consent}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? "送信中..." : submitLabel}
      </Button>
    </form>
  );
};
