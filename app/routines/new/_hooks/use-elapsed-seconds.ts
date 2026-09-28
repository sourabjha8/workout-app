"use client";

import { useEffect, useState } from "react";

// Seconds since the component mounted. Derived from a start timestamp rather
// than counting ticks, so a backgrounded tab doesn't drift when it resumes.
export function useElapsedSeconds() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return elapsed;
}
