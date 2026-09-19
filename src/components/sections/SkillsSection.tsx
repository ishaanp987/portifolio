import { AppWindow, Code2, Cpu, Server, Wrench, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSkillCategories } from "@/lib/skills";

const METHOD_ICONS: Record<string, LucideIcon> = {
  languages: Code2,
  frontend: AppWindow,
  backend: Server,
  engineering: Cpu,
  tools: Wrench,
};

export function SkillsSection() {
  const categories = getSkillCategories();
  if (categories.length === 0) return null;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-anchor methods-section"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading label="Methods" />
        </Reveal>
        <Reveal delay={50}>
          <h2 id="skills-heading" className="methods-title">
            Languages, tools, and systems.
          </h2>
        </Reveal>
        <ul className="methods-grid">
          {categories.map((category, categoryIndex) => {
            const Icon = METHOD_ICONS[category.id];
            return (
              <Reveal
                key={category.id}
                as="li"
                delay={Math.min(70 + categoryIndex * 50, 280)}
                className="method-group"
              >
                <div className="method-head">
                  {Icon ? (
                    <Icon
                      className="method-icon"
                      size={18}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  ) : null}
                  <h3 className="method-label">{category.label}</h3>
                </div>
                <ul className="method-list">
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
