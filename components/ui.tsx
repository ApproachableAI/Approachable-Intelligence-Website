import { cn } from "@/lib/cn";

/** Centered content column with consistent gutters. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** A vertical rhythm wrapper for page sections. */
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

/** Small label above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-rust",
        className,
      )}
    >
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-olive" />
      {children}
    </p>
  );
}
