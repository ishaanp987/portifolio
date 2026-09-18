import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { isRealValue, isUsableHref, publicItems } from "@/lib/content";
import {
  experienceYear,
  formatExperienceDates,
  getVisibleExperience,
} from "@/lib/experience";
import { getSectionIndex } from "@/lib/sections";

export function ExperienceSection() {
  const items = getVisibleExperience();
  if (items.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <Reveal>
          <SectionHeading index={getSectionIndex("experience")} label="Experience" />
        </Reveal>
        <Reveal delay={70}>
          <h2
            id="experience-heading"
            className="max-w-[14ch] text-[length:var(--text-page)]"
          >
            Roles and labs.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ol className="timeline mt-10">
            {items.map((item) => {
              const highlights = publicItems(item.highlights);
              const technologies = publicItems(item.technologies);
              const description = isRealValue(item.description)
                ? item.description
                : undefined;
              const location = isRealValue(item.location) ? item.location : undefined;

              return (
                <li key={item.id} className="experience-item">
                  <p className="experience-year">{experienceYear(item)}</p>
                  <div className="min-w-0">
                    <h3 className="text-[1.35rem] font-medium text-foreground md:text-[1.6rem]">
                      {isUsableHref(item.link) ? (
                        <TextLink href={item.link} variant="plain" className="title-link">
                          {item.organization}
                        </TextLink>
                      ) : (
                        item.organization
                      )}
                    </h3>
                    <p className="mt-1 text-secondary">
                      {item.role}
                      <span className="text-muted"> · </span>
                      <span className="text-muted">{formatExperienceDates(item)}</span>
                      {location ? (
                        <>
                          <span className="text-muted"> · </span>
                          <span className="text-muted">{location}</span>
                        </>
                      ) : null}
                    </p>
                    {description ? (
                      <p className="mt-3 max-w-[40rem] text-[length:var(--text-body)] leading-[var(--leading-body)] text-secondary">
                        {description}
                      </p>
                    ) : null}
                    {highlights.length > 0 ? (
                      <ul className="mt-4 max-w-[40rem] list-disc space-y-2 pl-5 text-[length:var(--text-body)] leading-[var(--leading-body)] text-secondary">
                        {highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                    {technologies.length > 0 ? (
                      <p className="meta mt-5">{technologies.join("  /  ")}</p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
