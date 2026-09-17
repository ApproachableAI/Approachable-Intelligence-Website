"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
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
 * Two layouts share the state: the three-column design on `sm` and up, and
 * a vertical "spine" flow on phones (sources branch into a spine that runs
 * down into the hub, then fans out to the outputs). The tick only runs while
 * the card is on screen. Under prefers-reduced-motion it parks on the final
 * "in sync" frame.
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

type Node = Tone & { label: string; packet: number; path: string };

type Hub = {
  bg: string;
  border: string;
  shadow: string;
  fg: string;
  note: string;
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

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function Chip({
  node,
  chipRef,
}: {
  node: Node;
  chipRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={chipRef}
      className="relative z-[2] flex items-center gap-[10px] rounded-xl px-3.5 py-3"
      style={{
        background: node.bg,
        border: `1px solid ${node.border}`,
        transition: "all .45s ease",
      }}
    >
      <span
        className="h-2 w-2 flex-none rounded-full"
        style={{ background: node.dot, transition: "all .45s ease" }}
        aria-hidden="true"
      />
      <span
        className="text-[13.5px] font-semibold leading-[1.25]"
        style={{ color: node.fg, transition: "color .45s ease" }}
      >
        {node.label}
      </span>
    </div>
  );
}

function HubCircle({
  hub,
  title,
  size,
  hubRef,
}: {
  hub: Hub;
  title: string;
  size: string;
  hubRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={hubRef}
      className={`grid aspect-square ${size} place-items-center rounded-full p-[18px] text-center`}
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
          {title}
        </p>
        <p
          className="mt-1.5 text-[12px]"
          style={{ color: hub.fg, transition: "color .45s" }}
        >
          {hub.note}
        </p>
      </div>
    </div>
  );
}

/* A connector: the base line plus the travelling packet. */
function Wire({
  d,
  line,
  packet,
  tone,
}: {
  d: string;
  line: string;
  packet: number;
  tone: "src" | "out";
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={line}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        style={{ transition: "stroke .45s ease" }}
      />
      <path
        d={d}
        fill="none"
        stroke={
          tone === "src" ? "var(--color-gold-bright)" : "var(--color-sage-bright)"
        }
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={100}
        strokeDasharray="7 100"
        className={tone === "src" ? "ai-travel-src" : "ai-travel-out"}
        style={{ opacity: packet, transition: "opacity .3s" }}
      />
    </g>
  );
}

function ColumnLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`whitespace-nowrap text-[10.5px] uppercase tracking-[.14em] text-cream/50 ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Phone layout: a vertical spine                                      */
/* ------------------------------------------------------------------ */

const SPINE_X = 28; // px from the left edge of the diagram
const CHIP_INDENT = 52; // px; chips start right of the spine

type Geo = {
  w: number;
  h: number;
  src: string[];
  out: string[];
  spineTop: string;
  spineBottom: string;
};

function MobileDiagram({
  sources,
  outputs,
  hub,
  spineTop,
  spineBottom,
}: {
  sources: Node[];
  outputs: Node[];
  hub: Hub;
  spineTop: { line: string; packet: number };
  spineBottom: { line: string; packet: number };
}) {
  const copy = home.demo;
  const rootRef = useRef<HTMLDivElement>(null);
  const srcRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  // Measure chip and hub positions and draw the connectors in pixel space.
  // Re-runs whenever the diagram resizes (fonts loading, orientation change).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const r = root.getBoundingClientRect();
      const hubEl = hubRef.current;
      if (r.width === 0 || !hubEl) {
        setGeo(null); // hidden on wide screens
        return;
      }
      const rel = (el: HTMLElement) => {
        const b = el.getBoundingClientRect();
        return { left: b.left - r.left, top: b.top - r.top, w: b.width, h: b.height };
      };
      const cy = (b: { top: number; h: number }) => b.top + b.h / 2;
      const srcs = srcRefs.current.filter((el): el is HTMLDivElement => !!el).map(rel);
      const outs = outRefs.current.filter((el): el is HTMLDivElement => !!el).map(rel);
      if (srcs.length < 2 || outs.length < 2) return;
      const hb = rel(hubEl);
      const hx = hb.left + hb.w / 2;
      const X = SPINE_X;

      // Source branches run from the chip into the spine (packets flow chip → hub)
      const src = srcs.map(
        (b) =>
          `M ${b.left} ${cy(b)} C ${b.left - 14} ${cy(b)}, ${X} ${cy(b) + 4}, ${X} ${cy(b) + 26}`,
      );
      // Output branches run from the spine out to the chip
      const out = outs.map(
        (b) =>
          `M ${X} ${cy(b) - 26} C ${X} ${cy(b) - 4}, ${b.left - 14} ${cy(b)}, ${b.left} ${cy(b)}`,
      );
      const firstS = srcs[0];
      const lastS = srcs[srcs.length - 1];
      const firstO = outs[0];
      const lastO = outs[outs.length - 1];
      const top = `M ${X} ${cy(firstS) + 26} L ${X} ${cy(lastS) + 26} C ${X} ${cy(lastS) + 96}, ${hx} ${hb.top - 70}, ${hx} ${hb.top}`;
      const bottom = `M ${hx} ${hb.top + hb.h} C ${hx} ${hb.top + hb.h + 70}, ${X} ${cy(firstO) - 96}, ${X} ${cy(firstO) - 26} L ${X} ${cy(lastO) - 26}`;
      setGeo({ w: r.width, h: r.height, src, out, spineTop: top, spineBottom: bottom });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative mt-6 sm:hidden">
      {geo && (
        <svg
          className="absolute inset-0 z-[1] overflow-visible"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          aria-hidden="true"
        >
          {sources.map((s, i) => (
            <Wire key={s.label} d={geo.src[i]} line={s.line} packet={s.packet} tone="src" />
          ))}
          <Wire d={geo.spineTop} line={spineTop.line} packet={spineTop.packet} tone="src" />
          <Wire d={geo.spineBottom} line={spineBottom.line} packet={spineBottom.packet} tone="out" />
          {outputs.map((o, i) => (
            <Wire key={o.label} d={geo.out[i]} line={o.line} packet={o.packet} tone="out" />
          ))}
        </svg>
      )}

      <ColumnLabel className="relative z-[2] mb-3" >
        <span style={{ paddingLeft: CHIP_INDENT }}>{copy.sourcesLabel}</span>
      </ColumnLabel>
      <div className="relative z-[2] grid gap-[10px]" style={{ paddingLeft: CHIP_INDENT }}>
        {sources.map((s, i) => (
          <Chip
            key={s.label}
            node={s}
            chipRef={(el) => {
              srcRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <div className="relative z-[2] grid place-items-center py-10">
        <HubCircle
          hub={hub}
          title={copy.hubTitle}
          size="w-[min(100%,200px)]"
          hubRef={(el) => {
            hubRef.current = el;
          }}
        />
      </div>

      <ColumnLabel className="relative z-[2] mb-3">
        <span style={{ paddingLeft: CHIP_INDENT }}>{copy.outputsLabel}</span>
      </ColumnLabel>
      <div className="relative z-[2] grid gap-[10px]" style={{ paddingLeft: CHIP_INDENT }}>
        {outputs.map((o, i) => (
          <Chip
            key={o.label}
            node={o}
            chipRef={(el) => {
              outRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wide layout: the three-column design                                */
/* ------------------------------------------------------------------ */

function WideDiagram({
  sources,
  outputs,
  hub,
}: {
  sources: Node[];
  outputs: Node[];
  hub: Hub;
}) {
  const copy = home.demo;
  return (
    <div className="relative mt-[30px] hidden min-h-[300px] grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] items-stretch gap-[clamp(10px,3vw,30px)] sm:grid">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-[1] h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {sources.map((s) => (
          <Wire key={s.label} d={s.path} line={s.line} packet={s.packet} tone="src" />
        ))}
        {outputs.map((o) => (
          <Wire key={o.label} d={o.path} line={o.line} packet={o.packet} tone="out" />
        ))}
      </svg>

      <div className="relative z-[2] grid grid-rows-[repeat(4,minmax(0,1fr))] gap-[10px]">
        <ColumnLabel className="absolute -top-[22px] left-0">{copy.sourcesLabel}</ColumnLabel>
        {sources.map((s) => (
          <Chip key={s.label} node={s} />
        ))}
      </div>

      <div className="relative z-[2] grid place-items-center">
        <HubCircle hub={hub} title={copy.hubTitle} size="w-[min(100%,220px)]" />
      </div>

      <div className="relative z-[2] grid grid-rows-[repeat(4,minmax(0,1fr))] gap-[10px]">
        <ColumnLabel className="absolute -top-[22px] right-0">{copy.outputsLabel}</ColumnLabel>
        {outputs.map((o) => (
          <Chip key={o.label} node={o} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function SyncDemo() {
  const { phase: p, ref } = useDemoPhase();
  const copy = home.demo;

  const sources: Node[] = copy.sources.map((label, i) => {
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
  const outputs: Node[] = copy.outputs.map((label, i) => {
    const y = YS[i];
    return {
      label,
      ...(outLit ? SAGE : DIM),
      packet: outFlow ? 1 : 0,
      path: `M 59 50 C 62 50, 60 ${y}, 67 ${y}`,
    };
  });

  const merged = p >= 5 && p <= 8;
  const hub: Hub = merged
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

  // Phone spine: the shared trunk lights up as soon as any source is live.
  const spineTop = {
    line: p >= 1 && p <= 8 ? GOLD.line : DIM.line,
    packet: p >= 1 && p <= 5 ? 1 : 0,
  };
  const spineBottom = {
    line: outLit ? SAGE.line : DIM.line,
    packet: outFlow ? 1 : 0,
  };

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

      <WideDiagram sources={sources} outputs={outputs} hub={hub} />
      <MobileDiagram
        sources={sources}
        outputs={outputs}
        hub={hub}
        spineTop={spineTop}
        spineBottom={spineBottom}
      />

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
