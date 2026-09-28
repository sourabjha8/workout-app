"use client";

import { getRecentExercises } from "@/lib/supabase/queries";
import type { LibraryExercise } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export type ExercisesStatus = "loading" | "ready" | "error";

// Recent exercises, narrowed by a case-insensitive name search.
export function useRecentExercises(query: string) {
  const [exercises, setExercises] = useState<LibraryExercise[]>([]);
  const [status, setStatus] = useState<ExercisesStatus>("loading");

  useEffect(() => {
    // Ignore a response that lands after the sheet has unmounted.
    let cancelled = false;

    getRecentExercises()
      .then((result) => {
        if (cancelled) return;
        setExercises(result);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return exercises;
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(needle),
    );
  }, [exercises, query]);

  return { exercises: filtered, status };
}
