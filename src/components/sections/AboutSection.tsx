import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import {
  getAboutFacts,
  getAboutParagraphs,
  getAboutVisual,
  getInterestList,
} from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function AboutSection() {
  const paragraphs = getAboutParagraphs();
  if (paragraphs.length === 0) return null;

  const facts = getAboutFacts().filter((fact) => fact.label !== "Interests");
  const interests = getInterestList();
  const visual = getAboutVisual();
  const hasSpec = Boolean(visual) || facts.length > 0 || interests.length > 0;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor about-section"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={getSectionIndex("about")} label="About" />
        </Reveal>
        <div className="about-layout">
          <Reveal delay={60} className="about-copy">
            <h2 id="about-heading" className="about-title">
              A short note on {site.firstName}.
            </h2>
            <div className="prose-block">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          {hasSpec ? (
            <Reveal delay={120} className="about-spec">
              {visual ? (
                <div className="media-frame media-portrait relative min-h-[14rem] overflow-hidden">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <dl className="about-dl">
                {facts.map((fact) => (
                  <div key={fact.label} className="about-pair">
                    <dt className="meta-key">{fact.label}</dt>
                    <dd className="meta-val">{fact.value}</dd>
                  </div>
                ))}
                {interests.length > 0 ? (
                  <div className="about-pair">
                    <dt className="meta-key">Interests</dt>
                    <dd className="meta-val">
                      <ul className="about-interests">
                        {interests.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
