import { site, ctaLabel } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * The one primary call to action: book a call on Calendly. Opens in a new
 * tab so visitors keep their place on the site.
 */
export function BookLink({
  className,
  children = ctaLabel,
  variant = "gold",
  arrow = false,
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "gold" | "outline" | "cream";
  arrow?: boolean;
}) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(`btn-${variant}`, className)}
    >
      {children}
      {arrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="btn-arrow"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
      <span className="sr-only"> (opens Calendly in a new tab)</span>
    </a>
  );
}
