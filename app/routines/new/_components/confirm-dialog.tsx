"use client";

import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef } from "react";
import { useBodyScrollLock } from "../_hooks/use-body-scroll-lock";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel: string;
  onSecondary: () => void;
  // The secondary action's color: "ghost" (plain text) for a routine confirm,
  // "danger" (red text) for one that destroys something. Discard's secondary
  // is danger; Finish's secondary, "Continue Your Workout", is ghost.
  secondaryVariant?: "ghost" | "danger";
  // Tapping the backdrop always takes the non-destructive way out.
  onDismiss: () => void;
}

// Centred confirmation, not a bottom sheet — this interrupts rather than
// offers a menu, so it reads as an alert. Shared by Discard Workout and
// Finish Workout; each call site supplies its own copy and button colors.
export function ConfirmDialog({
  isOpen,
  title,
  message,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  secondaryVariant = "ghost",
  onDismiss,
}: ConfirmDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <div inert={!isOpen} className="fixed inset-0 z-20">
      <button
        type="button"
        aria-label="Dismiss"
        tabIndex={-1}
        onClick={onDismiss}
        className={cn(
          "absolute inset-0 bg-canvas/70 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <Surface
          level={3}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          ref={panelRef}
          tabIndex={-1}
          className={cn(
            "flex w-full max-w-sm flex-col gap-4 p-5 outline-none transition-[opacity,transform] duration-200 ease-out",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          )}
        >
          <div className="flex flex-col gap-1 text-center">
            <h2 id={titleId} className="text-headline text-ink">
              {title}
            </h2>
            <p className="text-subheadline text-ink-subtle">{message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="primary" className="w-full" onClick={onPrimary}>
              {primaryLabel}
            </Button>
            <Button
              variant={secondaryVariant}
              className="w-full"
              onClick={onSecondary}
            >
              {secondaryLabel}
            </Button>
          </div>
        </Surface>
      </div>
    </div>
  );
}
