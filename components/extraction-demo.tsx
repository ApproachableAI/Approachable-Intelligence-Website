"use client";

import { useInViewPhase } from "./use-in-view-phase";
import { cn } from "@/lib/cn";

/**
 * "Watch a workflow run": a load-calc report goes in, the workflow asks the
 * engineer what the report can't answer, extracts a schedule, back-checks
 * it, flags what looks wrong, and hands it over for review.
 *
 * A 900ms tick walks through 12 phases while the card is on screen. Every
 * element is always rendered and only changes colour/opacity, so nothing
 * shifts as it plays. All values are invented sample data.
 *
 *   0      waiting
 *   1      reading the report (scan line)
 *   2      asks the engineer a question
 *   3–4    schedule rows fill in
 *   5      back-check ticks every row
 *   6      flags raised
 *   7–10   ready for review (stamp), hold
 *   11     fade before the loop restarts
 */

const PHASES = 12;
const TICK_MS = 900;
const DONE = 9;

const STEPS = [
  { at: 1, label: "Read the report" },
  { at: 2, label: "Ask what the report can’t answer" },
  { at: 3, label: "Extract the schedule" },
  { at: 5, label: "Back-check every number" },
  { at: 6, label: "Flag what looks wrong" },
];

const ROWS = [
  { tag: "FCU-1", cfm: "640", mbh: "14.2", at: 3 },
  { tag: "FCU-2", cfm: "880", mbh: "19.6", at: 3 },
  { tag: "FCU-3", cfm: "1,150", mbh: "26.1", at: 4, flagged: true },
  { tag: "FCU-4", cfm: "520", mbh: "11.8", at: 4 },
];

const STATUS = [
  "Waiting for a report",
  "Reading the report",
  "One question for the engineer",
  "Extracting the schedule",
  "Extracting the schedule",
  "Back-checking every number",
  "Flagging what looks wrong",
  "Ready for engineer review",
  "Ready for engineer review",
  "Ready for engineer review",
  "Ready for engineer review",
  "Ready for engineer review",
];

function Check({ on }: { on: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("transition-opacity duration-300", on ? "opacity-100" : "opacity-0")}
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ExtractionDemo() {
  const { ref, phase } = useInViewPhase(PHASES, TICK_MS, DONE);
  const fading = phase === 11;
  const reading = phase === 1;
  const asking = phase === 2;
  const done = phase >= 7;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[26px] border border-cream/16 bg-[#22301F] shadow-[0_40px_100px_rgba(15,22,15,.55)] transition-opacity duration-500",
        fading && "opacity-60",
      )}
    >
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-cream/12 px-5 py-3.5 sm:px-7">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              done ? "bg-sage-bright" : "ai-pulse-fast bg-gold-bright",
            )}
            aria-hidden="true"
          />
          <p
            className="text-[12.5px] font-semibold uppercase tracking-[.14em] text-cream/80"
            aria-live="off"
          >
            {STATUS[phase]}
          </p>
        </div>
        <p className="text-[11.5px] uppercase tracking-[.14em] text-cream/40">
          Sample data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-cream/10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1fr)_minmax(0,1.45fr)]">
        {/* 1. The report going in */}
        <div className="bg-[#22301F] p-5 sm:p-7">
          <p className="mb-4 text-[11.5px] font-semibold uppercase tracking-[.16em] text-gold-pale">
            In
          </p>
          <div className="flex items-start gap-4 lg:block">
            <div
              className={cn(
                "relative h-[116px] w-[90px] shrink-0 overflow-hidden rounded-[6px] bg-cream p-2.5 shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform duration-500 lg:mx-auto lg:h-[196px] lg:w-[152px] lg:p-4",
                reading && "scale-[1.03]",
              )}
              aria-hidden="true"
            >
              <span className="block h-1.5 w-[70%] rounded-sm bg-[#2B3B2C]" />
              <span className="mt-1 block h-1 w-[45%] rounded-sm bg-[#2B3B2C]/40" />
              <span className="mt-3 grid gap-1 lg:mt-4 lg:gap-1.5">
                {[92, 84, 96, 70, 88, 60, 94, 78, 86, 52].map((w, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block h-[3px] rounded-sm bg-[#2B3B2C]/25 lg:h-1",
                      i > 5 && "hidden lg:block",
                    )}
                    style={{ width: `${w}%` }}
                  />
                ))}
              </span>
              <span className="absolute bottom-2 right-2 rounded-[3px] bg-terra px-1 py-px text-[8px] font-bold tracking-wide text-cream lg:bottom-3 lg:right-3 lg:text-[9px]">
                PDF
              </span>
              {reading && <span className="scanline" />}
            </div>
            <div className="lg:mt-5 lg:text-center">
              <p className="text-[15px] font-semibold leading-snug">
                Load calculation report
              </p>
              <p className="mt-1 text-[13px] leading-[1.5] text-cream/55">
                The PDF your modelling software already produces.
              </p>
            </div>
          </div>
        </div>

        {/* 2. What the workflow does */}
        <div className="bg-[#22301F] p-5 sm:p-7">
          <p className="mb-4 text-[11.5px] font-semibold uppercase tracking-[.16em] text-gold-pale">
            The workflow
          </p>
          <ol className="grid gap-2.5">
            {STEPS.map((step, i) => {
              const next = STEPS[i + 1]?.at ?? 7;
              const active = phase >= step.at && phase < next;
              const complete = phase >= next;
              return (
                <li
                  key={step.label}
                  className={cn(
                    "flex items-center gap-3 rounded-[12px] border px-3.5 py-2.5 text-[14px] transition-colors duration-300",
                    active
                      ? "border-gold-bright/60 bg-gold-bright/12 text-cream"
                      : complete
                        ? "border-sage-bright/35 bg-sage-bright/8 text-cream/85"
                        : "border-cream/10 bg-cream/[.03] text-cream/45",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[#1B231B] transition-colors duration-300",
                      active
                        ? "bg-gold-bright"
                        : complete
                          ? "bg-sage-bright"
                          : "bg-cream/15",
                    )}
                  >
                    <Check on={complete} />
                  </span>
                  {step.label}
                </li>
              );
            })}
          </ol>

          {/* The question it asks instead of guessing */}
          <div
            className={cn(
              "mt-3.5 rounded-[12px] border border-dashed px-3.5 py-3 transition-all duration-400",
              asking
                ? "border-gold-bright/70 bg-gold-bright/10"
                : phase > 2
                  ? "border-cream/15 opacity-70"
                  : "border-cream/10 opacity-35",
            )}
          >
            <p className="text-[13px] leading-[1.45] text-cream/85">
              &ldquo;The report doesn&rsquo;t state unit voltage. Which applies?&rdquo;
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[12px] font-semibold">
              <span className="rounded-full border border-cream/20 px-2.5 py-0.5 text-cream/55">
                120/1
              </span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 transition-colors duration-300",
                  phase >= 3
                    ? "border-sage-bright bg-sage-bright text-[#1B231B]"
                    : "border-cream/20 text-cream/55",
                )}
              >
                277/1
              </span>
              <span className="rounded-full border border-cream/20 px-2.5 py-0.5 text-cream/55">
                208/3
              </span>
            </div>
          </div>
        </div>

        {/* 3. What comes out */}
        <div className="relative bg-[#22301F] p-5 sm:p-7">
          <p className="mb-4 text-[11.5px] font-semibold uppercase tracking-[.16em] text-gold-pale">
            Out
          </p>
          <div className="overflow-hidden rounded-[12px] border border-cream/12">
            <table className="w-full border-collapse text-left text-[13px] tabular-nums sm:text-[13.5px]">
              <caption className="sr-only">
                Sample equipment selection schedule produced by the workflow
              </caption>
              <thead>
                <tr className="bg-cream/[.06] text-[11px] uppercase tracking-[.1em] text-cream/55">
                  <th className="px-3 py-2 font-semibold">Tag</th>
                  <th className="px-2 py-2 text-right font-semibold">CFM</th>
                  <th className="px-2 py-2 text-right font-semibold">MBH</th>
                  <th className="px-2 py-2 font-semibold">Volts</th>
                  <th className="w-8 px-2 py-2">
                    <span className="sr-only">Checked</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => {
                  const shown = phase >= row.at;
                  const flagged = row.flagged && phase >= 6;
                  return (
                    <tr
                      key={row.tag}
                      className={cn(
                        "border-t border-cream/10 transition-colors duration-500",
                        flagged && "bg-terra-bright/14",
                      )}
                    >
                      <td className="px-3 py-2 font-semibold">
                        <span
                          className={cn(
                            "transition-opacity duration-500",
                            shown ? "opacity-100" : "opacity-0",
                          )}
                        >
                          {row.tag}
                        </span>
                      </td>
                      {[row.cfm, row.mbh].map((v, i) => (
                        <td key={i} className="px-2 py-2 text-right">
                          <span
                            className={cn(
                              "transition-opacity duration-500",
                              shown ? "opacity-100" : "opacity-0",
                            )}
                          >
                            {v}
                          </span>
                        </td>
                      ))}
                      <td className="px-2 py-2 text-cream/75">
                        <span
                          className={cn(
                            "transition-opacity duration-500",
                            shown ? "opacity-100" : "opacity-0",
                          )}
                        >
                          277/1
                        </span>
                      </td>
                      <td
                        className={cn(
                          "px-2 py-2",
                          flagged ? "text-terra-bright" : "text-sage-bright",
                        )}
                      >
                        {flagged ? (
                          <span className="block text-center text-[13px] font-bold">!</span>
                        ) : (
                          <Check on={phase >= 5} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Flags */}
          <div
            className={cn(
              "mt-3.5 grid gap-2 transition-opacity duration-500",
              phase >= 6 ? "opacity-100" : "opacity-0",
            )}
          >
            <p className="flex items-start gap-2.5 rounded-[10px] border border-terra-bright/45 bg-terra-bright/10 px-3 py-2 text-[13px] leading-[1.45]">
              <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full bg-terra-bright" />
              <span>
                <strong className="font-semibold">Check:</strong> FCU-3 airflow is
                6% above the sum of its rooms.
              </span>
            </p>
            <p className="flex items-start gap-2.5 rounded-[10px] border border-gold-bright/40 bg-gold-bright/8 px-3 py-2 text-[13px] leading-[1.45]">
              <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full bg-gold-bright" />
              <span>
                <strong className="font-semibold">Confirm:</strong> altitude
                correction applied at 5,400 ft.
              </span>
            </p>
          </div>

          {/* Review stamp */}
          <div
            className={cn(
              "stamp pointer-events-none absolute right-4 top-3 rounded-[8px] border-2 border-sage-bright px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.14em] text-sage-bright sm:right-6 sm:top-5 sm:text-[11.5px]",
              done ? "-rotate-6 scale-100 opacity-100" : "-rotate-12 scale-150 opacity-0",
            )}
            aria-hidden="true"
          >
            Ready for review
          </div>
        </div>
      </div>

      <p className="border-t border-cream/12 px-5 py-3.5 text-center text-[13px] text-cream/55 sm:px-7">
        The engineer reviews the flags, records a response to each one, and signs
        off. The workflow never has the last word.
      </p>
    </div>
  );
}
