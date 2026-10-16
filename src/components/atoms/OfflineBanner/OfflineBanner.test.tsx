import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OfflineBanner } from "./OfflineBanner";

describe("OfflineBanner", () => {
  it("オンラインのときは何も表示しない", () => {
    const { container } = render(<OfflineBanner offline={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("オフラインのときはメッセージと再試行を表示する", async () => {
    const onRetry = vi.fn();
    render(<OfflineBanner offline onRetry={onRetry} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "オフラインです。変更は接続後に送信されます。",
    );
    await userEvent.click(screen.getByRole("button", { name: "再試行" }));
    expect(onRetry).toHaveBeenCalled();
  });
});
