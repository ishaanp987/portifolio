import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="skill-panel">
                <p className="meta m-0 text-accent">{category.label}</p>
                <ul className="mt-4 m-0 list-none p-0">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-t border-border py-2.5 text-[0.95rem] text-secondary first:border-t-0"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
