import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPlaceholderCopy } from "@/lib/content";
import { formatIndex } from "@/lib/format";
import { getSectionIndex } from "@/lib/sections";
import { getSkillCategories } from "@/lib/skills";

export function SkillsSection() {
  const categories = getSkillCategories();
  const hasTemplate = categories.some((category) =>
    category.items.some((item) => isPlaceholderCopy(item)),
  );

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-anchor border-t border-border bg-background-secondary"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("skills")} label="Capabilities" />
        <h2
          id="skills-heading"
          className="max-w-[16ch] text-[length:var(--text-page)] tracking-[-0.04em]"
        >
          Methods and tools.
        </h2>
        <p className="source-hint mt-5">
          This is a working list, not a claim of mastery. Projects above should do the
          convincing.
        </p>

        {categories.length === 0 ? (
          <p className="source-hint mt-8">
            No skills listed yet. Edit <code>src/data/skills.ts</code>.
          </p>
        ) : (
          <>
            {hasTemplate ? (
              <p className="source-hint mt-4">
                Italic items are still placeholders in <code>src/data/skills.ts</code>.
              </p>
            ) : null}
            <ul className="skill-matrix mt-10">
              {categories.map((category, index) => (
                <li key={category.id} className="skill-row">
                  <p className="skill-label">
                    <span className="meta mr-3 text-accent">{formatIndex(index)}</span>
                    {category.label}
                  </p>
                  <div className="skill-items">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={
                          isPlaceholderCopy(item)
                            ? "skill-item is-placeholder"
                            : "skill-item"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
}
