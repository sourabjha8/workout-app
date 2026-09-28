"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/ui/icons";
import type { LibraryExercise } from "@/lib/types";
import { cn, formatAddExercisesCta } from "@/lib/utils";
import { useState } from "react";
import { useRecentExercises } from "../_hooks/use-recent-exercises";
import { BottomSheet } from "./bottom-sheet";
import { ExerciseRow } from "./exercise-row";

interface AddExerciseSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercises: (exercises: LibraryExercise[]) => void;
}

export function AddExerciseSheet({
  isOpen,
  onClose,
  onAddExercises,
}: AddExerciseSheetProps) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { exercises, status } = useRecentExercises(query);

  function toggleExercise(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  function handleClose() {
    setSelectedIds([]);
    onClose();
  }

  function handleAdd() {
    const selected = exercises.filter((exercise) =>
      selectedIds.includes(exercise.id),
    );
    setSelectedIds([]);
    onAddExercises(selected);
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose} label="Add Exercise">
      <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
        <header className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="rounded-full border border-hairline-strong text-brand"
          >
            Cancel
          </Button>
          <h2 className="truncate text-headline text-ink">Add Exercise</h2>
          <Button
            variant="ghost"
            className="rounded-full border border-hairline-strong text-brand"
          >
            Create
          </Button>
        </header>

        <label className="flex items-center gap-3 rounded-xl bg-surface-3 px-3 py-2">
          <SearchIcon className="text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search exercise"
            aria-label="Search exercise"
            className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-tertiary"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <Button>All Equipment</Button>
          <Button>All Muscles</Button>
        </div>
      </div>

      <section className="flex-1 overflow-y-auto overscroll-contain px-4 pb-24">
        <h3 className="pt-4 pb-2 text-subheadline text-ink-subtle">
          Recent Exercises
        </h3>
        {status === "error" && (
          <p className="text-footnote text-ink-subtle">
            Couldn't load exercises.
          </p>
        )}
        {status === "ready" && exercises.length === 0 && (
          <p className="text-footnote text-ink-subtle">No matches.</p>
        )}
        <ul>
          {exercises.map((exercise) => (
            <ExerciseRow
              key={exercise.id}
              exercise={exercise}
              isSelected={selectedIds.includes(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
            />
          ))}
        </ul>
      </section>

      {/* Overlays the list rather than sitting in flow, so it never reserves
          empty space at the sheet's bottom while no exercise is selected. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-1 from-60% to-transparent px-4 pt-10 pb-6 transition-opacity duration-300",
          selectedIds.length > 0 ? "opacity-100" : "opacity-0",
        )}
      >
        <Button
          variant="primary"
          className={cn(
            "w-full",
            selectedIds.length > 0 && "pointer-events-auto",
          )}
          onClick={handleAdd}
        >
          {formatAddExercisesCta(selectedIds.length)}
        </Button>
      </div>
    </BottomSheet>
  );
}
