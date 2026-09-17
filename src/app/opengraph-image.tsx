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
        padding: 44,
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
          padding: "52px 58px",
          background: theme.backgroundSecondary,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.accent,
            fontSize: 18,
            letterSpacing: 3.2,
            textTransform: "uppercase",
          }}
        >
          <span>{site.role}</span>
          <span>{site.initials}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              letterSpacing: -3.4,
              lineHeight: 0.92,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 28,
              color: theme.secondary,
              lineHeight: 1.3,
              maxWidth: 820,
            }}
          >
            {site.statement.join(" ")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.muted,
            fontSize: 18,
            letterSpacing: 2.2,
            textTransform: "uppercase",
          }}
        >
          <span>{site.focusAreas.join("  /  ")}</span>
          <span>{site.focus}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
