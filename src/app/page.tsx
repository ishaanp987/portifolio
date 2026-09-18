import { AboutSection } from "@/components/sections/AboutSection";
import { BuildingSection } from "@/components/sections/BuildingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FactsSection } from "@/components/sections/FactsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { getEnabledSections } from "@/lib/sections";
import type { HomepageSectionId } from "@/types";

const sectionComponents: Record<HomepageSectionId, () => React.JSX.Element | null> = {
  hero: HeroSection,
  projects: ProjectsSection,
  building: BuildingSection,
  facts: FactsSection,
  experience: ExperienceSection,
  skills: SkillsSection,
  about: AboutSection,
  contact: ContactSection,
};

export default function Home() {
  const sections = getEnabledSections();

  return (
    <>
      {sections.map((section) => {
        const Section = sectionComponents[section.id];
        return <Section key={section.id} />;
      })}
    </>
  );
}
