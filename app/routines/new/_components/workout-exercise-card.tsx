"use client";

import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  EllipsisIcon,
  PlusIcon,
  TimerIcon,
} from "@/components/ui/icons";
import type { SetType, WorkoutExercise, WorkoutSet } from "@/lib/types";
import { cn, getSetBadges } from "@/lib/utils";
import { useState } from "react";
import { useSlideIntoPlace } from "../_hooks/use-slide-into-place";
import { SetRow } from "./set-row";
import { SetTypeSheet } from "./set-type-sheet";

interface WorkoutExerciseCardProps {
  entry: WorkoutExercise;
  onAddSet: () => void;
  onUpdateSet: (setId: string, changes: Partial<WorkoutSet>) => void;
  onRemoveSet: (setId: string) => void;
  onSetAllComplete: (isComplete: boolean) => void;
}

export function WorkoutExerciseCard({
  entry,
  onAddSet,
  onUpdateSet,
  onRemoveSet,
  onSetAllComplete,
}: WorkoutExerciseCardProps) {
  const { ref: addSetRef, capture } = useSlideIntoPlace<HTMLDivElement>();
  const [pickerSetId, setPickerSetId] = useState<string | null>(null);
  const isAllComplete =
    entry.sets.length > 0 && entry.sets.every((set) => set.isComplete);
  const badges = getSetBadges(entry.sets);

  function handleAddSet() {
    capture();
    onAddSet();
  }

  function handleSelectType(type: SetType) {
    if (pickerSetId) onUpdateSet(pickerSetId, { type });
    setPickerSetId(null);
  }

  function handleRemoveSet() {
    if (pickerSetId) onRemoveSet(pickerSetId);
    setPickerSetId(null);
  }

  return (
    <article className="flex flex-col gap-3">
      <header className="flex items-center gap-3">
        {/* Placeholder for the exercise illustration. */}
        <div
          aria-hidden="true"
          className="size-10 shrink-0 rounded-full bg-ink"
        />
        <h3 className="min-w-0 flex-1 truncate text-headline text-brand">
          {entry.exercise.name}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`More options for ${entry.exercise.name}`}
          className="-mr-2"
        >
          <EllipsisIcon />
        </Button>
      </header>

      <input
        placeholder="Add notes here..."
        aria-label={`Notes for ${entry.exercise.name}`}
        className="bg-transparent text-callout text-ink outline-none placeholder:text-ink-subtle"
      />

      <Button variant="ghost" className="-mx-4 justify-start text-brand">
        <TimerIcon className="size-5" />
        Rest Timer: OFF
      </Button>

      <div className="flex items-center gap-2 px-2 text-caption-1 text-ink-subtle uppercase">
        <span className="w-10 shrink-0 text-center">Set</span>
        <span className="flex-1 text-center">Previous</span>
        <span className="w-20 shrink-0 text-center">kg</span>
        <span className="w-16 shrink-0 text-center">Reps</span>
        <button
          type="button"
          onClick={() => onSetAllComplete(!isAllComplete)}
          aria-pressed={isAllComplete}
          aria-label={
            isAllComplete
              ? `Clear all sets of ${entry.exercise.name}`
              : `Complete all sets of ${entry.exercise.name}`
          }
          className={cn(
            "flex w-10 shrink-0 items-center justify-center transition-opacity active:opacity-60",
            isAllComplete ? "text-success" : "text-ink-subtle",
          )}
        >
          <CheckIcon className="size-5" />
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {entry.sets.map((set, index) => (
          <SetRow
            key={set.id}
            index={index}
            badge={badges[index]}
            set={set}
            previous={entry.previousSets[index]}
            onChange={(changes) => onUpdateSet(set.id, changes)}
            onOpenTypePicker={() => setPickerSetId(set.id)}
          />
        ))}
      </ul>

      <div
        ref={addSetRef}
        className="transition-transform duration-300 ease-out"
      >
        <Button className="w-full" onClick={handleAddSet}>
          <PlusIcon className="size-5" />
          Add Set
        </Button>
      </div>

      <SetTypeSheet
        isOpen={pickerSetId !== null}
        onClose={() => setPickerSetId(null)}
        onSelect={handleSelectType}
        onRemove={handleRemoveSet}
      />
    </article>
  );
}
