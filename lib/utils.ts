import type { Exercise, PreviousSet, SetType, WorkoutSet } from "@/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatExerciseSummary(exercises: Exercise[]) {
  return exercises.map((exercise) => exercise.name).join(", ");
}

// Compact elapsed-time label: "45s", "3m 05s", "1h 02m".
export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");

  if (hours > 0) return `${hours}h ${pad(minutes)}m`;
  if (minutes > 0) return `${minutes}m ${pad(seconds)}s`;
  return `${seconds}s`;
}

const SMALL_NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
] as const;

// Label for the sheet's bottom CTA: "Add an Exercise", "Add Two Exercises", …
// Spells out small counts to match the rest of the picker's copy; falls back
// to digits past ten, which is unlikely but keeps the label from breaking.
export function formatAddExercisesCta(count: number) {
  if (count <= 1) return "Add an Exercise";
  const label = count <= 10 ? SMALL_NUMBER_WORDS[count] : String(count);
  return `Add ${label} Exercises`;
}

// What the PREVIOUS column shows: last session's numbers, or an em dash when
// this set had no counterpart last time (or the exercise is new).
export function formatPreviousSet(previous: PreviousSet | undefined) {
  if (!previous) return "—";
  return `${previous.weightKg}kg x ${previous.reps}`;
}

const SET_TYPE_BADGES: Record<Exclude<SetType, "normal">, string> = {
  warmup: "W",
  failure: "F",
  drop: "D",
};

// What each set shows in its SET column. Only normal sets are numbered, and the
// count skips the lettered ones, so a warm-up in the middle of an exercise
// doesn't push the working sets to 2, 3, 4.
export function getSetBadges(sets: WorkoutSet[]) {
  let normalCount = 0;

  return sets.map((set) => {
    if (set.type !== "normal") return SET_TYPE_BADGES[set.type];
    normalCount += 1;
    return String(normalCount);
  });
}
