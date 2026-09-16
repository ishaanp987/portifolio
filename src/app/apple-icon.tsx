import { ImageResponse } from "next/og";
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
      }}
    >
      <div
        style={{
          width: 118,
          height: 118,
          display: "flex",
          border: `3px solid ${theme.accent}`,
        }}
      />
    </div>,
    { ...size },
  );
}
