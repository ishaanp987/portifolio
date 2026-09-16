import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";
import { hasContent } from "@/lib/links";
import { getSectionIndex } from "@/lib/sections";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-anchor border-t border-border"
    >
      <Container className="section-space">
        <SectionHeading index={getSectionIndex("contact")} label="Contact" />
        <h2
          id="contact-heading"
          className="max-w-[16ch] text-[length:var(--text-page)] font-medium tracking-[-0.038em]"
        >
          Have something interesting to build?
        </h2>
        <p className="mt-4 max-w-[28rem] text-[1.05rem] leading-8 text-secondary">
          Let’s talk.
        </p>

        {hasContent(site.email) ? (
          <p className="mt-8">
            <TextLink
              href={`mailto:${site.email}`}
              variant="action"
              className="text-[1.05rem]"
            >
              {site.email}
            </TextLink>
          </p>
        ) : (
          <p className="mt-8 max-w-xl text-secondary">
            Add an email address in{" "}
            <code className="font-mono text-[0.85em] text-muted">src/config/site.ts</code>{" "}
            to show a contact link here.
          </p>
        )}

        {social.length > 0 ? (
          <ul className="mt-6 flex flex-wrap items-center -mx-2">
            {social
              .filter((item) => item.id !== "email")
              .map((item) => (
                <li key={item.id}>
                  <TextLink href={item.href} variant="nav">
                    {item.label}
                  </TextLink>
                </li>
              ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
