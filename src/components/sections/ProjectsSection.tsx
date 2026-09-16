import { Container } from "@/components/layout/Container";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getArchiveProjects, getFeaturedProjects } from "@/lib/projects";
import { getSectionIndex } from "@/lib/sections";

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  const archive = getArchiveProjects();
  const archivePreview = archive.slice(0, 4);
  const index = getSectionIndex("projects");

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-anchor">
      <Container className="section-space">
        <SectionHeading index={index} label="Projects" />
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>

        {featured.length === 0 ? (
          <p className="max-w-xl text-secondary">
            No featured projects yet. Add a project in{" "}
            <code className="font-mono text-[0.85em] text-muted">
              src/data/projects.ts
            </code>{" "}
            and set{" "}
            <code className="font-mono text-[0.85em] text-muted">featured: true</code>.
          </p>
        ) : (
          <div>
            {featured.map((project, index) => (
              <FeaturedProject key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}

        {archivePreview.length > 0 ? (
          <div className="mt-16 border-t border-border pt-12 md:mt-20">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                index={`${index}.1`}
                label="Archive"
                className="mb-0 min-w-[12rem] flex-1"
              />
              {archive.length > archivePreview.length ? (
                <TextLink href="/projects" variant="action">
                  Full index
                </TextLink>
              ) : (
                <TextLink href="/projects" variant="ghost">
                  Open index
                </TextLink>
              )}
            </div>
            <ProjectIndex projects={archivePreview} startIndex={featured.length} />
          </div>
        ) : (
          <div className="mt-12">
            <TextLink href="/projects" variant="ghost">
              Open project index
            </TextLink>
          </div>
        )}
      </Container>
    </section>
  );
}
