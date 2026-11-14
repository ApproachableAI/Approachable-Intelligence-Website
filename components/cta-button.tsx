import Link from "next/link";
import { ctaLabel, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Call to action for the light "paper" pages. By default it books a call
 * on Calendly; pass an internal `href` to link somewhere on the site instead.
 * Use variant="ghost" for a quieter look.
 */
export function CtaButton({
  className,
  variant = "solid",
  label = ctaLabel,
  href = site.bookingUrl,
}: {
  className?: string;
  variant?: "solid" | "ghost";
  label?: string;
  href?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-200 focus-visible:outline-none";
  const styles =
    variant === "solid"
      ? "bg-rust text-cream shadow-[0_2px_0_0_var(--color-rust-700)] hover:bg-rust-600 hover:-translate-y-0.5 active:translate-y-0"
      : "bg-transparent text-ink ring-2 ring-ink/15 hover:ring-ink/40 hover:-translate-y-0.5";

  const arrow = (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
      &rarr;
    </span>
  );

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, styles, className)}
      >
        {label}
        {arrow}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, styles, className)}>
      {label}
      {arrow}
    </Link>
  );
}
