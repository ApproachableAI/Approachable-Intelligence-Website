import Link from "next/link";
import { Brain } from "./brain";
import { cn } from "@/lib/cn";

/**
 * Logo lockup: the brain mark plus the wordmark set in our display face.
 * Built from text so it stays crisp at any size and recolors with the theme.
 */
export function Logo({
  className,
  withWordmark = true,
  tone = "default",
}: {
  className?: string;
  withWordmark?: boolean;
  tone?: "default" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Approachable Intelligence, home"
    >
      <Brain
        pose="walking"
        size={40}
        priority
        tone={tone}
        className="transition-transform duration-300 group-hover:-rotate-6"
      />
      {withWordmark && (
        <span className="font-display text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
          Approachable
          <span className="text-rust"> Intelligence</span>
        </span>
      )}
    </Link>
  );
}
