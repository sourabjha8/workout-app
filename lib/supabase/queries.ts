import type { Routine } from "@/lib/types";
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
