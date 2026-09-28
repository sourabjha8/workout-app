"use client";

import { useEffect, useState } from "react";

// False on the first paint, true on the next frame — enough for a mounting
// element to transition from its "before" classes to its resting ones.
export function useEnterTransition() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return hasEntered;
}
