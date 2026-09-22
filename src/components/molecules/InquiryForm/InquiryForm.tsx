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
export interface InquiryFormValues {
  /** 氏名 */
  name: string;
  /** メールアドレス */
  email: string;
  /** 電話番号 */
  phone?: string;
  /** 希望見学日 */
  preferredDate?: string;
  /** 問い合わせ内容 */
  message: string;
  /** 個人情報の取り扱いへの同意 */
  agree: boolean;
}

export interface InquiryFormProps {
  /** 対象物件名（見出しに表示） */
  propertyName?: string;
  /** 初期値 */
  defaultValues?: Partial<InquiryFormValues>;
  /** 送信時 */
  onSubmit: (values: InquiryFormValues) => void | Promise<void>;
  /** 送信中の状態（外部制御） */
  loading?: boolean;
  /** 送信ボタンのラベル。 @default "問い合わせを送信" */
  submitLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL: InquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  message: "",
  agree: false,
};

type Errors = Partial<Record<keyof InquiryFormValues, string>>;

/**
 * InquiryForm コンポーネント
 *
 * 物件への見学・問い合わせを送信するフォーム。必須チェックとメール形式の検証を行う。
 *
 * @example
 * <InquiryForm
 *   propertyName="グランドメゾン渋谷"
 *   onSubmit={async (values) => { await send(values); }}
 * />
 */
export const InquiryForm: React.FC<InquiryFormProps> = ({
  propertyName,
  defaultValues,
  onSubmit,
  loading = false,
  submitLabel = "問い合わせを送信",
  className,
}) => {
  const [values, setValues] = useState<InquiryFormValues>({
    ...INITIAL,
    ...defaultValues,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (partial: Partial<InquiryFormValues>) => {
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
      next.message = "問い合わせ内容を入力してください。";
    }
    if (!values.agree) {
      next.agree = "個人情報の取り扱いへの同意が必要です。";
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
          お問い合わせ
        </Heading>
        {propertyName && (
          <Typography variant="caption" tone="muted">
            対象物件: {propertyName}
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="電話番号"
          value={values.phone ?? ""}
          onChange={(phone) => update({ phone })}
          placeholder="090-0000-0000"
        />
        <Input
          type="date"
          label="希望見学日"
          value={values.preferredDate ?? ""}
          onChange={(preferredDate) => update({ preferredDate })}
        />
      </div>
      <Textarea
        label="問い合わせ内容"
        required
        rows={4}
        value={values.message}
        onChange={(message) => update({ message })}
        error={errors.message}
        placeholder="見学を希望します。"
      />

      <div className="flex flex-col gap-1">
        <Checkbox
          checked={values.agree}
          onChange={(agree) => update({ agree })}
          label="個人情報の取り扱いに同意します"
        />
        {errors.agree && (
          <p role="alert" className="text-xs text-danger-main">
            {errors.agree}
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
