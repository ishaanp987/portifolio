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
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("skills")} label="Capabilities" />
        <h2 id="skills-heading" className="sr-only">
          Tools in use
        </h2>

        {categories.length === 0 ? (
          <p className="text-secondary">
            No skills listed yet. Edit{" "}
            <code className="font-mono text-[0.85em] text-muted">src/data/skills.ts</code>
            .
          </p>
        ) : (
          <dl>
            {categories.map((category) => (
              <div
                key={category.id}
                className="grid gap-2 border-t border-border py-5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:py-6"
              >
                <dt className="meta pt-1 text-accent">{category.label}</dt>
                <dd className="m-0 font-mono text-[0.78rem] uppercase tracking-[0.12em] leading-7 text-secondary">
                  {category.items.join("  /  ")}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
