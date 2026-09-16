import Image from "next/image";
import { SchematicCover } from "@/components/projects/SchematicCover";
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
  const frameClass = [
    "schematic-frame group/cover aspect-[16/10]",
    size === "lead"
      ? "min-h-[22rem] md:min-h-[28rem] lg:min-h-[36rem] xl:min-h-[40rem]"
      : "min-h-[16rem] lg:min-h-[24rem]",
  ].join(" ");
  if (!project.coverImage) {
    return (
      <div className={frameClass}>
        <SchematicCover
          seed={project.slug}
          title={getProjectCoverAlt(project)}
          code={project.code}
        />
      </div>
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
        className="schematic-media object-cover"
      />
    </div>
  );
}
