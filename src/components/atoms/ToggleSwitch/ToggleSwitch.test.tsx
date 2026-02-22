import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToggleSwitch } from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  it("role=switch でレンダリングされる", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("checked=false のとき aria-checked が false", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("checked=true のとき aria-checked が true", () => {
    render(<ToggleSwitch checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("クリックで onChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} />);

    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("checked=true のときクリックで false が渡される", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleSwitch checked={true} onChange={onChange} />);

    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("Space キーで onChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} />);

    screen.getByRole("switch").focus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("Enter キーで onChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} />);

    screen.getByRole("switch").focus();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("disabled のときクリックしても onChange が呼ばれない", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={onChange} disabled />);

    await user.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disabled のとき tabIndex が -1", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole("switch")).toHaveAttribute("tabindex", "-1");
  });

  it("label が表示される", () => {
    render(
      <ToggleSwitch checked={false} onChange={() => {}} label="Notifications" />,
    );
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("label なしでもレンダリングされる", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it("size=small でレンダリングされる", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} size="small" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("size=large でレンダリングされる", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} size="large" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("className が渡される", () => {
    const { container } = render(
      <ToggleSwitch checked={false} onChange={() => {}} className="mt-4" />,
    );
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
