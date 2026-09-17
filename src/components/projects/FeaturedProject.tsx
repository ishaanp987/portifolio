import { ProjectCover } from "@/components/projects/ProjectCover";
import { TextLink } from "@/components/ui/TextLink";
import { isUsableHref } from "@/lib/content";
import { formatStatus } from "@/lib/format";
import { hasContent } from "@/lib/links";
import { formatProjectIndex, getProjectHref } from "@/lib/projects";
import type { Project } from "@/types";

type FeaturedProjectProps = {
  project: Project;
  index: number;
};

type Layout = "media-end" | "media-start" | "media-top";

function layoutFor(index: number): Layout {
  if (index % 3 === 2) return "media-top";
  if (index % 2 === 1) return "media-start";
  return "media-end";
}

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const displayIndex = formatProjectIndex(index);
  const href = getProjectHref(project);
  const layout = layoutFor(index);
  const lead = index === 0;

  return (
    <article className="border-t border-border py-12 md:py-16 lg:py-20">
      <div className={`project-band is-${layout}`}>
        <div className="p-head">
          <p className="meta m-0">
            <span className="text-accent">P/{displayIndex}</span>
            {project.code ? (
              <>
                <span className="text-border-strong"> / </span>
                <span className="text-signal">{project.code}</span>
              </>
            ) : null}
            {project.year ? (
              <>
                <span className="text-border-strong"> / </span>
                {project.year}
              </>
            ) : null}
            {project.status ? (
              <>
                <span className="text-border-strong"> / </span>
                {formatStatus(project.status)}
              </>
            ) : null}
          </p>
          <h3 className="mt-4 max-w-none text-[length:var(--text-project)] font-medium tracking-[-0.045em] text-foreground sm:max-w-[18ch]">
            <TextLink href={href} variant="plain" className="title-link">
              {project.title}
            </TextLink>
          </h3>
          <hr className="accent-rule mt-5 mb-0" />
        </div>
        <div className="p-fig">
          <ProjectCover
            project={project}
            priority={lead}
            size={lead || layout === "media-top" ? "lead" : "default"}
          />
        </div>
        <div className="p-copy grid gap-5">
          <p className="max-w-[36rem] text-[0.98rem] leading-7 text-secondary">
            {project.description}
          </p>
          {hasContent(project.problem) ? (
            <div>
              <p className="meta m-0 text-signal">Problem</p>
              <p className="mt-2 max-w-[36rem] text-[0.95rem] leading-7 text-secondary">
                {project.problem}
              </p>
            </div>
          ) : null}
          {hasContent(project.role) ? (
            <div>
              <p className="meta m-0 text-signal">Contribution</p>
              <p className="mt-2 max-w-[36rem] text-[0.95rem] leading-7 text-secondary">
                {project.role}
              </p>
            </div>
          ) : null}
        </div>
        <dl className="p-spec grid max-w-[36rem] gap-3">
          {project.category ? (
            <div className="meta-pair">
              <dt className="meta-key">Type</dt>
              <dd className="meta-val">{project.category}</dd>
            </div>
          ) : null}
          {project.technologies && project.technologies.length > 0 ? (
            <div className="meta-pair">
              <dt className="meta-key">Stack</dt>
              <dd className="meta-val">{project.technologies.join(" / ")}</dd>
            </div>
          ) : null}
        </dl>
        <div className="p-action flex flex-wrap items-center gap-x-5">
          <TextLink
            href={href}
            variant="action"
            ariaLabel={`View case study: ${project.title}`}
          >
            Case study
          </TextLink>
          {isUsableHref(project.github) ? (
            <TextLink
              href={project.github}
              variant="ghost"
              ariaLabel={`${project.title} source on GitHub`}
            >
              Source
            </TextLink>
          ) : null}
          {isUsableHref(project.demo) ? (
            <TextLink
              href={project.demo}
              variant="ghost"
              ariaLabel={`${project.title} live demo`}
            >
              Demo
            </TextLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
