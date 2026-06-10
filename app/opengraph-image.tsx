import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card. Swap in the mascot art later if you want it richer.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fefbea",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              height: 18,
              width: 18,
              borderRadius: 9999,
              background: "#b7410e",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, color: "#2a344d" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              color: "#2a344d",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            AI for small businesses that refuse to feel like robots.
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#b7410e", fontWeight: 700 }}>
            Big Tech Energy. Small Business Soul.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#5c6885" }}>
          AI integration for service businesses &middot; Colorado
        </div>
      </div>
    ),
    { ...size },
  );
}
