"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import type { WorkoutExercise, WorkoutSet } from "@/lib/types";
import { WorkoutExerciseCard } from "./workout-exercise-card";

interface WorkoutExerciseListProps {
  exercises: WorkoutExercise[];
  onAddExercise: () => void;
  onAddSet: (exerciseId: string) => void;
  onUpdateSet: (
    exerciseId: string,
    setId: string,
    changes: Partial<WorkoutSet>,
  ) => void;
  onRemoveSet: (exerciseId: string, setId: string) => void;
  onSetAllComplete: (exerciseId: string, isComplete: boolean) => void;
  onRequestDiscard: () => void;
}

export function WorkoutExerciseList({
  exercises,
  onAddExercise,
  onAddSet,
  onUpdateSet,
  onRemoveSet,
  onSetAllComplete,
  onRequestDiscard,
}: WorkoutExerciseListProps) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-4">
      {exercises.map((entry) => (
        <WorkoutExerciseCard
          key={entry.id}
          entry={entry}
          onAddSet={() => onAddSet(entry.id)}
          onUpdateSet={(setId, changes) =>
            onUpdateSet(entry.id, setId, changes)
          }
          onRemoveSet={(setId) => onRemoveSet(entry.id, setId)}
          onSetAllComplete={(isComplete) =>
            onSetAllComplete(entry.id, isComplete)
          }
        />
      ))}

      <div className="flex flex-col gap-3">
        <Button variant="primary" className="w-full" onClick={onAddExercise}>
          <PlusIcon />
          Add Exercise
        </Button>
        <Button variant="danger" className="w-full" onClick={onRequestDiscard}>
          Discard Workout
        </Button>
      </div>
    </div>
  );
}
