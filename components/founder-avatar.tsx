import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Founder avatar. Shows the real photo once it is dropped into
 * /public/founders and marked available below. Until then it renders a
 * warm initial badge so the layout looks finished, not broken.
 */
const PHOTO_AVAILABLE: Record<string, boolean> = {
  // Flip to true once the matching file exists in /public/founders.
  Ty: false,
  Jordyn: false,
};

const TONES = ["bg-rust text-cream", "bg-olive text-ink", "bg-mustard text-ink"];

export function FounderAvatar({
  name,
  src,
  size = 96,
  className,
  index = 0,
}: {
  name: string;
  src: string;
  size?: number;
  className?: string;
  index?: number;
}) {
  if (PHOTO_AVAILABLE[name]) {
    return (
      <Image
        src={src}
        alt={`${name}, co-founder of Approachable Intelligence`}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-display font-semibold ring-4 ring-cream",
        TONES[index % TONES.length],
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.charAt(0)}
    </span>
  );
}
