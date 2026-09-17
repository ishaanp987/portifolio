import { TextLink } from "@/components/ui/TextLink";
import { formatStatus } from "@/lib/format";
import { formatProjectIndex, getProjectHref } from "@/lib/projects";
import type { Project } from "@/types";

export function ProjectIndex({
  projects,
  startIndex = 0,
  caption = "Archive",
}: {
  projects: Project[];
  startIndex?: number;
  caption?: string;
}) {
  if (projects.length === 0) {
    return (
      <p className="source-hint">
        No additional projects yet. Add entries in <code>src/data/projects.ts</code> and
        leave <code>featured</code> unset or beyond the homepage limit.
      </p>
    );
  }

  return (
    <div className="min-w-0">
      <div className="hidden border-b border-border pb-3 md:grid md:grid-cols-[3rem_minmax(0,1.6fr)_minmax(0,0.85fr)_4.25rem_6.25rem] md:gap-x-5">
        <span className="meta">{caption === "Archive" ? "No." : caption}</span>
        <span className="meta">Project</span>
        <span className="meta">Type</span>
        <span className="meta">Year</span>
        <span className="meta">Status</span>
      </div>
      <ul className="m-0 list-none p-0">
        {projects.map((project, index) => {
          const href = getProjectHref(project);
          const number = formatProjectIndex(startIndex + index);
          return (
            <li key={project.slug} className="min-w-0">
              <TextLink
                href={href}
                variant="plain"
                className="index-row"
                ariaLabel={`${project.title} case study`}
              >
                <span className="meta text-accent">{number}</span>
                <span className="min-w-0">
                  <span className="index-title block text-[1.02rem] tracking-[-0.02em] text-foreground">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted md:hidden">
                    {[
                      project.category,
                      project.year,
                      project.status ? formatStatus(project.status) : null,
                    ]
                      .filter(Boolean)
                      .join("  ·  ")}
                  </span>
                </span>
                <span className="hidden min-w-0 text-sm text-secondary md:block">
                  {project.category ?? "—"}
                </span>
                <span className="meta hidden md:block">{project.year ?? "—"}</span>
                <span className="meta hidden md:block">
                  {project.status ? formatStatus(project.status) : "—"}
                </span>
              </TextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
