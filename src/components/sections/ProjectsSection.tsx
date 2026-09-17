import { Container } from "@/components/layout/Container";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { DevNote } from "@/components/ui/DevNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getHomepageArchive, getHomepageFeatured } from "@/lib/projects";
import { getSectionIndex } from "@/lib/sections";

export function ProjectsSection() {
  const featured = getHomepageFeatured();
  const archive = getHomepageArchive();
  const archivePreview = archive.slice(0, 4);
  const index = getSectionIndex("projects");

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-anchor border-t border-border bg-background-secondary"
    >
      <Container width="wide" className="pt-[var(--space-section)] pb-4">
        <SectionHeading index={index} label="Selected work" />
        <h2 id="projects-heading" className="max-w-[16ch] text-[length:var(--text-page)]">
          Featured work.
        </h2>
      </Container>
      <Container width="wide" className="pb-[var(--space-section)]">
        {featured.length === 0 ? (
          process.env.NODE_ENV === "development" ? (
            <DevNote>
              Featured projects appear here once real entries exist in{" "}
              <code>src/data/projects.ts</code>. Example projects are hidden in
              production.
            </DevNote>
          ) : null
        ) : (
          <div>
            {featured.map((project, projectIndex) => (
              <FeaturedProject
                key={project.slug}
                project={project}
                index={projectIndex}
              />
            ))}
          </div>
        )}

        {archivePreview.length > 0 ? (
          <div className="mt-6 border-t border-border pt-12 md:mt-10 md:pt-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                index={`${index}.1`}
                label="Archive"
                className="mb-0 min-w-[12rem] flex-1"
              />
              <TextLink href="/projects" variant="action">
                Full index
              </TextLink>
            </div>
            <ProjectIndex projects={archivePreview} startIndex={featured.length} />
          </div>
        ) : featured.length > 0 ? (
          <div className="mt-12">
            <TextLink href="/projects" variant="ghost">
              Open project index
            </TextLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
