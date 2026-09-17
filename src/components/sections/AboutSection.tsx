import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { isRealValue } from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function AboutSection() {
  const paragraphs = site.about.length > 0 ? site.about : [site.bio];

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
              className="max-w-[12ch] text-[length:var(--text-page)] tracking-[-0.045em]"
            >
              A short note on {site.firstName}.
            </h2>
            <div className="prose-block mt-8">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="source-hint mt-8">
              Replace the copy in <code>src/config/site.ts</code> (<code>about</code> /{" "}
              <code>bio</code>).
            </p>
          </div>
          <aside className="min-w-0">
            <p className="about-mark" aria-hidden="true">
              {site.initials}
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
