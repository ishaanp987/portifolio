import { Container } from "@/components/layout/Container";
import { DevNote } from "@/components/ui/DevNote";
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
        <h2 id="skills-heading" className="max-w-[16ch] text-[length:var(--text-page)]">
          Methods and tools.
        </h2>
        <p className="empty-copy mt-5">
          A working list, not a claim of mastery. The projects should do the convincing.
        </p>

        {categories.length === 0 ? (
          process.env.NODE_ENV === "development" ? (
            <DevNote>
              Skill categories are hidden until <code>src/data/skills.ts</code> has real
              items.
            </DevNote>
          ) : null
        ) : (
          <ul className="skill-matrix mt-10">
            {categories.map((category) => (
              <li key={category.id} className="skill-row">
                <p className="skill-label">{category.label}</p>
                <div className="skill-items">
                  {category.items.map((item) => (
                    <span key={item} className="skill-item">
                      {item}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
