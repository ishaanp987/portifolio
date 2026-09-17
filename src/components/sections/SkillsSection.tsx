import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatIndex } from "@/lib/format";
import { getSectionIndex } from "@/lib/sections";
import { getSkillCategories } from "@/lib/skills";

export function SkillsSection() {
  const categories = getSkillCategories();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-anchor border-t border-border bg-background-secondary"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("skills")} label="Capabilities" />
        <h2 id="skills-heading" className="sr-only">
          Capabilities
        </h2>

        {categories.length === 0 ? (
          <p className="text-secondary">
            No skills listed yet. Edit{" "}
            <code className="font-mono text-[0.85em] text-muted">src/data/skills.ts</code>
            .
          </p>
        ) : (
          <div className="skill-board">
            {categories.map((category, index) => (
              <article key={category.id} className="skill-group">
                <p className="meta m-0">
                  <span className="text-accent">{formatIndex(index)}</span>
                  <span className="text-muted"> / </span>
                  {category.label}
                </p>
                <ul className="skill-list">
                  {category.items.map((item) => (
                    <li key={item}>
                      <span className="skill-mark" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
