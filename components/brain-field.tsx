import Script from "next/script";
import { createElement, type CSSProperties } from "react";

/**
 * The hero's Three.js particle brain. `public/brain-field.js` registers the
 * <brain-field> web component (it pulls three@0.160.0 from unpkg on demand,
 * pauses off-screen, and honours prefers-reduced-motion). We only render the
 * custom element here; the script upgrades it once it loads.
 */
export function BrainField({
  density = "7500",
  className,
  style,
}: {
  density?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <>
      <Script src="/brain-field.js" strategy="afterInteractive" />
      {createElement("brain-field", {
        density,
        className,
        style: { display: "block", width: "100%", height: "100%", ...style },
      })}
    </>
  );
}
