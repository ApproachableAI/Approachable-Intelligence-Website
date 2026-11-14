"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Feature } from "@/lib/industries";
import { Icon } from "./icons";
import { cn } from "@/lib/cn";

/* Accent per card as an RGB triplet: sage-bright, gold-bright, terra-bright, cream. */
const ACCENTS = ["158,196,154", "224,174,63", "216,114,74", "242,242,230"];

/**
 * Feature cards with a cursor-following glow. On wide screens: a grid with
 * the hover treatment. On phones: a swipeable, snapping row where the
 * centered card takes the lit state instead (there is no hover on touch).
 */
export function FeatureCards({
  items,
  columns = 4,
}: {
  items: readonly Feature[];
  columns?: 3 | 4;
}) {
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
              setActive(Number((entry.target as HTMLElement).dataset.index));
            }
          }
        },
        { root: scroller, threshold: 0.6 },
      );
      scroller
        .querySelectorAll<HTMLElement>("[data-index]")
        .forEach((el) => io!.observe(el));
    };

    mq.addEventListener("change", sync);
    const raf = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);

  /* Track the pointer so each card's glow follows it. */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>(".who-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const scrollTo = (i: number) => {
    const card = scrollerRef.current?.querySelector<HTMLElement>(
      `[data-index="${i}"]`,
    );
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <div
        ref={scrollerRef}
        onPointerMove={onPointerMove}
        className={cn(
          "no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-px-6 px-6 pb-8 pt-4 md:mx-0 md:grid md:snap-none md:gap-[18px] md:overflow-visible md:p-0",
          columns === 4
            ? "md:grid-cols-2 xl:grid-cols-4"
            : "md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            data-index={i}
            className={cn(
              "who-card w-[min(78vw,340px)] shrink-0 snap-center md:w-auto md:shrink",
              i === active && "is-active",
            )}
            style={{ "--accent": ACCENTS[i % ACCENTS.length] } as CSSProperties}
          >
            <div className="who-card__glow" aria-hidden="true" />
            <div className="who-card__icon">
              <Icon name={item.icon} size={26} stroke="#1B231B" strokeWidth={2.25} />
            </div>
            <h3 className="relative mt-2 text-[24px] leading-[1.15]">{item.title}</h3>
            <p className="relative text-[15px] leading-[1.6] text-cream/72">
              {item.body}
            </p>
            <span className="who-card__bar" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Swipe position, phones only */}
      <div className="-mt-2 flex justify-center gap-2 md:hidden" aria-hidden="true">
        {items.map((item, i) => (
          <button
            key={item.title}
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
