import { ProjectCover } from "@/components/projects/ProjectCover";
import { TextLink } from "@/components/ui/TextLink";
import { formatStatus } from "@/lib/format";
import { formatProjectIndex, getProjectHref } from "@/lib/projects";
import { hasContent } from "@/lib/links";
import type { Project } from "@/types";

type FeaturedProjectProps = {
  project: Project;
  index: number;
};

type Layout = "copy-first" | "visual-first" | "stack";

function layoutFor(index: number): Layout {
  if (index % 3 === 2) return "stack";
  if (index % 2 === 0) return "copy-first";
  return "visual-first";
}

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const displayIndex = formatProjectIndex(index);
  const href = getProjectHref(project);
  const layout = layoutFor(index);
  const lead = index === 0;

  const visual = (
    <div className="min-w-0">
      <p className="meta mb-2">
        Fig. {displayIndex}
        <span className="text-border-strong"> / </span>
        Cover
      </p>
      <ProjectCover project={project} priority={lead} size={lead ? "lead" : "default"} />
    </div>
  );

  const intro = (
    <div className="min-w-0">
      <p className="meta m-0 text-accent">
        Project / {displayIndex}
        {project.code ? (
          <>
            <span className="text-border-strong"> / </span>
            {project.code}
          </>
        ) : null}
      </p>
      <h3 className="mt-4 max-w-[12ch] text-[length:var(--text-project)] font-medium uppercase leading-[0.92] tracking-[-0.05em] text-foreground">
        <TextLink href={href} variant="plain" className="title-link">
          {project.title}
        </TextLink>
      </h3>
      <hr className="olive-rule mt-5 mb-6" />
      <p className="max-w-[34rem] text-[0.98rem] leading-7 text-secondary">
        {project.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-5">
        <TextLink
          href={href}
          variant="action"
          ariaLabel={`View case study: ${project.title}`}
        >
          View case study
        </TextLink>
        {hasContent(project.github) ? (
          <TextLink
            href={project.github}
            variant="ghost"
            ariaLabel={`${project.title} source on GitHub`}
          >
            GitHub
          </TextLink>
        ) : null}
        {hasContent(project.demo) ? (
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
  );

  const spec = (
    <dl className="grid max-w-[36rem] gap-3">
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
      {project.year ? (
        <div className="meta-pair">
          <dt className="meta-key">Year</dt>
          <dd className="meta-val">{project.year}</dd>
        </div>
      ) : null}
      {project.status ? (
        <div className="meta-pair">
          <dt className="meta-key">Status</dt>
          <dd className="meta-val">{formatStatus(project.status)}</dd>
        </div>
      ) : null}
    </dl>
  );

  const copy = (
    <div className="min-w-0 lg:sticky lg:top-24">
      {intro}
      <div className="mt-8">{spec}</div>
    </div>
  );

  const indexCol = (
    <div className="hidden lg:block">
      <span className="display-index sticky top-24">{displayIndex}</span>
    </div>
  );

  return (
    <article
      className={[
        lead
          ? "border-t border-accent pt-14 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20"
          : "border-t border-border py-12 md:py-16 lg:py-20",
      ].join(" ")}
    >
      <div className="mb-6 lg:mb-0 lg:hidden">
        <span className="display-index">{displayIndex}</span>
      </div>

      {layout === "stack" ? (
        <div className="grid gap-8 lg:grid-cols-[4.75rem_minmax(0,1fr)] lg:gap-12">
          {indexCol}
          <div className="grid gap-10">
            {visual}
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(14rem,0.85fr)] md:items-start md:gap-12">
              {intro}
              {spec}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={[
            "grid items-start gap-8 lg:gap-12",
            layout === "copy-first"
              ? "lg:grid-cols-[4.75rem_minmax(18rem,0.68fr)_minmax(0,1.55fr)]"
              : "lg:grid-cols-[4.75rem_minmax(0,1.55fr)_minmax(18rem,0.68fr)]",
          ].join(" ")}
        >
          {indexCol}
          {layout === "copy-first" ? (
            <>
              {copy}
              {visual}
            </>
          ) : (
            <>
              {visual}
              {copy}
            </>
          )}
        </div>
      )}
    </article>
  );
}
