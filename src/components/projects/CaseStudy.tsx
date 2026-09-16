import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { TextLink } from "@/components/ui/TextLink";
import { hasContent } from "@/lib/links";
import { getAdjacentProjects, getProjectHref } from "@/lib/projects";
import type { Project } from "@/types";

type CaseBlock = {
  id: string;
  index: string;
  title: string;
  content: React.ReactNode;
};

export function CaseStudy({
  project,
  sequenceLabel,
}: {
  project: Project;
  sequenceLabel: string;
}) {
  const { previous, next } = getAdjacentProjects(project.slug);
  const blocks = getCaseBlocks(project);

  return (
    <article className="pb-[var(--space-section)]">
      <header className="border-b border-border">
        <div className="container-main grid gap-10 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:py-16">
          <div className="min-w-0">
            <p className="section-kicker mb-6 after:hidden">
              <span>
                {sequenceLabel}
                <span className="text-muted"> / </span>
                Case study
                {project.code ? (
                  <>
                    <span className="text-muted"> / </span>
                    {project.code}
                  </>
                ) : null}
              </span>
            </p>
            <h1 className="max-w-[16ch] text-[length:var(--text-page)] font-medium tracking-[-0.04em] text-foreground md:text-[length:var(--text-hero)]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[38rem] text-[1.02rem] leading-8 text-secondary">
              {project.longDescription ?? project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5">
              {hasContent(project.github) ? (
                <TextLink
                  href={project.github}
                  variant="action"
                  ariaLabel={`${project.title} source on GitHub`}
                >
                  GitHub
                </TextLink>
              ) : null}
              {hasContent(project.demo) ? (
                <TextLink
                  href={project.demo}
                  variant="action"
                  ariaLabel={`${project.title} live demo`}
                >
                  Demo
                </TextLink>
              ) : null}
            </div>
          </div>
          <div>
            <ProjectMeta project={project} />
          </div>
        </div>
        <div className="container-wide pb-12">
          <p className="meta mb-2">
            Fig. 00
            <span className="text-border-strong"> / </span>
            Cover
          </p>
          <ProjectCover
            project={project}
            priority
            sizes="(min-width: 1280px) 88rem, 100vw"
          />
        </div>
      </header>

      {blocks.length > 0 ? (
        <div className="container-main divide-y divide-border">
          {blocks.map((block) => (
            <section
              key={block.id}
              aria-labelledby={block.id}
              className="grid gap-6 py-12 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-12 lg:py-16"
            >
              <h2 id={block.id} className="section-kicker after:hidden mb-0">
                <span>
                  {block.index}
                  <span className="text-muted"> / </span>
                  {block.title}
                </span>
              </h2>
              <div className="min-w-0">{block.content}</div>
            </section>
          ))}
        </div>
      ) : null}

      <nav
        aria-label="Adjacent projects"
        className="container-main mt-4 grid gap-6 border-t border-border py-10 sm:grid-cols-2"
      >
        {previous ? (
          <TextLink href={getProjectHref(previous)} variant="plain" className="title-link min-w-0">
            <span className="meta block">Previous</span>
            <span className="mt-2 block text-[1.05rem] tracking-[-0.02em] text-foreground">
              {previous.title}
            </span>
          </TextLink>
        ) : (
          <span />
        )}
        {next ? (
          <TextLink
            href={getProjectHref(next)}
            variant="plain"
            className="title-link min-w-0 sm:text-right"
          >
            <span className="meta block">Next</span>
            <span className="mt-2 block text-[1.05rem] tracking-[-0.02em] text-foreground">
              {next.title}
            </span>
          </TextLink>
        ) : null}
      </nav>
    </article>
  );
}

function getCaseBlocks(project: Project): CaseBlock[] {
  const blocks: CaseBlock[] = [];
  let n = 1;

  const push = (id: string, title: string, content: React.ReactNode | null) => {
    if (!content) return;
    blocks.push({
      id,
      index: String(n).padStart(2, "0"),
      title,
      content,
    });
    n += 1;
  };

  push(
    "problem",
    "Problem",
    hasContent(project.problem) ? (
      <div className="prose-block">
        <p>{project.problem}</p>
      </div>
    ) : null,
  );

  push(
    "solution",
    "Solution",
    hasContent(project.solution) ? (
      <div className="prose-block">
        <p>{project.solution}</p>
      </div>
    ) : null,
  );

  push(
    "architecture",
    "Architecture",
    hasContent(project.architecture) ? (
      <div className="prose-block">
        <p>{project.architecture}</p>
      </div>
    ) : null,
  );

  push("decisions", "Technical decisions", listBlock(project.technicalDecisions));

  push("challenges", "Challenges", listBlock(project.challenges));

  push(
    "technologies",
    "Technologies",
    project.technologies && project.technologies.length > 0 ? (
      <p className="max-w-[40rem] text-[1.02rem] leading-8 text-secondary">
        {project.technologies.join("  ·  ")}
      </p>
    ) : null,
  );

  push(
    "figures",
    "Figures",
    project.images && project.images.length > 0 ? (
      <ProjectGallery project={project} />
    ) : null,
  );

  push("learnings", "Lessons", listBlock(project.learnings));

  return blocks;
}

function listBlock(items: string[] | undefined) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="max-w-[40rem] list-disc space-y-3 pl-5 text-[1.02rem] leading-7 text-secondary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
