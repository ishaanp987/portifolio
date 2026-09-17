import Image from "next/image";
import { MediaSlot } from "@/components/media/MediaSlot";
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
    return (
      <MediaSlot
        title={`${project.title} cover`}
        hint="Add a screenshot, photograph, CAD still, or prototype image of the work."
        path={`public/projects/${project.slug}/cover.webp · then set coverImage in src/data/projects.ts`}
        code={project.code}
        aspect="wide"
        lead={lead}
      />
    );
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
