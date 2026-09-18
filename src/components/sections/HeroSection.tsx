import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { RegistrationMark } from "@/components/media/RegistrationMark";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { getHeroFacts, getHeroVisual, getInterestList, isRealValue } from "@/lib/content";
import { highlightPhrase } from "@/lib/highlight";
import {
  getHeroPrimaryAction,
  getNextSectionAfter,
  getSectionHref,
  getSectionIndex,
  getSectionLabel,
} from "@/lib/sections";

export function HeroSection() {
  const primary = getHeroPrimaryAction();
  const facts = getHeroFacts();
  const role = facts.find((fact) => fact.label === "Role");
  const interestItems = getInterestList();
  const extra = facts.filter(
    (fact) => fact.label !== "Role" && fact.label !== "Interests",
  );
  const visual = getHeroVisual();
  const next = getNextSectionAfter("hero");

  return (
    <section id="index" aria-labelledby="site-name" className="section-anchor">
      <Container width="wide" className="hero-shell">
        <div className={visual ? "hero-plate has-media" : "hero-plate"}>
          <div className="hero-meta">
            <p className="meta m-0">00.00 / Index</p>
            {isRealValue(site.greeting) ? (
              <p className="hero-kicker">{site.greeting}</p>
            ) : null}
            <span className="hero-meta-end">
              <RegistrationMark />
              <span className="meta">{site.initials}</span>
            </span>
          </div>

          <h1 id="site-name" className="hero-name">
            <span className="hero-first">{site.firstName}</span>
            <span className="hero-last">{site.lastName}</span>
          </h1>

          <hr className="hero-rule" />

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

          {role ? (
            <div className="hero-role">
              <p className="meta m-0">{role.label}</p>
              <p className="hero-fact-value">{role.value}</p>
            </div>
          ) : extra[0] ? (
            <div className="hero-role">
              <p className="meta m-0">{extra[0].label}</p>
              <p className="hero-fact-value">{extra[0].value}</p>
            </div>
          ) : null}

          {interestItems.length > 0 ? (
            <div className="hero-interests">
              <p className="meta m-0">Interests</p>
              <ul className="hero-interest-list">
                {interestItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : extra[1] ? (
            <div className="hero-interests">
              <p className="meta m-0">{extra[1].label}</p>
              <p className="hero-fact-value">{extra[1].value}</p>
            </div>
          ) : null}

          {primary || next ? (
            <div className="hero-actions">
              {primary ? (
                <TextLink href={primary.href} variant="primary">
                  {primary.label}
                </TextLink>
              ) : null}
              {next ? (
                <TextLink
                  href={getSectionHref(next.id)}
                  variant="ghost"
                  className="hero-next-link"
                >
                  {getSectionLabel(next.id)}
                </TextLink>
              ) : null}
            </div>
          ) : null}

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
              <span className="kicker-index" aria-hidden="true">
                ↓
              </span>
              <span className="meta">
                {getSectionIndex(next.id)}.00 / {getSectionLabel(next.id)}
              </span>
              <span className="section-kicker-rule" aria-hidden="true" />
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
