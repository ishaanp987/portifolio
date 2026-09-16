import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { TextLink } from "@/components/ui/TextLink";
import { formatProjectIndex, getProjectHref } from "@/lib/projects";
import { hasContent } from "@/lib/links";
import type { Project } from "@/types";

type FeaturedProjectProps = {
  project: Project;
  index: number;
};

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const displayIndex = formatProjectIndex(index);
  const href = getProjectHref(project);
  const variant = index % 3 === 2 ? "stacked" : index % 2 === 0 ? "end" : "start";
  const imageFirst = variant === "start";

  return (
    <article className="@container border-t border-border py-10 md:py-14">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <p className="section-kicker mb-0 w-full max-w-none after:hidden sm:w-auto">
          <span>
            {displayIndex}
            <span className="text-muted"> / </span>
            Featured
            {project.code ? (
              <>
                <span className="text-muted"> / </span>
                {project.code}
              </>
            ) : null}
          </span>
        </p>
      </div>

      <h3 className="max-w-[24ch] text-[length:var(--text-project)] font-medium tracking-[-0.038em] text-foreground">
        <TextLink href={href} variant="plain" className="title-link">
          {project.title}
        </TextLink>
      </h3>

      {variant === "stacked" ? (
        <div className="mt-6 grid gap-6">
          <div>
            <p className="meta mb-2 text-muted">
              Fig. {displayIndex}
              <span className="text-border-strong"> / </span>
              Cover
            </p>
            <ProjectCover project={project} priority={index === 0} />
          </div>
          <div className="grid gap-8 @min-[720px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <ProjectBody project={project} href={href} />
            <ProjectMeta project={project} />
          </div>
        </div>
      ) : (
        <div
          className={[
            "mt-6 grid items-start gap-8",
            "@min-[760px]:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]",
            imageFirst ? "@min-[760px]:[&>div:first-child]:order-none" : "",
          ].join(" ")}
        >
          <div className={imageFirst ? "@min-[760px]:order-2" : ""}>
            <ProjectBody project={project} href={href} />
            <div className="mt-8">
              <ProjectMeta project={project} />
            </div>
          </div>
          <div className={imageFirst ? "@min-[760px]:order-1" : ""}>
            <p className="meta mb-2 text-muted">
              Fig. {displayIndex}
              <span className="text-border-strong"> / </span>
              Cover
            </p>
            <ProjectCover project={project} priority={index === 0} />
          </div>
        </div>
      )}
    </article>
  );
}

function ProjectBody({ project, href }: { project: Project; href: string }) {
  return (
    <div className="min-w-0">
      <p className="max-w-[38rem] text-[0.98rem] leading-7 text-secondary">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5">
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
}
