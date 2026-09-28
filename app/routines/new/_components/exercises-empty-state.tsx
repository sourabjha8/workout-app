import { Button } from "@/components/ui/button";
import { DumbbellIcon, PlusIcon } from "@/components/ui/icons";

interface ExercisesEmptyStateProps {
  onAddExercise: () => void;
  onRequestDiscard: () => void;
}

export function ExercisesEmptyState({
  onAddExercise,
  onRequestDiscard,
}: ExercisesEmptyStateProps) {
  return (
    <section className="flex flex-col items-center gap-6 px-4 pt-16 text-center">
      <div className="flex flex-col items-center gap-2">
        <DumbbellIcon className="size-12 text-ink-tertiary" />
        <h2 className="text-headline text-ink">Get started</h2>
        <p className="text-subheadline text-ink-subtle">
          Add an exercise to start your workout.
        </p>
      </div>
      <Button variant="primary" className="w-full" onClick={onAddExercise}>
        <PlusIcon />
        Add Exercise
      </Button>
      <Button variant="danger" className="w-full" onClick={onRequestDiscard}>
        Discard Workout
      </Button>
    </section>
  );
}
