import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { hasContent } from "@/lib/links";
import { getSectionIndex } from "@/lib/sections";

export function AboutSection() {
  const paragraphs = site.about.length > 0 ? site.about : [site.bio];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("about")} label="About" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div>
            <h2
              id="about-heading"
              className="max-w-[10ch] text-[length:var(--text-page)] tracking-[-0.04em]"
            >
              Builder, engineer, and software developer.
            </h2>
            <div className="about-visual mt-8 hidden md:grid">
              <span>{site.initials}</span>
            </div>
          </div>
          <div className="about-panel prose-block">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="mt-8 grid gap-3">
              {hasContent(site.role) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Role</dt>
                  <dd className="meta-val">{site.role}</dd>
                </div>
              ) : null}
              {hasContent(site.location) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Loc</dt>
                  <dd className="meta-val">{site.location}</dd>
                </div>
              ) : null}
              {hasContent(site.focus) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Focus</dt>
                  <dd className="meta-val">{site.focus}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
