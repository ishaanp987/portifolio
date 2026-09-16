import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { theme } from "@/config/theme";

export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: theme.background,
        color: theme.foreground,
        padding: 36,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${theme.border}`,
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.accent,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>00 / INDEX</span>
          <span>PORTFOLIO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: theme.secondary,
              lineHeight: 1.35,
              maxWidth: 820,
            }}
          >
            {site.headline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.muted,
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{site.focus}</span>
          <span>DWG 00</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
