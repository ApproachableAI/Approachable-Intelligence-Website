"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Lead Leakage Calculator.
 * Every result is computed live from the visitor's own inputs — no baked-in
 * industry stats, no email gate. The math is spelled out on the page below.
 */

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

type Field = {
  key: string;
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

const FIELDS: Field[] = [
  {
    key: "leadsPerMonth",
    label: "New inquiries per month",
    help: "Calls, emails, form fills, DMs — every time someone new raises their hand.",
    min: 1,
    max: 300,
    step: 1,
  },
  {
    key: "dealValue",
    label: "Average value of a new customer",
    help: "Roughly what a new customer is worth in their first year.",
    min: 100,
    max: 50000,
    step: 100,
    prefix: "$",
  },
  {
    key: "closeRate",
    label: "Close rate on inquiries you follow up with",
    help: "Of the people who hear back promptly, how many become customers?",
    min: 1,
    max: 100,
    step: 1,
    suffix: "%",
  },
  {
    key: "slipRate",
    label: "Inquiries that slip through the cracks",
    help: "Your honest estimate: no reply, a reply days late, or a follow-up that never happened.",
    min: 0,
    max: 80,
    step: 1,
    suffix: "%",
  },
  {
    key: "adminHours",
    label: "Team hours per week on manual handoffs",
    help: "Retyping info between inboxes, spreadsheets, and apps. Chasing status. Copy-paste.",
    min: 0,
    max: 80,
    step: 1,
  },
  {
    key: "hourValue",
    label: "What an hour is worth to your business",
    help: "A blended rate is fine. What would you pay to get one back?",
    min: 15,
    max: 500,
    step: 5,
    prefix: "$",
  },
];

const DEFAULTS: Record<string, number> = {
  leadsPerMonth: 20,
  dealValue: 2000,
  closeRate: 25,
  slipRate: 10,
  adminHours: 5,
  hourValue: 50,
};

export function LeadLeakageCalculator() {
  const [values, setValues] = useState<Record<string, number>>(DEFAULTS);

  const set = (key: string, raw: number, field: Field) => {
    const clamped = Math.min(field.max, Math.max(field.min, raw));
    setValues((v) => ({ ...v, [key]: Number.isFinite(clamped) ? clamped : field.min }));
  };

  const leakedLeadsPerYear = values.leadsPerMonth * 12 * (values.slipRate / 100);
  const lostRevenue = leakedLeadsPerYear * (values.closeRate / 100) * values.dealValue;
  const adminHoursPerYear = values.adminHours * 52;
  const adminCost = adminHoursPerYear * values.hourValue;
  const total = lostRevenue + adminCost;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Inputs */}
      <div className="rounded-[2rem] border border-ink/10 bg-cream-200/50 p-6 sm:p-9">
        <div className="space-y-7">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <div className="flex items-end justify-between gap-4">
                <label htmlFor={f.key} className="font-semibold text-ink">
                  {f.label}
                </label>
                <div className="flex items-baseline gap-0.5 text-ink">
                  {f.prefix && <span className="text-sm text-ink/60">{f.prefix}</span>}
                  <input
                    type="number"
                    id={f.key}
                    value={values[f.key]}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    onChange={(e) => set(f.key, e.target.valueAsNumber, f)}
                    className="w-20 rounded-lg border border-ink/15 bg-cream px-2 py-1 text-right font-semibold tabular-nums"
                  />
                  {f.suffix && <span className="text-sm text-ink/60">{f.suffix}</span>}
                </div>
              </div>
              <input
                type="range"
                aria-label={f.label}
                value={values[f.key]}
                min={f.min}
                max={f.max}
                step={f.step}
                onChange={(e) => set(f.key, e.target.valueAsNumber, f)}
                className="mt-3 w-full accent-rust"
              />
              <p className="mt-1.5 text-sm text-ink/60">{f.help}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[2rem] bg-deep px-6 py-9 text-cream sm:px-9">
          <p className="text-sm font-semibold uppercase tracking-wide text-chartreuse">
            Your estimated annual leak
          </p>
          <p className="mt-3 font-display text-5xl font-semibold tabular-nums sm:text-6xl">
            {money.format(Math.round(total))}
          </p>
          <p className="mt-2 text-cream/70">per year, using your numbers</p>

          <dl className="mt-8 space-y-5 border-t border-cream/15 pt-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <dt className="font-semibold text-cream">Revenue from slipped inquiries</dt>
                <dd className="mt-1 text-sm text-cream/65">
                  ~{num.format(Math.round(leakedLeadsPerYear))} inquiries a year go quiet before
                  anyone follows up
                </dd>
              </div>
              <span className="whitespace-nowrap font-semibold tabular-nums text-mustard">
                {money.format(Math.round(lostRevenue))}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <dt className="font-semibold text-cream">Manual handoff hours</dt>
                <dd className="mt-1 text-sm text-cream/65">
                  ~{num.format(adminHoursPerYear)} team hours a year spent shuffling information
                </dd>
              </div>
              <span className="whitespace-nowrap font-semibold tabular-nums text-mustard">
                {money.format(Math.round(adminCost))}
              </span>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-cream/60">
            This is an estimate built entirely from the numbers you entered, not from industry
            statistics. Change any input and it updates. The math is spelled out below.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setValues(DEFAULTS)}
          className={cn(
            "mt-4 text-sm font-semibold text-ink/60 underline underline-offset-4",
            "hover:text-rust",
          )}
        >
          Reset to example numbers
        </button>
      </div>
    </div>
  );
}
