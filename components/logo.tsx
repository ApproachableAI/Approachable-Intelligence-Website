import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Brand lockup: the walking mascot in a 38px cream disc, plus the wordmark
 * set in the heading face. Built from text so it stays crisp and on-theme.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 text-cream no-underline", className)}
      aria-label={`${site.name}, home`}
    >
      <span className="grid h-[38px] w-[38px] shrink-0 place-items-center overflow-hidden rounded-full bg-cream">
        <Image
          src="/mascot/brain-walking.png"
          alt="Approachable Intelligence brain mascot"
          width={60}
          height={60}
          priority
          className="h-[30px] w-auto"
        />
      </span>
      <span className="font-display text-[20px] leading-none tracking-[-0.01em]">
        {site.name}
      </span>
    </Link>
  );
}
