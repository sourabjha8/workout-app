"use client";

import { ExercisesEmptyState } from "./_components/exercises-empty-state";
import { WorkoutHeader } from "./_components/workout-header";
import { WorkoutStats } from "./_components/workout-stats";
import { useElapsedSeconds } from "./_hooks/use-elapsed-seconds";

export default function NewRoutinePage() {
  const elapsedSeconds = useElapsedSeconds();

  return (
    <>
      <WorkoutHeader />
      <main className="flex flex-1 flex-col pb-8">
        <WorkoutStats
          elapsedSeconds={elapsedSeconds}
          volumeKg={0}
          setCount={0}
        />
        <ExercisesEmptyState />
      </main>
    </>
  );
}
