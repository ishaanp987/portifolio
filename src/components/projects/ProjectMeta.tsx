import { formatStatus } from "@/lib/format";
import { hasContent } from "@/lib/links";
import type { Project } from "@/types";
import { MetaList } from "@/components/ui/MetaList";

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <MetaList
      items={[
        { label: "Type", value: project.category },
        { label: "Stack", value: project.technologies },
        { label: "Year", value: project.year },
        {
          label: "Status",
          value: project.status ? formatStatus(project.status) : undefined,
        },
        { label: "Role", value: project.role },
      ]}
    />
  );
}

export function hasProjectMeta(project: Project): boolean {
  return Boolean(
    hasContent(project.category) ||
    (project.technologies && project.technologies.length > 0) ||
    hasContent(project.year) ||
    hasContent(project.status) ||
    hasContent(project.role),
  );
}
