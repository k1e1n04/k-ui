import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("クリックを通知する", async () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Tag</Chip>);
    await userEvent.click(screen.getByRole("button", { name: "Tag" }));
    expect(onClick).toHaveBeenCalled();
  });
  it("削除操作を提供する", async () => {
    const onDelete = vi.fn();
    render(<Chip onDelete={onDelete}>Tag</Chip>);
    await userEvent.click(screen.getByRole("button", { name: "Delete Tag" }));
    expect(onDelete).toHaveBeenCalled();
  });
  it("クリック可能かつ削除可能でもネストした操作要素を作らない", () => {
    render(
      <Chip onClick={vi.fn()} onDelete={vi.fn()}>
        Tag
      </Chip>,
    );
    const deleteButton = screen.getByRole("button", { name: "Delete Tag" });
    expect(deleteButton.closest("button")?.parentElement).not.toBeInstanceOf(
      HTMLButtonElement,
    );
  });
  it("クリック操作と削除操作を同階層のコントロールとして提供する", () => {
    render(
      <Chip onClick={vi.fn()} onDelete={vi.fn()}>
        Tag
      </Chip>,
    );
    const activate = screen.getByRole("button", { name: "Tag" });
    const remove = screen.getByRole("button", { name: "Delete Tag" });
    expect(activate.parentElement).toBe(remove.parentElement);
    expect(activate.parentElement).not.toHaveAttribute("role", "button");
  });
  it.each([
    "default",
    "primary",
    "success",
    "info",
    "warning",
    "danger",
  ] as const)("variant=%s とclassNameを適用する", (variant) => {
    render(
      <Chip variant={variant} selected className="custom">
        Tag
      </Chip>,
    );
    expect(screen.getByText("Tag").closest("span")).toHaveClass("custom");
  });
});
