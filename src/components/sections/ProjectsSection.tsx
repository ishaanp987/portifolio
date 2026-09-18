import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getHomepageArchive, getHomepageFeatured } from "@/lib/projects";
import { getSectionIndex } from "@/lib/sections";

export function ProjectsSection() {
  const featured = getHomepageFeatured();
  const archive = getHomepageArchive();
  const archivePreview = archive.slice(0, 4);
  const index = getSectionIndex("projects");
  if (featured.length === 0 && archivePreview.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-anchor border-t border-border bg-background-secondary"
    >
      <Container width="wide" className="pt-[var(--space-section)] pb-4">
        <Reveal>
          <SectionHeading index={index} label="Selected work" />
        </Reveal>
        <Reveal delay={70}>
          <h2
            id="projects-heading"
            className="max-w-[16ch] text-[length:var(--text-page)]"
          >
            Featured work.
          </h2>
        </Reveal>
      </Container>
      <Container width="wide" className="pb-[var(--space-section)]">
        {featured.length === 0 ? null : (
          <Reveal delay={110}>
            <div>
              {featured.map((project, projectIndex) => (
                <FeaturedProject
                  key={project.slug}
                  project={project}
                  index={projectIndex}
                />
              ))}
            </div>
          </Reveal>
        )}

        {archivePreview.length > 0 ? (
          <Reveal
            delay={80}
            className="mt-6 border-t border-border pt-12 md:mt-10 md:pt-16"
          >
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
          </Reveal>
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
