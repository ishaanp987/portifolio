import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { MediaSlot } from "@/components/media/MediaSlot";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { getHeroFacts, getHeroSecondaryAction, isRealValue } from "@/lib/content";
import { highlightPhrase } from "@/lib/highlight";
import { hasContent } from "@/lib/links";
import { isSectionEnabled } from "@/lib/sections";

export function HeroSection() {
  const projectsHref = isSectionEnabled("projects") ? "/#projects" : "/projects";
  const secondary = getHeroSecondaryAction();
  const facts = getHeroFacts();
  const visual = hasContent(site.heroImage)
    ? { src: site.heroImage, alt: site.heroImageAlt || `${site.name}` }
    : hasContent(site.avatar)
      ? { src: site.avatar, alt: site.name }
      : null;

  return (
    <section id="index" aria-labelledby="site-name" className="section-anchor">
      <Container width="wide" className="hero-shell">
        <div className="hero-stage">
          <div className="hero-copy">
            {isRealValue(site.role) ? <p className="hero-kicker">{site.role}</p> : null}
            <h1 id="site-name" className="hero-name">
              {site.name}
            </h1>
            <p className="hero-statement">
              {site.statement.map((line) => (
                <span key={line} className="block">
                  {highlightPhrase(line, site.highlight)}
                </span>
              ))}
            </p>
            {isRealValue(site.headline) ? (
              <p className="mt-6 max-w-[34rem] text-[length:var(--text-lead)] leading-7 text-secondary">
                {site.headline}
              </p>
            ) : null}
            {site.focusAreas.length > 0 ? (
              <p className="meta mt-5 max-w-[40rem] text-muted">
                {site.focusAreas.join("  /  ")}
              </p>
            ) : null}
            <div className="hero-actions">
              <TextLink href={projectsHref} variant="primary">
                View projects
              </TextLink>
              {secondary ? (
                <TextLink href={secondary.href} variant="secondary">
                  {secondary.label}
                </TextLink>
              ) : null}
            </div>
            {facts.length > 0 ? (
              <dl className="hero-facts">
                {facts.map((fact) => (
                  <div key={fact.label} className="min-w-0">
                    <dt className="meta m-0 text-signal">{fact.label}</dt>
                    <dd className="m-0 mt-1 text-sm text-secondary">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
          <div className="hero-media">
            {visual ? (
              <div className="media-frame media-portrait group/cover h-full">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="media-zoom object-cover"
                />
              </div>
            ) : (
              <MediaSlot
                title="Hero still needed"
                hint="Supply a portrait, prototype photograph, CAD render, or interface screenshot. Do not leave this slot as the first impression."
                path="Set site.heroImage in src/config/site.ts"
                code="FIG. 00"
                aspect="portrait"
                lead
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
