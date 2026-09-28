import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";
import type { Routine } from "@/lib/types";
import { formatExerciseSummary } from "@/lib/utils";

interface RoutineCardProps {
  routine: Routine;
}

export function RoutineCard({ routine }: RoutineCardProps) {
  const isEmpty = routine.exercises.length === 0;

  return (
    <Surface level={2} className="flex flex-col gap-3 p-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-headline text-ink">{routine.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`More options for ${routine.name}`}
            className="-my-2 -mr-2"
          >
            <EllipsisIcon />
          </Button>
        </div>
        <p className="line-clamp-2 text-subheadline text-ink-subtle">
          {isEmpty
            ? "No exercises added yet."
            : formatExerciseSummary(routine.exercises)}
        </p>
      </div>
      <Button variant="primary">
        {isEmpty ? "Add Workout" : "Start Routine"}
      </Button>
    </Surface>
  );
}
