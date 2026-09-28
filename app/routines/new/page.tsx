"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddExerciseSheet } from "./_components/add-exercise-sheet";
import { ConfirmDialog } from "./_components/confirm-dialog";
import { ExercisesEmptyState } from "./_components/exercises-empty-state";
import { WorkoutExerciseList } from "./_components/workout-exercise-list";
import { WorkoutHeader } from "./_components/workout-header";
import { WorkoutStats } from "./_components/workout-stats";
import { useElapsedSeconds } from "./_hooks/use-elapsed-seconds";
import { useWorkoutExercises } from "./_hooks/use-workout-exercises";

export default function NewRoutinePage() {
  const router = useRouter();
  const elapsedSeconds = useElapsedSeconds();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isDiscardOpen, setIsDiscardOpen] = useState(false);
  const [isFinishOpen, setIsFinishOpen] = useState(false);
  const {
    exercises,
    addExercises,
    addSet,
    updateSet,
    removeSet,
    setAllSetsComplete,
    discardAll,
    totals,
  } = useWorkoutExercises();

  function handleDiscard() {
    discardAll();
    setIsDiscardOpen(false);
    router.push("/");
  }

  // Placeholder until the workout can actually be saved: finishing behaves
  // like discarding, minus the confirmation copy.
  function handleFinish() {
    discardAll();
    setIsFinishOpen(false);
    router.push("/");
  }

  return (
    <>
      <WorkoutHeader onFinish={() => setIsFinishOpen(true)} />
      <main className="flex flex-1 flex-col pb-8">
        <WorkoutStats
          elapsedSeconds={elapsedSeconds}
          volumeKg={totals.volumeKg}
          setCount={totals.setCount}
        />
        {exercises.length === 0 ? (
          <ExercisesEmptyState
            onAddExercise={() => setIsPickerOpen(true)}
            onRequestDiscard={() => setIsDiscardOpen(true)}
          />
        ) : (
          <WorkoutExerciseList
            exercises={exercises}
            onAddExercise={() => setIsPickerOpen(true)}
            onAddSet={addSet}
            onUpdateSet={updateSet}
            onRemoveSet={removeSet}
            onSetAllComplete={setAllSetsComplete}
            onRequestDiscard={() => setIsDiscardOpen(true)}
          />
        )}
      </main>
      <AddExerciseSheet
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onAddExercises={(added) => {
          addExercises(added);
          setIsPickerOpen(false);
        }}
      />
      <ConfirmDialog
        isOpen={isDiscardOpen}
        title="Discard Workout?"
        message="This will delete the current session and its logged sets. This can't be undone."
        primaryLabel="Continue Your Workout"
        onPrimary={() => setIsDiscardOpen(false)}
        secondaryLabel="Discard"
        onSecondary={handleDiscard}
        secondaryVariant="danger"
        onDismiss={() => setIsDiscardOpen(false)}
      />
      <ConfirmDialog
        isOpen={isFinishOpen}
        title="Finish Workout?"
        message="This will save the current session and its logged sets."
        primaryLabel="Finish Workout"
        onPrimary={handleFinish}
        secondaryLabel="Continue Your Workout"
        onSecondary={() => setIsFinishOpen(false)}
        onDismiss={() => setIsFinishOpen(false)}
      />
    </>
  );
}
