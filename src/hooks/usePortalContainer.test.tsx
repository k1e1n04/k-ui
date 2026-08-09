"use client";

import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { usePortalContainer } from "./usePortalContainer";

interface PortalContainerFixtureProps {
  providedContainer?: HTMLElement | null;
}

const PortalContainerFixture = ({
  providedContainer,
}: PortalContainerFixtureProps) => {
  const container = usePortalContainer(providedContainer);

  return <output>{container?.id ?? "未設定"}</output>;
};

afterEach(() => {
  document.getElementById("custom-portal-root")?.remove();
  document.getElementById("kui-portal-root")?.remove();
});

describe("usePortalContainer", () => {
  it("document.body にポータルルートを作成する", async () => {
    render(<PortalContainerFixture />);

    await waitFor(() => {
      expect(screen.getByText("kui-portal-root")).toBeInTheDocument();
    });
    expect(document.body.querySelectorAll("#kui-portal-root")).toHaveLength(1);
  });

  it("既存のポータルルートを再利用する", async () => {
    const portalRoot = document.createElement("div");
    portalRoot.id = "kui-portal-root";
    document.body.append(portalRoot);

    render(<PortalContainerFixture />);

    await waitFor(() => {
      expect(screen.getByText("kui-portal-root")).toBeInTheDocument();
    });
    expect(document.body.querySelectorAll("#kui-portal-root")).toHaveLength(1);
  });

  it("指定されたコンテナを優先する", () => {
    const providedContainer = document.createElement("div");
    providedContainer.id = "custom-portal-root";
    document.body.append(providedContainer);

    const { unmount } = render(
      <PortalContainerFixture providedContainer={providedContainer} />,
    );

    expect(screen.getByText("custom-portal-root")).toBeInTheDocument();
    expect(document.getElementById("kui-portal-root")).toBeNull();
    unmount();
    expect(document.body).toContainElement(providedContainer);
  });

  it("フックが作成したポータルルートを単一の利用者が解除したときに削除する", async () => {
    const { unmount } = render(<PortalContainerFixture />);

    await waitFor(() => {
      expect(document.getElementById("kui-portal-root")).toBeInTheDocument();
    });
    unmount();

    expect(document.getElementById("kui-portal-root")).toBeNull();
  });

  it("複数の利用者がいる間はポータルルートを保持し最後に削除する", async () => {
    const { rerender, unmount } = render(
      <>
        <PortalContainerFixture />
        <PortalContainerFixture />
      </>,
    );

    await waitFor(() => {
      expect(document.getElementById("kui-portal-root")).toBeInTheDocument();
    });
    rerender(<PortalContainerFixture />);
    expect(document.getElementById("kui-portal-root")).toBeInTheDocument();

    unmount();
    expect(document.getElementById("kui-portal-root")).toBeNull();
  });

  it("既存または指定されたコンテナは解除時に削除しない", async () => {
    const existingContainer = document.createElement("div");
    existingContainer.id = "kui-portal-root";
    document.body.append(existingContainer);
    const { unmount } = render(<PortalContainerFixture />);

    await waitFor(() => {
      expect(screen.getByText("kui-portal-root")).toBeInTheDocument();
    });
    unmount();
    expect(document.getElementById("kui-portal-root")).toBe(existingContainer);
  });
});
