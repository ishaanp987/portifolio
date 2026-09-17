import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { getAboutParagraphs, isRealValue } from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function AboutSection() {
  const paragraphs = getAboutParagraphs();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="paper-band section-anchor"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("about")} label="About" />
        <div className="about-layout">
          <div className="min-w-0">
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
          </div>
          <aside className="min-w-0">
            <p className="about-mark" aria-hidden="true">
              <span>{site.firstName}</span>
              <span>{site.lastName}</span>
            </p>
            <dl className="mt-8 grid gap-3">
              {isRealValue(site.role) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Role</dt>
                  <dd className="meta-val">{site.role}</dd>
                </div>
              ) : null}
              {isRealValue(site.focus) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Focus</dt>
                  <dd className="meta-val">{site.focus}</dd>
                </div>
              ) : null}
              {site.disciplines.length > 0 ? (
                <div className="meta-pair">
                  <dt className="meta-key">Field</dt>
                  <dd className="meta-val">{site.disciplines.join(" / ")}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  );
}
