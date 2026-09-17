"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-triggered entrance. Renders hidden (via the `.reveal` / `.reveal-peek`
 * CSS) and flips to visible the first time it enters the viewport. Falls
 * back to visible immediately when IntersectionObserver is unavailable, and
 * the root layout's <noscript> rule keeps content visible without JS.
 */
export function Reveal({
  variant = "rise",
  className,
  children,
  ...rest
}: {
  variant?: "rise" | "peek";
  className?: string;
  children?: ReactNode;
  id?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(variant === "peek" ? "reveal-peek" : "reveal", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
