import Link from "next/link";
import { ctaLabel, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * The one primary call to action, repeated cleanly down the site.
 * Points to the existing intake form. Use variant="ghost" for a quieter look.
 */
export function CtaButton({
  className,
  variant = "solid",
  label = ctaLabel,
  href = "/contact",
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

  return (
    <Link href={href} className={cn(base, styles, className)}>
      {label}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  );
}

/** Direct link to the intake form, for the final contact step. */
export function FormLink({ className }: { className?: string }) {
  return (
    <a
      href={site.formUrl}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-rust px-7 py-3.5 text-base font-semibold text-cream shadow-[0_2px_0_0_var(--color-rust-700)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-rust-600",
        className,
      )}
    >
      {ctaLabel}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
