import { Container } from "@/components/layout/Container";
import { DevNote } from "@/components/ui/DevNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { isPlaceholderCopy, isRealValue, isUsableHref, publicItems } from "@/lib/content";
import {
  experienceYear,
  formatExperienceDates,
  getVisibleExperience,
} from "@/lib/experience";
import { getSectionIndex } from "@/lib/sections";

export function ExperienceSection() {
  const items = getVisibleExperience();
  const hasTemplate = items.some(
    (item) => isPlaceholderCopy(item.organization) || isPlaceholderCopy(item.role),
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("experience")} label="Experience" />
        <h2
          id="experience-heading"
          className="max-w-[14ch] text-[length:var(--text-page)]"
        >
          Roles and labs.
        </h2>

        {items.length === 0 ? (
          process.env.NODE_ENV === "development" ? (
            <DevNote>
              Experience is hidden in production until real roles exist in{" "}
              <code>src/data/experience.ts</code>.
            </DevNote>
          ) : null
        ) : (
          <>
            {process.env.NODE_ENV === "development" && hasTemplate ? (
              <DevNote>
                Template entries stay visible here in development and are omitted from
                production.
              </DevNote>
            ) : null}
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
                          <TextLink
                            href={item.link}
                            variant="plain"
                            className="title-link"
                          >
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
                        <p className="mt-3 max-w-[40rem] text-[0.97rem] leading-7 text-secondary">
                          {description}
                        </p>
                      ) : null}
                      {highlights.length > 0 ? (
                        <ul className="mt-4 max-w-[40rem] list-disc space-y-2 pl-5 text-[0.95rem] leading-7 text-secondary">
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
          </>
        )}
      </Container>
    </section>
  );
}
