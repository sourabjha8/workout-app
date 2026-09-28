"use client";

import { getPreviousSets } from "@/lib/supabase/queries";
import type {
  LibraryExercise,
  PreviousSet,
  WorkoutExercise,
  WorkoutSet,
} from "@/lib/types";
import { useMemo, useState } from "react";

const DEFAULT_SET_COUNT = 3;

// A new set starts pre-filled with what was lifted last time, so the common
// case (repeat the session) is no typing. Nothing to repeat means empty fields.
function createSet(previous: PreviousSet | undefined): WorkoutSet {
  return {
    id: crypto.randomUUID(),
    type: "normal",
    weightKg: previous ? String(previous.weightKg) : "",
    reps: previous ? String(previous.reps) : "",
    isComplete: false,
  };
}

export function useWorkoutExercises() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);

  async function addExercises(added: LibraryExercise[]) {
    const history = await getPreviousSets(added.map((one) => one.id));

    setExercises((current) => [
      ...current,
      ...added.map((exercise) => {
        const previousSets = history[exercise.id] ?? [];
        return {
          id: crypto.randomUUID(),
          exercise,
          previousSets,
          sets: Array.from({ length: DEFAULT_SET_COUNT }, (_, index) =>
            createSet(previousSets[index]),
          ),
        };
      }),
    ]);
  }

  function addSet(exerciseId: string) {
    setExercises((current) =>
      current.map((entry) =>
        entry.id === exerciseId
          ? {
              ...entry,
              sets: [
                ...entry.sets,
                createSet(entry.previousSets[entry.sets.length]),
              ],
            }
          : entry,
      ),
    );
  }

  function discardAll() {
    setExercises([]);
  }

  function removeSet(exerciseId: string, setId: string) {
    setExercises((current) =>
      current.map((entry) =>
        entry.id === exerciseId
          ? { ...entry, sets: entry.sets.filter((set) => set.id !== setId) }
          : entry,
      ),
    );
  }

  // Behind the tick in the table header: completes every set of one exercise,
  // or clears them all when they are already complete.
  function setAllSetsComplete(exerciseId: string, isComplete: boolean) {
    setExercises((current) =>
      current.map((entry) =>
        entry.id === exerciseId
          ? {
              ...entry,
              sets: entry.sets.map((set) => ({ ...set, isComplete })),
            }
          : entry,
      ),
    );
  }

  function updateSet(
    exerciseId: string,
    setId: string,
    changes: Partial<WorkoutSet>,
  ) {
    setExercises((current) =>
      current.map((entry) =>
        entry.id === exerciseId
          ? {
              ...entry,
              sets: entry.sets.map((set) =>
                set.id === setId ? { ...set, ...changes } : set,
              ),
            }
          : entry,
      ),
    );
  }

  // Only completed sets count, which is why both totals read 0 until the first
  // set is ticked off.
  const totals = useMemo(() => {
    let volumeKg = 0;
    let setCount = 0;

    for (const entry of exercises) {
      for (const set of entry.sets) {
        if (!set.isComplete) continue;
        setCount += 1;
        volumeKg += (Number(set.weightKg) || 0) * (Number(set.reps) || 0);
      }
    }

    return { volumeKg, setCount };
  }, [exercises]);

  return {
    exercises,
    addExercises,
    addSet,
    updateSet,
    removeSet,
    setAllSetsComplete,
    discardAll,
    totals,
  };
}
