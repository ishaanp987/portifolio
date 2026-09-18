import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProfileFacts } from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function FactsSection() {
  const facts = getProfileFacts();
  if (facts.length === 0) return null;

  return (
    <section
      id="facts"
      aria-labelledby="facts-heading"
      className="section-anchor border-t border-border bg-background-secondary"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={getSectionIndex("facts")} label="Notes" />
        </Reveal>
        <Reveal delay={80}>
          <h2 id="facts-heading" className="max-w-[16ch] text-[length:var(--text-page)]">
            A few facts.
          </h2>
          <dl className="facts-grid mt-10">
            {facts.map((fact) => (
              <div key={fact.label} className="fact-cell">
                <dt className="fact-label">{fact.label}</dt>
                <dd className="fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
