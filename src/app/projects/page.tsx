import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { getVisibleProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Project index — ${site.name}.`,
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getVisibleProjects();

  return (
    <div className="section-space">
      <Container>
        <SectionHeading index="01" label="Index" />
        <h1 className="max-w-[12ch] text-[length:var(--text-page)] font-medium tracking-[-0.04em]">
          All projects
        </h1>
        <p className="mt-4 max-w-[36rem] text-secondary">
          A register of visible work. Hidden drafts stay in the data file and never appear
          here.
        </p>
        <div className="mt-10">
          {projects.length === 0 ? (
            <p className="text-secondary">
              No projects to show. Add objects in{" "}
              <code className="font-mono text-[0.85em] text-muted">
                src/data/projects.ts
              </code>
              .
            </p>
          ) : (
            <ProjectIndex projects={projects} caption="No." />
          )}
        </div>
      </Container>
    </div>
  );
}
