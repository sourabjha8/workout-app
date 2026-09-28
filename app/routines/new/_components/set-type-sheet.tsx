"use client";

import { CloseIcon } from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";
import type { SetType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BottomSheet } from "./bottom-sheet";
import { SET_TYPE_COLORS, SET_TYPE_OPTIONS } from "./set-types";

interface SetTypeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: SetType) => void;
  onRemove: () => void;
}

const ROW_CLASSES =
  "flex w-full items-center gap-4 px-4 py-4 text-left transition-opacity active:opacity-60";

export function SetTypeSheet({
  isOpen,
  onClose,
  onSelect,
  onRemove,
}: SetTypeSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      label="Select Set Type"
      size="auto"
    >
      <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
        <div
          aria-hidden="true"
          className="mx-auto h-1 w-10 rounded-full bg-hairline-tertiary"
        />
        <h2 className="border-hairline border-b pb-4 text-center text-headline text-ink">
          Select Set Type
        </h2>

        <Surface level={2} className="overflow-hidden">
          <ul>
            {SET_TYPE_OPTIONS.map((option) => (
              <li key={option.type} className="border-hairline border-b">
                <button
                  type="button"
                  onClick={() => onSelect(option.type)}
                  className={ROW_CLASSES}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-6 shrink-0 text-center text-headline",
                      SET_TYPE_COLORS[option.type],
                    )}
                  >
                    {option.badge}
                  </span>
                  <span className="text-body text-ink">{option.name}</span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={onRemove} className={ROW_CLASSES}>
                <CloseIcon
                  aria-hidden="true"
                  className="w-6 shrink-0 text-danger"
                />
                <span className="text-body text-ink">Remove Set</span>
              </button>
            </li>
          </ul>
        </Surface>
      </div>
    </BottomSheet>
  );
}
