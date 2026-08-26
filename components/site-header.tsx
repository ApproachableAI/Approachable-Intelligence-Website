"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, ctaLabel, site } from "@/lib/site";
import { Logo } from "./logo";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] bg-cream/85 backdrop-blur-[10px] supports-[backdrop-filter]:bg-cream/85">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-[22px] px-5 py-3 sm:px-7">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-rust transition-colors hover:text-rust-600"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.formUrl}
            className="rounded-full bg-rust px-[18px] py-[9px] text-[13px] font-semibold text-cream transition-colors hover:bg-rust-600 active:bg-rust-700"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-ink/15 md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition-transform",
                open && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 w-5 rounded bg-ink transition-transform",
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
          className="border-t border-ink/10 bg-cream md:hidden"
        >
          <div className="space-y-1 px-5 py-4">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-lg font-medium text-ink hover:bg-sage-100"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.formUrl}
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-rust px-5 py-3 text-center text-lg font-semibold text-cream"
            >
              {ctaLabel}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
