import type { CSSProperties } from "react";

/**
 * A mechanical plan that drafts itself: walls, a duct main with branches
 * and diffusers, a dimension string, equipment tags, and one item caught
 * in a revision cloud. Purely decorative; every stroke uses pathLength=1
 * so one CSS animation draws them all (see `.bp` in globals.css).
 */
const d = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

const CREAM = "rgba(242,242,230,.62)";
const FAINT = "rgba(242,242,230,.34)";
const SAGE = "#9EC49A";
const GOLD = "#E0AE3F";

function Diffuser({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g className="bp-fade" style={d(delay)}>
      <rect x={x - 11} y={y - 11} width="22" height="22" fill="none" stroke={SAGE} strokeWidth="1.6" />
      <path d={`M${x - 11} ${y - 11} L${x + 11} ${y + 11} M${x + 11} ${y - 11} L${x - 11} ${y + 11}`} stroke={SAGE} strokeWidth="1.1" />
    </g>
  );
}

function Tag({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) {
  return (
    <g className="bp-fade" style={d(delay)}>
      <path
        d={`M${x - 27} ${y} l9 -13 h36 l9 13 l-9 13 h-36 z`}
        fill="#263627"
        stroke={CREAM}
        strokeWidth="1.2"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#F2F2E6"
        fontFamily="var(--font-figtree), sans-serif"
        letterSpacing=".04em"
      >
        {label}
      </text>
    </g>
  );
}

export function Blueprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer walls */}
      <path className="bp" pathLength={1} style={d(0.1)} d="M60 70 H580 V400 H60 Z" stroke={CREAM} strokeWidth="3" />
      {/* Interior partitions */}
      <path className="bp" pathLength={1} style={d(0.7)} d="M250 70 V205 M250 250 V400" stroke={CREAM} strokeWidth="2" />
      <path className="bp" pathLength={1} style={d(0.9)} d="M420 70 V160 M420 205 V400" stroke={CREAM} strokeWidth="2" />
      <path className="bp" pathLength={1} style={d(1.1)} d="M250 230 H330 M370 230 H420" stroke={CREAM} strokeWidth="2" />
      {/* Door swings */}
      <path className="bp" pathLength={1} style={d(1.4)} d="M250 205 A45 45 0 0 1 295 250" stroke={FAINT} strokeWidth="1.2" />
      <path className="bp" pathLength={1} style={d(1.5)} d="M420 160 A45 45 0 0 0 375 205" stroke={FAINT} strokeWidth="1.2" />

      {/* Duct main and branches */}
      <path className="bp" pathLength={1} style={d(1.7)} d="M92 142 H548 M92 166 H548" stroke={SAGE} strokeWidth="1.8" />
      <path className="bp" pathLength={1} style={d(2.2)} d="M150 166 V310 M166 166 V310 M326 166 V330 M342 166 V330 M492 166 V300 M508 166 V300" stroke={SAGE} strokeWidth="1.5" />
      {/* Air handler */}
      <g className="bp-fade" style={d(1.6)}>
        <rect x="70" y="128" width="34" height="52" fill="#263627" stroke={SAGE} strokeWidth="1.8" />
        <path d="M70 128 L104 180 M104 128 L70 180" stroke={SAGE} strokeWidth="1" />
      </g>
      <Diffuser x={158} y={322} delay={2.7} />
      <Diffuser x={334} y={342} delay={2.85} />
      <Diffuser x={500} y={312} delay={3} />

      {/* Dimension string */}
      <path className="bp" pathLength={1} style={d(2.9)} d="M60 436 H580 M60 426 V446 M250 426 V446 M420 426 V446 M580 426 V446" stroke={FAINT} strokeWidth="1.1" />
      <g className="bp-fade" style={d(3.3)} fontSize="11" fill="rgba(242,242,230,.55)" fontFamily="var(--font-figtree), sans-serif" textAnchor="middle">
        <text x="155" y="458">19&apos;-0&quot;</text>
        <text x="335" y="458">17&apos;-0&quot;</text>
        <text x="500" y="458">16&apos;-0&quot;</text>
      </g>

      {/* Equipment tags */}
      <Tag x={158} y={268} label="FCU-1" delay={3.2} />
      <Tag x={334} y={290} label="FCU-2" delay={3.35} />
      <Tag x={500} y={258} label="FCU-3" delay={3.5} />

      {/* Revision cloud: the one the workflow flagged */}
      <g className="bp-flag" style={{ animationDelay: "3.9s, 4.4s" }}>
        <path
          d="M462 222 q8 -12 19 -4 q10 -10 20 0 q12 -7 19 4 q13 2 9 14 q9 9 0 18 q4 13 -9 15 q-7 11 -19 4 q-10 9 -20 0 q-11 8 -19 -4 q-13 -2 -9 -15 q-9 -9 0 -18 q-4 -12 9 -14 z"
          stroke={GOLD}
          strokeWidth="2"
          fill="rgba(224,174,63,.08)"
        />
        <path d="M546 206 l13 23 h-26 z" fill={GOLD} />
        <text x="546" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1B231B" fontFamily="var(--font-figtree), sans-serif">
          1
        </text>
      </g>
    </svg>
  );
}
