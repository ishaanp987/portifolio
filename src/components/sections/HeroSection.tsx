import { Container } from "@/components/layout/Container";
import { SystemsDiagram } from "@/components/sections/SystemsDiagram";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { hasContent } from "@/lib/links";
import { getSectionIndex, isSectionEnabled } from "@/lib/sections";

export function HeroSection() {
  const projectsEnabled = isSectionEnabled("projects");
  const secondaryHref = hasContent(site.github)
    ? site.github
    : hasContent(site.email)
      ? `mailto:${site.email}`
      : "/#contact";
  const secondaryLabel = hasContent(site.github)
    ? "GitHub"
    : hasContent(site.email)
      ? "Email"
      : "Contact";

  return (
    <section
      id="index"
      aria-labelledby="site-name"
      className="section-anchor border-b border-border"
    >
      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end lg:gap-16 lg:py-20">
        <div className="min-w-0">
          <p className="section-kicker mb-8 max-w-[12rem] after:hidden">
            <span>
              {getSectionIndex("hero")}
              <span className="text-muted"> / </span>
              Index
            </span>
          </p>
          <h1
            id="site-name"
            className="max-w-[12ch] text-[length:var(--text-hero)] font-medium tracking-[-0.045em] text-foreground"
          >
            {site.name}
          </h1>
          <p className="mt-6 max-w-[28rem] text-[1.05rem] leading-8 text-secondary md:text-[1.12rem]">
            {site.headline}
          </p>
          <p className="mt-4 max-w-[32rem] text-[0.95rem] leading-7 text-muted">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6">
            {projectsEnabled ? (
              <TextLink href="/#projects" variant="action">
                View projects
              </TextLink>
            ) : (
              <TextLink href="/projects" variant="action">
                View projects
              </TextLink>
            )}
            <TextLink href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </TextLink>
          </div>
        </div>

        <div className="grid gap-6 lg:justify-items-end">
          <dl className="title-block w-full max-w-[24rem]">
            <dt>Name</dt>
            <dd>{site.name}</dd>
            <dt>Focus</dt>
            <dd>{site.focus}</dd>
            {hasContent(site.availability) ? (
              <>
                <dt>Status</dt>
                <dd>{site.availability}</dd>
              </>
            ) : null}
            {hasContent(site.location) ? (
              <>
                <dt>Loc</dt>
                <dd>{site.location}</dd>
              </>
            ) : null}
          </dl>
          <SystemsDiagram />
        </div>
      </Container>
    </section>
  );
}
