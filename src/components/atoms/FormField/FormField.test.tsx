import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormField } from "./FormField";

describe("FormField", () => {
  it("label が表示される", () => {
    render(
      <FormField label="Email" htmlFor="email-input">
        <input id="email-input" />
      </FormField>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("required=true のとき * が表示される", () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>,
    );

    expect(screen.getByText("*", { exact: false })).toBeInTheDocument();
  });

  it("description が表示される", () => {
    render(
      <FormField description="8文字以上で入力してください">
        <input />
      </FormField>,
    );

    expect(screen.getByText("8文字以上で入力してください")).toBeInTheDocument();
  });

  it("error が表示される", () => {
    render(
      <FormField error="必須項目です">
        <input />
      </FormField>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("必須項目です");
  });

  it("description / error / 既存値を aria-describedby にマージできる", () => {
    render(
      <FormField
        description="補助説明"
        error="エラー"
        aria-describedby="hint-id"
      >
        {({ describedBy }) => (
          <input type="text" aria-label="Name" aria-describedby={describedBy} />
        )}
      </FormField>,
    );

    const input = screen.getByRole("textbox", { name: "Name" });
    const description = screen.getByText("補助説明");
    const error = screen.getByRole("alert");
    expect(input).toHaveAttribute(
      "aria-describedby",
      `hint-id ${description.id} ${error.id}`,
    );
  });
});
