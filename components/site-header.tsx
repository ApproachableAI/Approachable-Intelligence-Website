"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./logo";
import { BookLink } from "./book-link";
import { cn } from "@/lib/cn";

/**
 * Sticky, frosted nav on the deep-sage ground. The client-type tabs lead.
 * Below `lg` everything folds into a full-height menu.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock page scroll while the mobile menu is open, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className="sticky top-0 z-[60] border-b border-cream/14 bg-[rgba(43,59,44,.78)] backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5 px-5 py-3 sm:px-7">
        <Logo />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-[22px] text-[14px] font-medium lg:flex"
        >
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              className={cn(
                "nav-link whitespace-nowrap no-underline",
                isCurrent(link.href) ? "is-current text-cream" : "text-cream/72",
              )}
            >
              {link.label}
            </Link>
          ))}
          <BookLink className="px-5 py-2.5 text-[13.5px]" />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream ring-1 ring-cream/25 lg:hidden"
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
          className="mobile-menu absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-cream/14 bg-ink lg:hidden"
        >
          <div className="flex min-h-full flex-col px-5 pb-8 pt-4">
            {nav.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                style={{ animationDelay: `${i * 45}ms` }}
                className="mobile-menu__item flex items-center justify-between border-b border-cream/10 px-1 py-4 font-display text-[26px] leading-none text-cream no-underline"
              >
                {link.label}
                <span aria-hidden="true" className="text-[18px] text-gold-bright">
                  &rarr;
                </span>
              </Link>
            ))}
            <BookLink className="mt-7 w-full px-5 py-4 text-[17px]" arrow />
            <p className="mt-4 text-center text-[13.5px] text-cream/55">
              30 minutes with Ty. No pitch deck.
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
