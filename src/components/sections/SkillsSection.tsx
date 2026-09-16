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
      <Container className="section-space">
        <SectionHeading index={getSectionIndex("skills")} label="Capabilities" />
        <h2
          id="skills-heading"
          className="mb-10 max-w-[18ch] text-[length:var(--text-page)] font-medium tracking-[-0.038em]"
        >
          Tools in use
        </h2>

        {categories.length === 0 ? (
          <p className="text-secondary">
            No skills listed yet. Edit{" "}
            <code className="font-mono text-[0.85em] text-muted">src/data/skills.ts</code>
            .
          </p>
        ) : (
          <dl className="border-t border-border">
            {categories.map((category) => (
              <div
                key={category.id}
                className="grid gap-2 border-b border-border py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8 md:py-6"
              >
                <dt className="meta pt-1 text-accent">{category.label}</dt>
                <dd className="m-0 text-[0.98rem] leading-7 text-secondary">
                  {category.items.join("  ·  ")}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
