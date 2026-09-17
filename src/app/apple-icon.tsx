import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { theme } from "@/config/theme";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.background,
        color: theme.foreground,
        fontSize: 54,
        letterSpacing: 0,
        fontWeight: 500,
      }}
    >
      {site.initials}
    </div>,
    { ...size },
  );
}
