import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";
import { hasContent } from "@/lib/links";
import { getSectionIndex } from "@/lib/sections";

export function ContactSection() {
  const otherSocial = social.filter((item) => item.id !== "email");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-anchor border-t border-border bg-surface"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("contact")} label="Contact" />
        <div className="contact-layout">
          <div className="min-w-0">
            <h2
              id="contact-heading"
              className="contact-title max-w-[11ch] text-foreground"
            >
              {site.contactHeading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {hasContent(site.email) ? (
              <div className="mt-10">
                <TextLink href={`mailto:${site.email}`} variant="action">
                  {site.contactCta}
                </TextLink>
              </div>
            ) : (
              <p className="mt-10 max-w-xl text-secondary">
                Add an email address in{" "}
                <code className="font-mono text-[0.85em] text-muted">
                  src/config/site.ts
                </code>{" "}
                to show a contact link here.
              </p>
            )}
          </div>
          <aside className="contact-meta">
            <dl className="grid gap-4">
              {hasContent(site.email) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Email</dt>
                  <dd className="meta-val">
                    <TextLink
                      href={`mailto:${site.email}`}
                      variant="plain"
                      className="title-link"
                    >
                      {site.email}
                    </TextLink>
                  </dd>
                </div>
              ) : null}
              {hasContent(site.location) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Loc</dt>
                  <dd className="meta-val">{site.location}</dd>
                </div>
              ) : null}
              {hasContent(site.availability) ? (
                <div className="meta-pair">
                  <dt className="meta-key">Status</dt>
                  <dd className="meta-val">
                    <span className="status-pip" aria-hidden="true" />
                    {site.availability}
                  </dd>
                </div>
              ) : null}
            </dl>
            {otherSocial.length > 0 ? (
              <ul className="-mx-2 mt-5 flex flex-wrap items-center">
                {otherSocial.map((item) => (
                  <li key={item.id}>
                    <TextLink href={item.href} variant="nav">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>
      </Container>
    </section>
  );
}
