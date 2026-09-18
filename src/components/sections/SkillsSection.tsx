import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatIndex } from "@/lib/format";
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
        <Reveal delay={60}>
          <h2
            id="skills-heading"
            className="max-w-[18ch] text-[1.35rem] font-medium sm:text-[1.5rem]"
          >
            Methods and tools.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <ul className="skill-matrix mt-8">
            {categories.map((category, index) => (
              <li key={category.id} className="skill-row">
                <p className="skill-label">
                  <span className="kicker-index">{formatIndex(index)}</span>
                  <span className="text-muted"> · </span>
                  {category.label}
                </p>
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
