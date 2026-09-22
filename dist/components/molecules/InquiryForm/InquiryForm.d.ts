import type React from "react";
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
export declare const InquiryForm: React.FC<InquiryFormProps>;
//# sourceMappingURL=InquiryForm.d.ts.map