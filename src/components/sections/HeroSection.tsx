import { Container } from "@/components/layout/Container";
import { SystemsBoard } from "@/components/sections/SystemsBoard";
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
  const index = getSectionIndex("hero");

  return (
    <section
      id="index"
      aria-labelledby="site-name"
      className="section-anchor border-b border-border"
    >
      <Container width="wide" className="py-9 md:py-12 lg:py-16">
        <p className="section-kicker mb-8 md:mb-10">
          <span>
            <span className="text-accent">{index}</span>
            <span className="text-muted"> / </span>
            Portfolio
          </span>
          <span className="section-kicker-rule" aria-hidden="true" />
          <span className="text-muted">DWG {index}</span>
        </p>
        <div className="hero-stage">
          <h1 id="site-name" className="hero-name name-stack text-foreground">
            <span className="block">{site.firstName}</span>
            <span className="block">{site.lastName}</span>
          </h1>
          <div className="hero-board">
            <SystemsBoard />
          </div>
          <div className="hero-copy">
            <hr className="olive-rule mt-1 mb-6" />
            <ul className="discipline-stack m-0 list-none p-0">
              {site.disciplines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-8 max-w-[24ch] text-[length:var(--text-lead)] leading-7 text-secondary">
              {site.headline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6">
              <TextLink
                href={projectsEnabled ? "/#projects" : "/projects"}
                variant="action"
              >
                View projects
              </TextLink>
              <TextLink href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
