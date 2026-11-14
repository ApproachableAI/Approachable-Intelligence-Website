"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * A looping phase counter that only ticks while its element is on screen.
 * Under prefers-reduced-motion it parks on `restPhase` (the finished frame).
 */
export function useInViewPhase(phases: number, tickMs: number, restPhase: number) {
  const [phase, setPhase] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let interval: number | null = null;
    const start = () => {
      if (interval == null) {
        interval = window.setInterval(
          () => setPhase((p) => (p + 1) % phases),
          tickMs,
        );
      }
    };
    const stop = () => {
      if (interval != null) {
        window.clearInterval(interval);
        interval = null;
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return stop;
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [phases, tickMs, reduced]);

  return { ref, phase: reduced ? restPhase : phase };
}
