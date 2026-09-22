import type React from "react";
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
export declare const ContactForm: React.FC<ContactFormProps>;
//# sourceMappingURL=ContactForm.d.ts.map