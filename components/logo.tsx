import Link from "next/link";
import { Brain } from "./brain";
import { cn } from "@/lib/cn";

/**
 * Logo lockup: the walking brain plus the wordmark set in the display face.
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
        size={36}
        priority
        tone={tone}
        className="transition-transform duration-300 group-hover:-rotate-6"
      />
      {withWordmark && (
        <span className="font-display text-[18px] leading-none text-ink">
          Approachable Intelligence
        </span>
      )}
    </Link>
  );
}
