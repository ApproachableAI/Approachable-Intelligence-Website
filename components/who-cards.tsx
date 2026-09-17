"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { painPoints } from "@/lib/content";
import { cn } from "@/lib/cn";

/* Lucide icon paths for the cards. */
const ICONS = [
  // Funnel — operational bottlenecks
  <path key="funnel" d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" />,
  // Copy — system fragmentation
  <g key="copy">
    <rect x="9" y="9" width="12" height="12" rx="2.5" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </g>,
  // Zap — underused technology
  <path key="zap" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  // Heart — the personal touch
  <path
    key="heart"
    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"
  />,
];

/* Accent per card as an RGB triplet: sage-bright, gold-bright, terra-bright, cream. */
const ACCENTS = ["158,196,154", "224,174,63", "216,114,74", "242,242,230"];

/**
 * "Who we work with" cards. On wide screens: a four-up grid with the hover
 * treatment. On phones: a swipeable, snapping row where the centered card
 * takes the lit state instead (there is no hover on touch).
 */
export function WhoCards() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const mq = window.matchMedia("(max-width: 767px)");
    let io: IntersectionObserver | null = null;

    const sync = () => {
      io?.disconnect();
      io = null;
      if (!mq.matches) {
        setActive(-1);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const i = Number((entry.target as HTMLElement).dataset.index);
              setActive(i);
            }
          }
        },
        { root: scroller, threshold: 0.6 },
      );
      scroller.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => io!.observe(el));
    };

    mq.addEventListener("change", sync);
    // Initial attach happens in a callback so the effect body stays side-effect only.
    const raf = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);

  const scrollTo = (i: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(`[data-index="${i}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-px-7 px-7 pb-8 pt-4 md:mx-0 md:grid md:snap-none md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:gap-[18px] md:overflow-visible md:p-0"
      >
        {painPoints.map((point, i) => (
          <div
            key={point.title}
            data-index={i}
            className={cn(
              "who-card w-[min(76vw,340px)] shrink-0 snap-center md:w-auto md:shrink",
              i === active && "is-active",
            )}
            style={{ "--accent": ACCENTS[i] } as CSSProperties}
          >
            <div className="who-card__glow" aria-hidden="true" />
            <div className="who-card__icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1B231B"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[i]}
              </svg>
            </div>
            <h3 className="mt-2 text-[24px]">{point.title}</h3>
            <p className="text-[15px] leading-[1.6] text-cream/72">{point.body}</p>
            <span className="who-card__bar" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Swipe position, phones only */}
      <div className="-mt-2 flex justify-center gap-2 md:hidden" aria-hidden="true">
        {painPoints.map((point, i) => (
          <button
            key={point.title}
            type="button"
            tabIndex={-1}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-6 bg-gold-bright" : "w-2 bg-cream/30",
            )}
          />
        ))}
      </div>
    </>
  );
}
