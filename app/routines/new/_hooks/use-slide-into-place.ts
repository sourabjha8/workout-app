"use client";

import { useLayoutEffect, useRef } from "react";

// Keeps an element visually still while the layout grows above it, then lets it
// travel to its new position under a transition.
//
// Growing the list moves the Add Set button down instantly — that is a layout
// change, and animating the height that caused it would jank on a phone. So the
// button is snapped back to where it was with a transform, then released: the
// browser animates `transform` alone and the button appears to slide down.
export function useSlideIntoPlace<Element extends HTMLElement>() {
  const ref = useRef<Element>(null);
  const previousTop = useRef<number | null>(null);

  // Call this immediately before the state change that moves the element.
  function capture() {
    previousTop.current = ref.current?.getBoundingClientRect().top ?? null;
  }

  useLayoutEffect(() => {
    const node = ref.current;
    const from = previousTop.current;
    if (!node || from === null) return;

    previousTop.current = null;
    const delta = from - node.getBoundingClientRect().top;
    if (delta === 0) return;

    node.style.transition = "none";
    node.style.transform = `translateY(${delta}px)`;

    const frame = requestAnimationFrame(() => {
      // Clearing both hands control back to the element's own classes, which
      // carry the transition that plays out the travel.
      node.style.transition = "";
      node.style.transform = "";
    });

    return () => cancelAnimationFrame(frame);
  });

  return { ref, capture };
}
