import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Approachable Intelligence mascot.
 *
 * Drop more poses into /public/mascot and add them to POSES below.
 * Anything not yet supplied falls back to the walking brain, so the
 * site never shows a broken image while assets are still coming in.
 */
const POSES = {
  walking: { src: "/mascot/brain-walking.png", alt: "Friendly cartoon brain walking in checkered sneakers" },
  pointing: { src: "/mascot/brain-pointing.png", alt: "Friendly cartoon brain pointing the way" },
  leaning: { src: "/mascot/brain-leaning.png", alt: "Friendly cartoon brain leaning casually" },
  standing: { src: "/mascot/brain-standing.png", alt: "Friendly cartoon brain waving hello" },
  sitting: { src: "/mascot/brain-sitting.png", alt: "Friendly cartoon brain relaxing in an armchair with glasses" },
} as const;

export type Pose = keyof typeof POSES;

// Until every pose art lands, missing ones reuse the walking brain.
const AVAILABLE: Record<Pose, boolean> = {
  walking: true,
  pointing: false,
  leaning: false,
  standing: false,
  sitting: false,
};

export function Brain({
  pose = "walking",
  size = 160,
  className,
  priority = false,
  bob = false,
  tone = "default",
}: {
  pose?: Pose;
  size?: number;
  className?: string;
  priority?: boolean;
  bob?: boolean;
  // The art is black line work on transparent. Use "light" on dark
  // backgrounds to flip it to white so the lines stay visible.
  tone?: "default" | "light";
}) {
  const chosen = AVAILABLE[pose] ? pose : "walking";
  const { src, alt } = POSES[chosen];
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={cn(
        "h-auto w-auto select-none",
        bob && "ai-bob",
        tone === "light" && "[filter:invert(1)_brightness(2)]",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}
