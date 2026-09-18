import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatIndex } from "@/lib/format";
import { getSectionIndex } from "@/lib/sections";
import { getSkillCategories } from "@/lib/skills";

export function SkillsSection() {
  const categories = getSkillCategories();
  if (categories.length === 0) return null;
  const index = getSectionIndex("skills");

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={index} label="Methods" />
        </Reveal>
        <div className="methods-head">
          <Reveal delay={50}>
            <h2 id="skills-heading" className="methods-title">
              Methods and tools.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="methods-count meta m-0">
              {String(categories.length).padStart(2, "0")} groups
            </p>
          </Reveal>
        </div>
        <ul className="skill-matrix">
          {categories.map((category, categoryIndex) => (
            <Reveal
              key={category.id}
              as="li"
              delay={Math.min(categoryIndex * 55, 280)}
              className="skill-row"
            >
              <span className="skill-index kicker-index">
                {index}.{formatIndex(categoryIndex)}
              </span>
              <p className="skill-label">{category.label}</p>
              <div className="skill-items">
                {category.items.map((item) => (
                  <span key={item} className="skill-item">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
