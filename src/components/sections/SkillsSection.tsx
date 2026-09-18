import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSectionIndex } from "@/lib/sections";
import { getSkillCategories } from "@/lib/skills";

export function SkillsSection() {
  const categories = getSkillCategories();
  if (categories.length === 0) return null;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={getSectionIndex("skills")} label="Methods" />
        </Reveal>
        <Reveal delay={70}>
          <h2 id="skills-heading" className="max-w-[16ch] text-[length:var(--text-page)]">
            Methods and tools.
          </h2>
          <p className="empty-copy mt-5">
            A working list, not a claim of mastery. The projects should do the convincing.
          </p>
        </Reveal>
        <Reveal delay={120}>
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
        </Reveal>
      </Container>
    </section>
  );
}
