import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCurrentlyBuilding } from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function BuildingSection() {
  const text = getCurrentlyBuilding();
  if (!text) return null;

  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={getSectionIndex("building")} label="Now" />
        </Reveal>
        <Reveal delay={80}>
          <h2
            id="building-heading"
            className="max-w-[16ch] text-[length:var(--text-page)]"
          >
            Currently building.
          </h2>
          <p className="empty-copy mt-6 max-w-[36rem]">{text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
