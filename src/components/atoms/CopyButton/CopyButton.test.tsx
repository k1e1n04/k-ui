import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "./CopyButton";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CopyButton", () => {
  it("クリップボードへコピーして完了表示に切り替える", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const onCopied = vi.fn();
    render(<CopyButton value="ABC-123" onCopied={onCopied} />);
    await userEvent.click(screen.getByRole("button", { name: /コピー/ }));
    expect(writeText).toHaveBeenCalledWith("ABC-123");
    expect(onCopied).toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveTextContent("コピーしました");
  });
});
