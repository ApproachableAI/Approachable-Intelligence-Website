"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type IndustryTab = {
  slug: string;
  label: string;
  summary: string;
  bullets: string[];
  badge?: string;
};

/**
 * "Who we help" switcher on the home page. Real tabs (arrow keys move
 * between them); each panel links through to the full client-type page.
 */
export function IndustryTabs({ tabs }: { tabs: IndustryTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const delta =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`industry-tab-${tabs[next].slug}`)?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] lg:gap-8">
      <div
        role="tablist"
        aria-label="Client types"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-2.5 lg:grid-cols-1 lg:content-start lg:gap-3"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.slug}
              id={`industry-tab-${t.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="industry-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "group relative min-w-0 rounded-[18px] border px-4 py-4 text-left transition-all duration-300 lg:px-6 lg:py-6",
                selected
                  ? "border-gold-bright/70 bg-gold-bright/12 shadow-[0_18px_50px_rgba(20,30,20,.4)]"
                  : "border-cream/14 bg-cream/[.03] hover:border-cream/35",
              )}
            >
              <span
                className={cn(
                  "block text-[11.5px] font-semibold uppercase tracking-[.16em] transition-colors",
                  selected ? "text-gold-pale" : "text-cream/45",
                )}
              >
                0{i + 1}
              </span>
              <span className="mt-1.5 block font-display text-[clamp(19px,2.3vw,30px)] leading-[1.1]">
                {t.label}
              </span>
              {t.badge && (
                <span className="mt-2.5 hidden rounded-full bg-sage-bright/18 px-2.5 py-1 text-[11.5px] font-semibold text-sage-bright lg:inline-block">
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        key={tab.slug}
        id="industry-panel"
        role="tabpanel"
        aria-labelledby={`industry-tab-${tab.slug}`}
        className="tab-panel min-w-0 rounded-[22px] border border-cream/14 bg-ink-2 p-6 sm:p-9"
      >
        <p className="max-w-[560px] text-[clamp(18px,1.7vw,22px)] leading-[1.5] text-cream/90">
          {tab.summary}
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tab.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-[1.5] text-cream/78">
              <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-bright text-[#1B231B]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href={`/industries/${tab.slug}`}
          className="btn-outline mt-8 max-w-full px-6 py-3 text-left text-[15px] !whitespace-normal"
        >
          See how we work with {tab.label.toLowerCase()}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
