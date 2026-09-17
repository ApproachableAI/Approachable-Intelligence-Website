"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { home } from "@/lib/content";

/**
 * "All your systems should talk to each other." — the live client-record
 * sync diagram. Ported from the prototype's Component class: a 750ms tick
 * cycling through 9 phases.
 *
 *   0      listening
 *   1–4    sources light up gold one by one, gold packets flow to the hub
 *   5      hub merges (sage glow, "Merged · 0 duplicates")
 *   6–7    outputs all light sage at once, sage packets flow out
 *   8      hold, "all systems in sync"
 *
 * The tick only runs while the card is on screen. Under
 * prefers-reduced-motion it parks on the final "in sync" frame.
 */

const PHASES = 9;
const TICK_MS = 750;
const YS = [12.5, 37.5, 62.5, 87.5];

type Tone = { bg: string; border: string; dot: string; fg: string; line: string };

const DIM: Tone = {
  bg: "rgba(242,242,230,.03)",
  border: "rgba(242,242,230,.1)",
  dot: "rgba(242,242,230,.2)",
  fg: "rgba(242,242,230,.5)",
  line: "rgba(242,242,230,.12)",
};
const GOLD: Tone = {
  bg: "rgba(224,174,63,.12)",
  border: "rgba(224,174,63,.6)",
  dot: "#E0AE3F",
  fg: "#F2F2E6",
  line: "rgba(224,174,63,.55)",
};
const SAGE: Tone = {
  bg: "rgba(158,196,154,.12)",
  border: "rgba(158,196,154,.6)",
  dot: "#9EC49A",
  fg: "#F2F2E6",
  line: "rgba(158,196,154,.6)",
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

function useDemoPhase() {
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
          () => setPhase((p) => (p + 1) % PHASES),
          TICK_MS,
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [reduced]);

  // Reduced-motion users get the finished "all systems in sync" frame.
  return { phase: reduced ? PHASES - 1 : phase, ref };
}

export function SyncDemo() {
  const { phase: p, ref } = useDemoPhase();
  const copy = home.demo;

  const sources = copy.sources.map((label, i) => {
    const lit = p >= i + 1 && p <= 8;
    const flowing = p >= i + 1 && p <= 5;
    const y = YS[i];
    return {
      label,
      ...(lit ? GOLD : DIM),
      packet: flowing ? 1 : 0,
      path: `M 33 ${y} C 40 ${y}, 38 50, 41 50`,
    };
  });

  const outLit = p >= 6 && p <= 8;
  const outFlow = p === 6 || p === 7;
  const outputs = copy.outputs.map((label, i) => {
    const y = YS[i];
    return {
      label,
      ...(outLit ? SAGE : DIM),
      packet: outFlow ? 1 : 0,
      path: `M 59 50 C 62 50, 60 ${y}, 67 ${y}`,
    };
  });

  const merged = p >= 5 && p <= 8;
  const hub = merged
    ? {
        bg: "rgba(158,196,154,.16)",
        border: "rgba(158,196,154,.8)",
        shadow: "0 0 70px rgba(158,196,154,.35)",
        fg: "#9EC49A",
        note: p >= 6 ? "Pushing to 4 systems" : "Merged · 0 duplicates",
      }
    : {
        bg: "rgba(242,242,230,.04)",
        border: "rgba(242,242,230,.18)",
        shadow: "0 0 0 rgba(0,0,0,0)",
        fg: "rgba(242,242,230,.5)",
        note: p === 0 ? "Listening…" : `Receiving ${Math.min(p, 4)} of 4`,
      };

  const status =
    p === 0
      ? "listening"
      : p <= 4
        ? "collecting"
        : p === 5
          ? "merging"
          : p <= 7
            ? "syncing"
            : "all systems in sync";

  const synced = outLit ? "8 / 8" : merged ? "4 / 8" : `${Math.min(p, 4)} / 8`;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[26px] border border-cream/14 bg-ink-2 px-[clamp(18px,3vw,34px)] pb-[22px] pt-[26px] shadow-[0_40px_100px_rgba(20,30,20,.45)]"
    >
      {/* Card header */}
      <div className="mb-[22px] flex flex-wrap items-center justify-between gap-3">
        <span className="text-[12px] uppercase tracking-[.12em] text-cream/50">
          {copy.cardLabel}
        </span>
        <span
          className="flex items-center gap-2 text-[12px] text-sage-bright"
          role="status"
          aria-live="polite"
        >
          <span
            className="ai-pulse-fast h-[7px] w-[7px] rounded-full bg-sage-bright"
            aria-hidden="true"
          />
          {status}
        </span>
      </div>

      {/* Diagram */}
      <div className="relative mt-[30px] grid min-h-[300px] grid-cols-1 items-stretch gap-[clamp(10px,3vw,30px)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Connectors + packets (desktop layout only) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-[1] hidden h-full w-full overflow-visible sm:block"
          aria-hidden="true"
        >
          {sources.map((s) => (
            <g key={s.label}>
              <path
                d={s.path}
                fill="none"
                stroke={s.line}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                style={{ transition: "stroke .45s ease" }}
              />
              <path
                d={s.path}
                fill="none"
                stroke="var(--color-gold-bright)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="7 100"
                className="ai-travel-src"
                style={{ opacity: s.packet, transition: "opacity .3s" }}
              />
            </g>
          ))}
          {outputs.map((o) => (
            <g key={o.label}>
              <path
                d={o.path}
                fill="none"
                stroke={o.line}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                style={{ transition: "stroke .45s ease" }}
              />
              <path
                d={o.path}
                fill="none"
                stroke="var(--color-sage-bright)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="7 100"
                className="ai-travel-out"
                style={{ opacity: o.packet, transition: "opacity .3s" }}
              />
            </g>
          ))}
        </svg>

        {/* Sources */}
        <div className="relative z-[2] grid grid-rows-[repeat(4,minmax(0,1fr))] gap-[10px] pt-6 sm:pt-0">
          <p className="absolute left-0 top-0 whitespace-nowrap text-[10.5px] uppercase tracking-[.14em] text-cream/50 sm:-top-[22px]">
            {copy.sourcesLabel}
          </p>
          {sources.map((s) => (
            <div
              key={s.label}
              className="relative z-[2] flex items-center gap-[10px] rounded-xl px-3.5 py-3"
              style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                transition: "all .45s ease",
              }}
            >
              <span
                className="h-2 w-2 flex-none rounded-full"
                style={{ background: s.dot, transition: "all .45s ease" }}
                aria-hidden="true"
              />
              <span
                className="text-[13.5px] font-semibold leading-[1.25]"
                style={{ color: s.fg, transition: "color .45s ease" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Hub */}
        <div className="relative z-[2] grid place-items-center">
          <div
            className="grid aspect-square w-[min(100%,220px)] place-items-center rounded-full p-[18px] text-center"
            style={{
              background: hub.bg,
              border: `1.5px solid ${hub.border}`,
              boxShadow: hub.shadow,
              transition: "all .5s ease",
            }}
          >
            <div>
              <span className="mx-auto mb-2.5 block h-11 w-11 overflow-hidden rounded-full bg-cream">
                <Image
                  src="/mascot/brain-walking.png"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="mx-auto mt-1 h-9 w-auto"
                />
              </span>
              <p className="font-display text-[19px] leading-[1.1] text-cream">
                {copy.hubTitle}
              </p>
              <p
                className="mt-1.5 text-[12px]"
                style={{ color: hub.fg, transition: "color .45s" }}
              >
                {hub.note}
              </p>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="relative z-[2] grid grid-rows-[repeat(4,minmax(0,1fr))] gap-[10px] pt-6 sm:pt-0">
          <p className="absolute left-0 top-0 whitespace-nowrap text-[10.5px] uppercase tracking-[.14em] text-cream/50 sm:left-auto sm:right-0 sm:-top-[22px]">
            {copy.outputsLabel}
          </p>
          {outputs.map((o) => (
            <div
              key={o.label}
              className="relative z-[2] flex items-center gap-[10px] rounded-xl px-3.5 py-3"
              style={{
                background: o.bg,
                border: `1px solid ${o.border}`,
                transition: "all .45s ease",
              }}
            >
              <span
                className="h-2 w-2 flex-none rounded-full"
                style={{ background: o.dot, transition: "all .45s ease" }}
                aria-hidden="true"
              />
              <span
                className="text-[13.5px] font-semibold leading-[1.25]"
                style={{ color: o.fg, transition: "color .45s ease" }}
              >
                {o.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer line */}
      <div className="mt-[22px] flex flex-wrap items-center justify-between gap-3 border-t border-cream/14 pt-4">
        <p className="whitespace-nowrap text-[13.5px] text-cream/72">
          Times retyped: <strong className="text-gold-pale">0</strong> &middot;
          Systems in sync: <strong className="text-gold-pale">{synced}</strong>
        </p>
        <p className="text-[13.5px] text-cream/50">{copy.footnote}</p>
      </div>
    </div>
  );
}
