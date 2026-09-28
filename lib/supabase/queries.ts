import type { LibraryExercise, PreviousSet, Routine } from "@/lib/types";
import { type SupabaseClient, createClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Created on first use rather than at import, so pages that import this file
// still build and render before the env vars are set. Not exported: components
// should never call Supabase directly — they import the query functions below.
function getSupabase() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

// Placeholder until the routines table exists. Swap the body for a
// `getSupabase().from(...)` select; the return shape stays the same, so
// nothing upstream changes.
export async function getRoutines(): Promise<Routine[]> {
  return [
    {
      id: "legs-shoulder-1",
      name: "Legs/Shoulder-I",
      exercises: [
        { id: "hack-squat-machine", name: "Hack Squat (Machine)" },
        { id: "squat-smith", name: "Squat (Smith Machine)" },
        { id: "leg-extension-machine", name: "Leg Extension (Machine)" },
        { id: "standing-calf-raise", name: "Standing Calf Raise" },
      ],
    },
    {
      id: "legs-shoulder-2",
      name: "Legs/Shoulder II",
      exercises: [
        { id: "squat-barbell", name: "Squat (Barbell)" },
        { id: "rdl-barbell", name: "Romanian Deadlift (Barbell)" },
        { id: "lying-leg-curl-machine", name: "Lying Leg Curl (Machine)" },
        { id: "standing-calf-raise", name: "Standing Calf Raise" },
      ],
    },
    {
      id: "chest",
      name: "CHEST",
      exercises: [
        { id: "bench-press-barbell", name: "Bench Press (Barbell)" },
        {
          id: "incline-bench-dumbbell",
          name: "Incline Bench Press (Dumbbell)",
        },
        { id: "cable-fly-crossover", name: "Cable Fly Crossovers" },
        { id: "triceps-pushdown", name: "Triceps Pushdown" },
      ],
    },
    {
      id: "back",
      name: "BACK",
      exercises: [
        { id: "lat-pulldown-cable", name: "Lat Pulldown (Cable)" },
        { id: "seated-row-cable", name: "Seated Row (Cable)" },
        { id: "bent-over-row-barbell", name: "Bent Over Row (Barbell)" },
        { id: "bicep-curl-dumbbell", name: "Bicep Curl (Dumbbell)" },
      ],
    },
  ];
}

// Placeholder until the exercises table exists. Same swap as getRoutines.
export async function getRecentExercises(): Promise<LibraryExercise[]> {
  return [
    {
      id: "lat-pulldown-cable",
      name: "Lat Pulldown (Cable)",
      primaryMuscle: "Lats",
    },
    {
      id: "bent-over-row-barbell",
      name: "Bent Over Row (Barbell)",
      primaryMuscle: "Upper Back",
    },
    {
      id: "lat-pulldown-close-grip-cable",
      name: "Lat Pulldown - Close Grip (Cable)",
      primaryMuscle: "Lats",
    },
    {
      id: "bicep-curl-dumbbell",
      name: "Bicep Curl (Dumbbell)",
      primaryMuscle: "Biceps",
    },
    {
      id: "preacher-curl-machine",
      name: "Preacher Curl (Machine)",
      primaryMuscle: "Biceps",
    },
    {
      id: "bench-press-barbell",
      name: "Bench Press (Barbell)",
      primaryMuscle: "Chest",
    },
    {
      id: "incline-bench-dumbbell",
      name: "Incline Bench Press (Dumbbell)",
      primaryMuscle: "Chest",
    },
    {
      id: "hack-squat-machine",
      name: "Hack Squat (Machine)",
      primaryMuscle: "Quadriceps",
    },
    {
      id: "squat-smith",
      name: "Squat (Smith Machine)",
      primaryMuscle: "Quadriceps",
    },
    {
      id: "shrug-smith",
      name: "Shrug (Smith Machine)",
      primaryMuscle: "Traps",
    },
  ];
}

// The sets logged the last time each exercise was trained. Exercises missing
// from this map have never been logged, and their rows show a dash instead.
// Placeholder until the sets table exists; same swap as the queries above.
const PREVIOUS_SESSION: Record<string, PreviousSet[]> = {
  "hack-squat-machine": [
    { weightKg: 80, reps: 13 },
    { weightKg: 80, reps: 12 },
    { weightKg: 90, reps: 8 },
  ],
  "squat-smith": [
    { weightKg: 40, reps: 12 },
    { weightKg: 40, reps: 12 },
    { weightKg: 40, reps: 12 },
  ],
  "shrug-smith": [
    { weightKg: 60, reps: 13 },
    { weightKg: 60, reps: 13 },
    { weightKg: 60, reps: 13 },
  ],
  "bench-press-barbell": [
    { weightKg: 60, reps: 10 },
    { weightKg: 65, reps: 8 },
  ],
  "lat-pulldown-cable": [
    { weightKg: 50, reps: 12 },
    { weightKg: 55, reps: 10 },
    { weightKg: 55, reps: 9 },
  ],
};

// Looked up for several exercises at once, so adding four exercises is one
// round trip rather than four.
export async function getPreviousSets(
  exerciseIds: string[],
): Promise<Record<string, PreviousSet[]>> {
  return Object.fromEntries(
    exerciseIds.map((id) => [id, PREVIOUS_SESSION[id] ?? []]),
  );
}
