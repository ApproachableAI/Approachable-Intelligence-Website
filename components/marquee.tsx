/**
 * A slow, looping strip of short phrases. The list is rendered twice so the
 * loop is seamless; the second copy is hidden from assistive tech.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center whitespace-nowrap font-display text-[clamp(20px,2.2vw,30px)] text-cream/80"
        >
          <span className="px-[clamp(18px,2.4vw,34px)]">{item}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-bright" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
