import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { TextLink } from "@/components/ui/TextLink";
import { isRealValue, isUsableHref, publicItems } from "@/lib/content";
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
  const summary = isRealValue(project.longDescription)
    ? project.longDescription
    : isRealValue(project.description)
      ? project.description
      : undefined;

  return (
    <article className="pb-[var(--space-section)]">
      <header className="border-b border-border">
        <div className="container-wide grid gap-10 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.7fr)] lg:items-end lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <p className="section-kicker mb-8">
              <span>
                <span className="kicker-index">{sequenceLabel}</span>
                <span className="text-muted"> · </span>
                Case study
              </span>
              <span className="section-kicker-rule" aria-hidden="true" />
            </p>
            <h1 className="max-w-[16ch] text-[length:var(--text-display)] text-foreground">
              {project.title}
            </h1>
            <hr className="accent-rule mt-6 mb-6" />
            {summary ? (
              <p className="mt-5 max-w-[38rem] text-[length:var(--text-lead)] leading-8 text-secondary">
                {summary}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {isUsableHref(project.github) ? (
                <TextLink
                  href={project.github}
                  variant="action"
                  ariaLabel={`${project.title} source on GitHub`}
                >
                  Source
                </TextLink>
              ) : null}
              {isUsableHref(project.demo) ? (
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
          <aside className="min-w-0 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <ProjectMeta project={project} />
          </aside>
        </div>
        <div className="container-wide pb-12">
          <ProjectCover
            project={project}
            priority
            size="lead"
            sizes="(min-width: 1280px) 90rem, 100vw"
          />
        </div>
      </header>

      {blocks.length > 0 ? (
        <div className="container-wide divide-y divide-border">
          {blocks.map((block) => (
            <section
              key={block.id}
              aria-labelledby={block.id}
              className="grid gap-6 py-12 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-12 lg:py-16"
            >
              <h2 id={block.id} className="section-kicker mb-0">
                <span>
                  <span className="kicker-index">{block.index}</span>
                  <span className="text-muted"> · </span>
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
        className="container-wide mt-4 grid gap-8 border-t border-border py-12 sm:grid-cols-2"
      >
        {previous ? (
          <TextLink
            href={getProjectHref(previous)}
            variant="plain"
            className="title-link min-w-0"
          >
            <span className="meta block text-accent">Previous</span>
            <span className="mt-3 block max-w-[16ch] text-[length:var(--text-page)] font-medium leading-[0.98] text-foreground">
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
            <span className="meta block text-accent">Next</span>
            <span className="mt-3 ml-auto block max-w-[16ch] text-[length:var(--text-page)] font-medium leading-[0.98] text-foreground">
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
    isRealValue(project.problem) ? (
      <div className="prose-block">
        <p>{project.problem}</p>
      </div>
    ) : null,
  );

  push(
    "solution",
    "Solution",
    isRealValue(project.solution) ? (
      <div className="prose-block">
        <p>{project.solution}</p>
      </div>
    ) : null,
  );

  push(
    "architecture",
    "Architecture",
    isRealValue(project.architecture) ? (
      <div className="prose-block">
        <p>{project.architecture}</p>
      </div>
    ) : null,
  );

  push(
    "decisions",
    "Technical decisions",
    listBlock(publicItems(project.technicalDecisions)),
  );

  push("challenges", "Challenges", listBlock(publicItems(project.challenges)));

  if (isRealValue(project.role)) {
    push(
      "contribution",
      "Contribution",
      <div className="prose-block">
        <p>{project.role}</p>
      </div>,
    );
  }

  const technologies = publicItems(project.technologies);
  push(
    "technologies",
    "Technologies",
    technologies.length > 0 ? (
      <p className="max-w-[40rem] font-mono text-[0.8125rem] leading-7 text-secondary">
        {technologies.join("  /  ")}
      </p>
    ) : null,
  );

  const figures =
    project.images?.filter((image) => image.src && isRealValue(image.alt)) ?? [];
  push(
    "figures",
    "Figures",
    figures.length > 0 ? <ProjectGallery project={project} /> : null,
  );

  push("learnings", "Lessons", listBlock(publicItems(project.learnings)));

  return blocks;
}

function listBlock(items: string[]) {
  if (items.length === 0) return null;
  return (
    <ul className="max-w-[40rem] list-disc space-y-3 pl-5 text-[1.02rem] leading-7 text-secondary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
