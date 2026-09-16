import Image from "next/image";
import { SchematicCover } from "@/components/projects/SchematicCover";
import { getProjectCoverAlt } from "@/lib/projects";
import type { Project } from "@/types";

type ProjectCoverProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
};

export function ProjectCover({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 42vw, 100vw",
}: ProjectCoverProps) {
  if (!project.coverImage) {
    return (
      <div className="schematic-frame group/cover aspect-[16/10]">
        <SchematicCover
          seed={project.slug}
          title={getProjectCoverAlt(project)}
          code={project.code}
        />
      </div>
    );
  }

  return (
    <div className="schematic-frame group/cover aspect-[16/10]">
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
