import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("メッセージと閉じる操作を表示する", async () => {
    const onDismiss = vi.fn();
    render(<Toast variant="success" message="Saved" onDismiss={onDismiss} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    expect(onDismiss).toHaveBeenCalled();
  });
  it.each(["success", "info", "warning", "danger"] as const)(
    "variant=%s を表示する",
    (variant) => {
      render(
        <Toast
          variant={variant}
          title="Notice"
          message="Message"
          className="custom"
        />,
      );
      expect(screen.getByRole("status")).toHaveClass("custom");
    },
  );
});
