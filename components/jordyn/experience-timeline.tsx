"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  experienceFilters,
  lensMeta,
  roles,
  type ExperienceFilter,
} from "@/lib/jordyn";

const lensMark: Record<string, string> = {
  people: "m-people",
  ai: "m-ai",
  ops: "m-ops",
};

/**
 * The filterable chapter timeline. This is the only interactive piece on the
 * profile. It server-renders every chapter with "All" active, so the full work
 * history is in the HTML and readable with JavaScript turned off; the tabs are
 * a progressive enhancement that hides the chapters that do not match.
 */
export function ExperienceTimeline() {
  const [active, setActive] = useState<ExperienceFilter>("all");

  return (
    <>
      <div className="filters reveal" role="tablist" aria-label="Filter the work by kind">
        {experienceFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active === f.id}
            className={cn("filter", active === f.id && "active")}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {roles.map((role, i) => {
        const hidden = active !== "all" && role.lens !== active;
        return (
          <div key={i} className={cn("chapter reveal", hidden && "hide")} data-lens={role.lens}>
            <div>
              <div className="ch-year">{role.year}</div>
              <span className="ch-lens">
                <span className={cn("lens-mark", lensMark[role.lens])} />
                {lensMeta[role.lens].label}
              </span>
            </div>
            <div>
              <div className="ch-role">{role.role}</div>
              <div className="ch-org">{role.org}</div>
              <p className="ch-desc">{role.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
