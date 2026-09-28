"use client";

import { getRoutines } from "@/lib/supabase/queries";
import type { Routine } from "@/lib/types";
import { useEffect, useState } from "react";

export type RoutinesStatus = "loading" | "ready" | "error";

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [status, setStatus] = useState<RoutinesStatus>("loading");

  useEffect(() => {
    // Ignore a response that lands after the page has unmounted.
    let cancelled = false;

    getRoutines()
      .then((result) => {
        if (cancelled) return;
        setRoutines(result);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { routines, status };
}
