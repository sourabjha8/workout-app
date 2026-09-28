// Shared data shapes go here as the schema takes form.

export interface Exercise {
  id: string;
  name: string;
}

// An exercise as it appears in the picker, with the muscle it mainly targets.
export interface LibraryExercise extends Exercise {
  primaryMuscle: string;
}

// One set as it was logged the last time this exercise was trained.
export interface PreviousSet {
  weightKg: number;
  reps: number;
}

export type SetType = "warmup" | "normal" | "failure" | "drop";

// One set being logged right now. Weight and reps stay strings because they
// mirror text inputs — an empty field is a real state, and 0 is not the same.
export interface WorkoutSet {
  id: string;
  type: SetType;
  weightKg: string;
  reps: string;
  isComplete: boolean;
}

// An exercise inside the workout being logged. `id` is per-entry rather than
// per-exercise, so the same exercise can be added twice.
export interface WorkoutExercise {
  id: string;
  exercise: LibraryExercise;
  previousSets: PreviousSet[];
  sets: WorkoutSet[];
}

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}
