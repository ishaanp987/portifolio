import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { isPlaceholderCopy, isUsableHref } from "@/lib/content";
import {
  experienceYear,
  formatExperienceDates,
  getVisibleExperience,
} from "@/lib/experience";
import { hasContent } from "@/lib/links";
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
          className="max-w-[14ch] text-[length:var(--text-page)] tracking-[-0.04em]"
        >
          Roles and labs.
        </h2>

        {items.length === 0 ? (
          <p className="source-hint mt-8">
            No experience listed yet. Add entries in <code>src/data/experience.ts</code>.
          </p>
        ) : (
          <>
            {hasTemplate ? (
              <p className="source-hint mt-6">
                Template entries are still in <code>src/data/experience.ts</code>. Replace
                organizations, roles, and outcomes before treating this as a résumé.
              </p>
            ) : null}
            <ol className="timeline mt-10">
              {items.map((item) => (
                <li key={item.id} className="experience-item">
                  <p className="experience-year">{experienceYear(item)}</p>
                  <div className="min-w-0">
                    <h3 className="text-[1.35rem] font-medium tracking-[-0.035em] text-foreground md:text-[1.6rem]">
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
          </>
        )}
      </Container>
    </section>
  );
}
