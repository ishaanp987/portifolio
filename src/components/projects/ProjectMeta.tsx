import { formatStatus } from "@/lib/format";
import { isRealValue, publicItems } from "@/lib/content";
import type { Project } from "@/types";
import { MetaList } from "@/components/ui/MetaList";

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <MetaList
      items={[
        {
          label: "Type",
          value: isRealValue(project.category) ? project.category : undefined,
        },
        { label: "Stack", value: publicItems(project.technologies) },
        { label: "Year", value: isRealValue(project.year) ? project.year : undefined },
        {
          label: "Status",
          value: isRealValue(project.status) ? formatStatus(project.status) : undefined,
        },
        { label: "Role", value: isRealValue(project.role) ? project.role : undefined },
      ]}
    />
  );
}
