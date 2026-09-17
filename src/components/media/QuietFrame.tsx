type QuietFrameProps = {
  aspect?: "wide" | "portrait";
  lead?: boolean;
};

export function QuietFrame({ aspect = "wide", lead = false }: QuietFrameProps) {
  const frameClass = [
    "quiet-frame",
    aspect === "portrait" ? "media-portrait" : "media-wide",
    lead ? "media-lead" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={frameClass} aria-hidden="true" />;
}
