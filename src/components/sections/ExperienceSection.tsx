import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import {
  experienceYear,
  formatExperienceDates,
  getVisibleExperience,
} from "@/lib/experience";
import { hasContent } from "@/lib/links";
import { getSectionIndex } from "@/lib/sections";

export function ExperienceSection() {
  const items = getVisibleExperience();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("experience")} label="Experience" />
        <h2 id="experience-heading" className="sr-only">
          Selected work
        </h2>

        {items.length === 0 ? (
          <p className="text-secondary">
            No experience listed yet. Add entries in{" "}
            <code className="font-mono text-[0.85em] text-muted">
              src/data/experience.ts
            </code>
            .
          </p>
        ) : (
          <ol className="m-0 list-none p-0">
            {items.map((item) => (
              <li
                key={item.id}
                className="grid gap-3 border-t border-border py-9 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[8.5rem_minmax(0,1fr)]"
              >
                <p className="m-0 pt-1 font-medium tracking-[-0.04em] text-accent md:text-[1.35rem]">
                  {experienceYear(item)}
                </p>
                <div className="min-w-0">
                  <h3 className="text-[1.45rem] font-medium tracking-[-0.04em] text-foreground md:text-[1.7rem]">
                    {hasContent(item.link) ? (
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
                    {hasContent(item.location) ? (
                      <>
                        <span className="text-muted"> · </span>
                        <span className="text-muted">{item.location}</span>
                      </>
                    ) : null}
                  </p>
                  {hasContent(item.description) ? (
                    <p className="mt-3 max-w-[40rem] text-[0.97rem] leading-7 text-secondary">
                      {item.description}
                    </p>
                  ) : null}
                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-4 max-w-[40rem] list-disc space-y-2 pl-5 text-[0.95rem] leading-7 text-secondary">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                  {item.technologies && item.technologies.length > 0 ? (
                    <p className="meta mt-5 text-muted">
                      {item.technologies.join("  /  ")}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  );
}
