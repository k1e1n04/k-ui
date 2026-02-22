import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  it("クリックで onClick が呼ばれる", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disabled のときクリックしても onClick が呼ばれない", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );

    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disabled のとき disabled 属性がセットされる", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disabled のとき opacity-50 と cursor-not-allowed が適用される", () => {
    render(<Button disabled>Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("デフォルトで rounded-md が適用される", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-md");
  });

  it("iconOnly のとき rounded-full が適用される", () => {
    render(<Button iconOnly>X</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("rounded-full");
    expect(button).not.toHaveClass("rounded-md");
  });

  it("iconOnly のときアイコン用パディングが適用される", () => {
    render(<Button iconOnly>X</Button>);
    expect(screen.getByRole("button")).toHaveClass("p-2");
  });

  it("fullWidth のとき w-full が適用される", () => {
    render(<Button fullWidth>Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("className が渡される", () => {
    render(<Button className="mt-4">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("mt-4");
  });

  it.each([
    "small",
    "medium",
    "large",
  ] as const)("size=%s でレンダリングされる", (size) => {
    render(<Button size={size}>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it.each([
    "primary",
    "secondary",
    "success",
    "info",
    "outline",
    "ghost",
    "danger",
  ] as const)("variant=%s でレンダリングされる", (variant) => {
    render(<Button variant={variant}>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("semantic variant で tone=plain のスタイルが適用される", () => {
    render(
      <Button iconOnly variant="danger" tone="plain">
        X
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-transparent",
      "text-[var(--kui-color-danger)]",
      "hover:bg-[var(--kui-color-danger-subtle)]",
    );
  });

  it("semantic variant で tone=subtle のスタイルが適用される", () => {
    render(
      <Button iconOnly variant="info" tone="subtle">
        X
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-[var(--kui-color-info-subtle)]",
      "text-[var(--kui-color-info)]",
    );
  });

  it("non-semantic variant では tone を指定しても既存スタイルが維持される", () => {
    render(
      <Button variant="primary" tone="plain">
        Click
      </Button>,
    );

    expect(screen.getByRole("button")).toHaveClass(
      "bg-primary-main",
      "text-white",
    );
  });
});
