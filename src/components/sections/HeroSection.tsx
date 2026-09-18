import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import {
  getHeroFacts,
  getHeroSecondaryAction,
  getHeroVisual,
  isRealValue,
} from "@/lib/content";
import { highlightPhrase } from "@/lib/highlight";
import {
  getHeroPrimaryAction,
  getNextSectionAfter,
  getSectionHref,
  getSectionLabel,
} from "@/lib/sections";

export function HeroSection() {
  const primary = getHeroPrimaryAction();
  const secondary = getHeroSecondaryAction();
  const facts = getHeroFacts();
  const visual = getHeroVisual();
  const next = getNextSectionAfter("hero");

  return (
    <section id="index" aria-labelledby="site-name" className="section-anchor">
      <Container width="wide" className="hero-shell">
        <div className={visual ? "hero-stage has-media" : "hero-stage"}>
          <div className="hero-copy">
            {isRealValue(site.greeting) ? (
              <p className="hero-kicker">{site.greeting}</p>
            ) : isRealValue(site.role) ? (
              <p className="hero-kicker">{site.role}</p>
            ) : null}
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
              <p className="hero-support">{site.headline}</p>
            ) : null}
            {facts.length > 0 ? (
              <dl className="hero-facts">
                {facts.map((fact) => (
                  <div key={fact.label} className="min-w-0">
                    <dt className="meta m-0">{fact.label}</dt>
                    <dd className="m-0 mt-1 text-secondary">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {primary || secondary ? (
              <div className="hero-actions">
                {primary ? (
                  <TextLink href={primary.href} variant="primary">
                    {primary.label}
                  </TextLink>
                ) : null}
                {secondary ? (
                  <TextLink href={secondary.href} variant="secondary">
                    {secondary.label}
                  </TextLink>
                ) : null}
              </div>
            ) : null}
          </div>
          {visual ? (
            <div className="hero-media">
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
            </div>
          ) : null}
          {next ? (
            <p className="hero-next">
              <TextLink
                href={getSectionHref(next.id)}
                variant="plain"
                className="hero-next-link"
              >
                <span className="kicker-index" aria-hidden="true">
                  ↓
                </span>
                {getSectionLabel(next.id)}
              </TextLink>
              <span className="section-kicker-rule" aria-hidden="true" />
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
