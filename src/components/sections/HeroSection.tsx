import { Container } from "@/components/layout/Container";
import { HeroMedia } from "@/components/media/HeroMedia";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { isRealValue } from "@/lib/content";
import { highlightPhrase } from "@/lib/highlight";
import {
  getHeroPrimaryAction,
  getNextSectionAfter,
  getSectionHref,
  getSectionLabel,
} from "@/lib/sections";

export function HeroSection() {
  const primary = getHeroPrimaryAction();
  const next = getNextSectionAfter("hero");
  const secondary =
    next && (!primary || getSectionHref(next.id) !== primary.href)
      ? { href: getSectionHref(next.id), label: getSectionLabel(next.id) }
      : null;

  return (
    <section id="top" aria-labelledby="site-name" className="hero-section section-anchor">
      <Container width="wide">
        <div className="hero-layout">
          <div className="hero-copy">
            {isRealValue(site.greeting) ? (
              <p className="hero-greeting">{site.greeting}</p>
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

            {primary || secondary ? (
              <div className="hero-actions">
                {primary ? (
                  <TextLink href={primary.href} variant="primary">
                    {primary.label}
                  </TextLink>
                ) : null}
                {secondary ? (
                  <TextLink href={secondary.href} variant="action">
                    {secondary.label}
                  </TextLink>
                ) : null}
              </div>
            ) : null}
          </div>

          <HeroMedia />
        </div>
      </Container>
    </section>
  );
}
