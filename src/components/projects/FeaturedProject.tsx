import { ProjectCover } from "@/components/projects/ProjectCover";
import { TextLink } from "@/components/ui/TextLink";
import { isRealValue, isUsableHref, publicItems } from "@/lib/content";
import { formatStatus } from "@/lib/format";
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
  const description = isRealValue(project.description) ? project.description : undefined;
  const problem = isRealValue(project.problem) ? project.problem : undefined;
  const contribution = isRealValue(project.role) ? project.role : undefined;
  const technologies = publicItems(project.technologies);
  const category = isRealValue(project.category) ? project.category : undefined;
  const year = isRealValue(project.year) ? project.year : undefined;
  const status = isRealValue(project.status) ? formatStatus(project.status) : undefined;

  return (
    <article className="border-t border-border py-12 md:py-16 lg:py-20">
      <div className={`project-band is-${layout}`}>
        <div className="p-head">
          <p className="meta m-0">
            <span className="text-accent">{displayIndex}</span>
            {year ? (
              <>
                <span className="text-border-strong"> · </span>
                {year}
              </>
            ) : null}
            {status ? (
              <>
                <span className="text-border-strong"> · </span>
                {status}
              </>
            ) : null}
          </p>
          <h3 className="mt-4 max-w-none text-[length:var(--text-project)] font-medium text-foreground sm:max-w-[18ch]">
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
          {description ? (
            <p className="max-w-[36rem] text-[0.98rem] leading-7 text-secondary">
              {description}
            </p>
          ) : null}
          {problem ? (
            <div>
              <p className="m-0 text-sm font-medium text-foreground">Problem</p>
              <p className="mt-2 max-w-[36rem] text-[0.95rem] leading-7 text-secondary">
                {problem}
              </p>
            </div>
          ) : null}
          {contribution ? (
            <div>
              <p className="m-0 text-sm font-medium text-foreground">Contribution</p>
              <p className="mt-2 max-w-[36rem] text-[0.95rem] leading-7 text-secondary">
                {contribution}
              </p>
            </div>
          ) : null}
        </div>
        {category || technologies.length > 0 ? (
          <dl className="p-spec grid max-w-[36rem] gap-3">
            {category ? (
              <div className="meta-pair">
                <dt className="meta-key">Type</dt>
                <dd className="meta-val">{category}</dd>
              </div>
            ) : null}
            {technologies.length > 0 ? (
              <div className="meta-pair">
                <dt className="meta-key">Stack</dt>
                <dd className="meta-val">{technologies.join(" / ")}</dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <div className="p-spec" />
        )}
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
