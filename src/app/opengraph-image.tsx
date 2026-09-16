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
          width: 8,
          height: "100%",
          background: theme.accent,
          marginRight: 28,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${theme.border}`,
          padding: "52px 60px",
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
          <span>00 / PORTFOLIO</span>
          <span>DWG 00</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              letterSpacing: -4,
              lineHeight: 0.86,
              textTransform: "uppercase",
            }}
          >
            <span>{site.firstName}</span>
            <span>{site.lastName}</span>
          </div>
          <div
            style={{
              width: 56,
              height: 3,
              background: theme.accent,
              marginTop: 28,
              marginBottom: 22,
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: theme.secondary,
              lineHeight: 1.35,
              maxWidth: 780,
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
            fontSize: 18,
            letterSpacing: 2.4,
            textTransform: "uppercase",
          }}
        >
          <span>{site.disciplines.join(" / ")}</span>
          <span>{site.initials} / LAB</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
