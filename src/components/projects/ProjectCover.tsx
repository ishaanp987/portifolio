import Image from "next/image";
import { QuietFrame } from "@/components/media/QuietFrame";
import { getProjectCoverAlt } from "@/lib/projects";
import type { Project } from "@/types";

type ProjectCoverProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
  size?: "lead" | "default";
};

export function ProjectCover({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 48vw, 100vw",
  size = "default",
}: ProjectCoverProps) {
  const lead = size === "lead";
  const frameClass = ["media-frame group/cover media-wide", lead ? "media-lead" : ""]
    .filter(Boolean)
    .join(" ");

  if (!project.coverImage) {
    return <QuietFrame aspect="wide" />;
  }

  return (
    <div className={frameClass}>
      <Image
        src={project.coverImage}
        alt={getProjectCoverAlt(project)}
        fill
        sizes={sizes}
        priority={priority}
        className="media-zoom object-cover"
      />
    </div>
  );
}
