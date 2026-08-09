"use client";

import { useEffect, useState } from "react";

let hookCreatedPortalContainer: HTMLElement | null = null;
let portalContainerLeaseCount = 0;

/**
 * ポータル描画先のコンテナを取得するフック
 *
 * @param providedContainer 呼び出し元が指定する描画先コンテナ
 * @returns 指定コンテナまたは document.body 配下の #kui-portal-root
 * @default undefined
 */
export function usePortalContainer(
  providedContainer?: HTMLElement | null,
): HTMLElement | null {
  const [container, setContainer] = useState<HTMLElement | null>(
    providedContainer ?? null,
  );

  useEffect(() => {
    if (providedContainer) {
      setContainer(providedContainer);
      return;
    }

    if (typeof document === "undefined") return;

    const existingContainer = document.getElementById("kui-portal-root");
    const portalContainer = existingContainer ?? document.createElement("div");
    const isHookCreatedContainer =
      portalContainer === hookCreatedPortalContainer || !existingContainer;

    if (!existingContainer) {
      portalContainer.id = "kui-portal-root";
      document.body.append(portalContainer);
      hookCreatedPortalContainer = portalContainer;
    }

    setContainer(portalContainer);

    if (!isHookCreatedContainer) return;

    portalContainerLeaseCount += 1;
    return () => {
      portalContainerLeaseCount -= 1;
      if (
        portalContainerLeaseCount === 0 &&
        hookCreatedPortalContainer === portalContainer
      ) {
        portalContainer.remove();
        hookCreatedPortalContainer = null;
      }
    };
  }, [providedContainer]);

  return container;
}
