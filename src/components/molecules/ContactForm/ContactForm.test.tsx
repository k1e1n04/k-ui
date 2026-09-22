import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("必須項目が空だとエラーを表示して送信しない", async () => {
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: "送信する" }));
    expect(
      await screen.findByText("氏名を入力してください。"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("メールアドレスを入力してください。"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("メール形式を検証する", async () => {
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/氏名/), {
      target: { value: "山田太郎" },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: "見学希望" },
    });
    fireEvent.click(screen.getByLabelText("個人情報の取り扱いに同意します"));
    fireEvent.click(screen.getByRole("button", { name: "送信する" }));
    expect(
      await screen.findByText("メールアドレスの形式が正しくありません。"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("正しい入力で送信する", async () => {
    const onSubmit = vi.fn();
    render(<ContactForm subject="物件A" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/氏名/), {
      target: { value: "山田太郎" },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: "taro@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: "見学希望" },
    });
    fireEvent.click(screen.getByLabelText("個人情報の取り扱いに同意します"));
    fireEvent.click(screen.getByRole("button", { name: "送信する" }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: "山田太郎",
      email: "taro@example.com",
      message: "見学希望",
      consent: true,
    });
  });

  it("オプション項目を非表示にできる", () => {
    render(
      <ContactForm onSubmit={vi.fn()} showPhone={false} showDate={false} />,
    );
    expect(screen.queryByLabelText("電話番号")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("希望日")).not.toBeInTheDocument();
  });
});
