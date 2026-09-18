import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import {
  getAboutParagraphs,
  getAboutVisual,
  getPersonalNote,
  getProfileFacts,
} from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function AboutSection() {
  const paragraphs = getAboutParagraphs();
  const facts = getProfileFacts();
  const note = getPersonalNote();
  const visual = getAboutVisual();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor border-t border-border bg-background-secondary"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={getSectionIndex("about")} label="About" />
        </Reveal>
        <div className="about-layout">
          <Reveal delay={70} className="min-w-0">
            <h2
              id="about-heading"
              className="max-w-[14ch] text-[length:var(--text-page)]"
            >
              A short note on {site.firstName}.
            </h2>
            {paragraphs.length > 0 ? (
              <div className="prose-block mt-8">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </Reveal>
          <Reveal delay={140} className="min-w-0">
            <aside className="about-card">
              {visual ? (
                <div className="media-frame media-portrait relative min-h-[14rem] overflow-hidden border-0">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <p className="about-mono" aria-hidden="true">
                  {site.initials}
                </p>
              )}
              <div className="min-w-0">
                {facts.length > 0 ? (
                  <dl className="grid gap-3">
                    {facts.map((fact) => (
                      <div key={fact.label} className="meta-pair">
                        <dt className="meta-key">{fact.label}</dt>
                        <dd className="meta-val">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {note ? <p className="about-note mt-6">{note}</p> : null}
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
