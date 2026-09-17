"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, ctaLabel, site } from "@/lib/site";
import { Logo } from "./logo";
import { cn } from "@/lib/cn";

/**
 * Sticky, frosted nav on the deep-sage ground. Links wrap on wide screens
 * exactly like the design; below `md` they fold into a hamburger menu.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-cream/14 bg-[rgba(43,59,44,.74)] backdrop-blur-[14px]">
      <div className="flex flex-wrap items-center justify-between gap-[22px] px-5 py-3.5 sm:px-7">
        <Logo />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden flex-wrap items-center gap-[26px] text-[14px] font-medium md:flex"
        >
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream/72 no-underline transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.formUrl}
            className="btn-gold px-5 py-2.5 text-[13.5px]"
          >
            {ctaLabel}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream ring-1 ring-cream/25 md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded bg-cream transition-transform",
                open && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-5 rounded bg-cream transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 w-5 rounded bg-cream transition-transform",
                open && "top-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-cream/14 bg-ink md:hidden"
        >
          <div className="space-y-1 px-5 py-4">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-lg font-medium text-cream no-underline hover:bg-ink-2"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.formUrl}
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 w-full px-5 py-3 text-lg"
            >
              {ctaLabel}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
