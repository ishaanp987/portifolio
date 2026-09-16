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
      <Container className="section-space grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(18rem,1.2fr)] lg:gap-20">
        <div>
          <SectionHeading index={getSectionIndex("about")} label="About" />
          <h2
            id="about-heading"
            className="max-w-[12ch] text-[length:var(--text-page)] font-medium tracking-[-0.038em]"
          >
            Notes
          </h2>
        </div>
        <div className="prose-block pt-2 lg:pt-16">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
