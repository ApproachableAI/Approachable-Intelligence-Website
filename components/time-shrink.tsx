"use client";

import { useEffect, useRef } from "react";

/**
 * "2 hours → 20 minutes": a counter that runs down while its bar collapses,
 * once, the first time it scrolls into view. The server render (and the
 * reduced-motion state) is the finished frame, so the numbers are always in
 * the HTML. Updates go straight to the DOM to keep the animation off React.
 */
export function TimeShrink({
  from = 120,
  to = 20,
}: {
  from?: number;
  to?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const number = numberRef.current;
    const bar = barRef.current;
    if (!root || !number || !bar) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const paint = (value: number) => {
      number.textContent = String(Math.round(value));
      bar.style.width = `${(value / from) * 100}%`;
    };

    let raf = 0;
    paint(from);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const started = performance.now() + 350;
        const duration = 2200;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - started) / duration));
          const eased = 1 - Math.pow(1 - t, 4);
          paint(from + (to - from) * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      paint(to);
    };
  }, [from, to]);

  return (
    <div ref={rootRef}>
      <p className="flex items-baseline gap-3 font-display leading-none">
        <span
          ref={numberRef}
          className="text-[clamp(88px,15vw,176px)] tabular-nums tracking-[-0.04em] text-gold-pale"
        >
          {to}
        </span>
        <span className="text-[clamp(26px,3.4vw,44px)] italic text-cream/85">
          minutes
        </span>
      </p>
      <div className="mt-5 grid gap-2.5" aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="block h-2.5 w-full rounded-full bg-cream/22" />
          <span className="w-[92px] shrink-0 text-[12.5px] uppercase tracking-[.12em] text-cream/60">
            By hand
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="block h-2.5 w-full">
            <span
              ref={barRef}
              className="block h-full rounded-full bg-gold-bright shadow-[0_0_24px_rgba(224,174,63,.6)]"
              style={{ width: `${(to / from) * 100}%` }}
            />
          </span>
          <span className="w-[92px] shrink-0 text-[12.5px] uppercase tracking-[.12em] text-gold-pale">
            The target
          </span>
        </div>
      </div>
      <p className="sr-only">
        Down from about {from / 60} hours by hand to a target of {to} minutes.
      </p>
    </div>
  );
}
