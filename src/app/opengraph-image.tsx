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
        padding: 40,
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
          borderRadius: 28,
          padding: "52px 60px",
          background: theme.backgroundSecondary,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.accent,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>{`${site.initials} / LAB`}</span>
          <span>{site.role}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              color: theme.accent,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {site.greeting}
          </div>
          <div
            style={{
              fontSize: 72,
              letterSpacing: -3,
              lineHeight: 0.95,
            }}
          >
            {`I’m ${site.firstName}.`}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 28,
              color: theme.secondary,
              lineHeight: 1.3,
              maxWidth: 780,
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
          <span>{site.focusAreas.join(" / ")}</span>
          <span>{site.name}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
