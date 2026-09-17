import { ImageIcon } from "lucide-react";

type MediaSlotProps = {
  title: string;
  hint: string;
  path: string;
  code?: string;
  aspect?: "wide" | "portrait";
  lead?: boolean;
};

export function MediaSlot({
  title,
  hint,
  path,
  code,
  aspect = "wide",
  lead = false,
}: MediaSlotProps) {
  const frameClass = [
    "media-slot group/cover",
    aspect === "portrait" ? "media-portrait" : "media-wide",
    lead ? "media-lead" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={frameClass}>
      <div className="media-slot-inner">
        <p className="meta m-0 text-signal">
          {code ? `${code} / ` : null}
          Asset needed
        </p>
        <p className="media-slot-title">{title}</p>
        <p className="media-slot-hint">{hint}</p>
        <p className="media-slot-path">{path}</p>
        <ImageIcon
          aria-hidden="true"
          size={18}
          strokeWidth={1.6}
          className="mt-1 text-muted"
        />
      </div>
    </div>
  );
}
