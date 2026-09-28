"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef } from "react";
import { useBodyScrollLock } from "../_hooks/use-body-scroll-lock";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  // "full" leaves a sliver of the page showing at the top; "auto" is only as
  // tall as its content, for short menus.
  size?: "full" | "auto";
  children: ReactNode;
}

// iOS-style sheet that slides up over the page. Stays mounted so it can animate
// out; `inert` keeps it out of the tab order and screen readers while closed.
export function BottomSheet({
  isOpen,
  onClose,
  label,
  size = "full",
  children,
}: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <div inert={!isOpen} className="fixed inset-0 z-10">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-canvas/70 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        // biome-ignore lint/a11y/useSemanticElements: a native <dialog> can't animate out on iOS Safari (no `overlay` transition), so it would vanish instead of sliding down.
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col rounded-t-2xl border-t border-hairline bg-surface-1 outline-none transition-transform duration-300 ease-out",
          size === "full" ? "top-3" : "max-h-full",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        {children}
      </div>
    </div>
  );
}
