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
          background: "#f2f2e6",
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
              background: "#8e4125",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, color: "#242b20" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              color: "#242b20",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Clear your plate. Keep your special sauce.
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#8e4125", fontWeight: 700 }}>
            Big Tech Energy. Small Business Soul.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#42573f" }}>
          AI integration for service businesses &middot; Colorado
        </div>
      </div>
    ),
    { ...size },
  );
}
