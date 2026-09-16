import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { getSectionIndex } from "@/lib/sections";

export function AboutSection() {
  const paragraphs = site.about.length > 0 ? site.about : [site.bio];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor border-t border-border"
    >
      <Container
        width="wide"
        className="section-space grid gap-10 lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)] lg:gap-24"
      >
        <div>
          <SectionHeading index={getSectionIndex("about")} label="About" />
          <h2
            id="about-heading"
            className="max-w-[8ch] text-[length:var(--text-page)] uppercase"
          >
            Notes
          </h2>
        </div>
        <div className="about-rail prose-block lg:mt-16">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
