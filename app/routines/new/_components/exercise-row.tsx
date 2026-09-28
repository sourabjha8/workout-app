import { CheckIcon } from "@/components/ui/icons";
import type { LibraryExercise } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExerciseRowProps {
  exercise: LibraryExercise;
  isSelected: boolean;
  onToggle: () => void;
}

export function ExerciseRow({
  exercise,
  isSelected,
  onToggle,
}: ExerciseRowProps) {
  return (
    <li className="border-b border-hairline">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isSelected}
        className="flex w-full min-w-0 items-center gap-4 py-4 text-left"
      >
        {/* Placeholder for the exercise illustration. */}
        <div
          aria-hidden="true"
          className="size-14 shrink-0 rounded-full bg-ink"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-body text-ink">{exercise.name}</p>
          <p className="truncate text-subheadline text-ink-subtle">
            {exercise.primaryMuscle}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border",
            isSelected
              ? "border-brand bg-brand text-ink"
              : "border-hairline-strong",
          )}
        >
          {isSelected && <CheckIcon className="size-4" strokeWidth={3} />}
        </span>
      </button>
    </li>
  );
}
