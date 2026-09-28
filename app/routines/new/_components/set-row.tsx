"use client";

import { CheckIcon } from "@/components/ui/icons";
import type { PreviousSet, WorkoutSet } from "@/lib/types";
import { cn, formatPreviousSet } from "@/lib/utils";
import { useEnterTransition } from "../_hooks/use-enter-transition";
import { SET_TYPE_COLORS } from "./set-types";

interface SetRowProps {
  index: number;
  badge: string;
  set: WorkoutSet;
  previous: PreviousSet | undefined;
  onChange: (changes: Partial<WorkoutSet>) => void;
  onOpenTypePicker: () => void;
}

const FIELD_CLASSES =
  "shrink-0 bg-transparent text-center text-callout text-ink tabular-nums outline-none";

export function SetRow({
  index,
  badge,
  set,
  previous,
  onChange,
  onOpenTypePicker,
}: SetRowProps) {
  const hasEntered = useEnterTransition();

  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-[opacity,transform] duration-300 ease-out",
        // A tint rather than the solid token, so the row reads as a state of
        // the list instead of a block of colour.
        set.isComplete && "bg-success/15",
        hasEntered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={onOpenTypePicker}
        aria-label={`Set ${index + 1} type`}
        className={cn(
          "flex w-10 shrink-0 items-center justify-center rounded-lg py-1 text-callout tabular-nums transition-opacity active:opacity-60",
          SET_TYPE_COLORS[set.type],
          // Transparent once complete, so the row's green reads as one block.
          set.isComplete ? "bg-transparent" : "bg-surface-3",
        )}
      >
        {badge}
      </button>
      <span className="flex-1 truncate text-center text-subheadline text-ink-subtle tabular-nums">
        {formatPreviousSet(previous)}
      </span>
      <input
        inputMode="decimal"
        value={set.weightKg}
        onChange={(event) => onChange({ weightKg: event.target.value })}
        aria-label={`Set ${index + 1} weight in kilograms`}
        className={cn(FIELD_CLASSES, "w-20")}
      />
      <input
        inputMode="numeric"
        value={set.reps}
        onChange={(event) => onChange({ reps: event.target.value })}
        aria-label={`Set ${index + 1} reps`}
        className={cn(FIELD_CLASSES, "w-16")}
      />
      <button
        type="button"
        onClick={() => onChange({ isComplete: !set.isComplete })}
        aria-pressed={set.isComplete}
        aria-label={`Complete set ${index + 1}`}
        className={cn(
          "flex w-10 shrink-0 items-center justify-center py-1 transition-opacity active:opacity-60",
          set.isComplete ? "text-success" : "text-ink-tertiary",
        )}
      >
        <CheckIcon className="size-5" />
      </button>
    </li>
  );
}
