import { Container } from "@/components/layout/Container";
import { DevNote } from "@/components/ui/DevNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";
import {
  getPendingSiteFields,
  isRealValue,
  isUsableEmail,
  mailtoHref,
} from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function ContactSection() {
  const pending = process.env.NODE_ENV === "development" ? getPendingSiteFields() : [];
  const emailReady = isUsableEmail(site.email);
  const otherSocial = social.filter((item) => item.id !== "email");
  const hasAside =
    emailReady ||
    isRealValue(site.location) ||
    isRealValue(site.availability) ||
    otherSocial.length > 0;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-anchor border-t border-border"
    >
      <Container width="wide" className="section-space">
        <SectionHeading index={getSectionIndex("contact")} label="Contact" />
        <div className="contact-layout">
          <div className="min-w-0">
            <h2
              id="contact-heading"
              className="contact-title max-w-[12ch] text-foreground"
            >
              {site.contactHeading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {emailReady ? (
              <>
                <TextLink
                  href={mailtoHref(site.email)}
                  variant="plain"
                  className="contact-email"
                >
                  {site.email}
                </TextLink>
                <div className="mt-8">
                  <TextLink href={mailtoHref(site.email)} variant="primary">
                    {site.contactCta}
                  </TextLink>
                </div>
              </>
            ) : process.env.NODE_ENV === "development" ? (
              <DevNote>
                Add a real email in <code>src/config/site.ts</code> to turn the closing
                invitation into a working action.
              </DevNote>
            ) : null}
          </div>
          {hasAside ? (
            <aside className="min-w-0">
              <dl className="grid gap-4">
                {emailReady ? (
                  <div className="meta-pair">
                    <dt className="meta-key">Email</dt>
                    <dd className="meta-val">
                      <TextLink
                        href={mailtoHref(site.email)}
                        variant="plain"
                        className="title-link break-anywhere"
                      >
                        {site.email}
                      </TextLink>
                    </dd>
                  </div>
                ) : null}
                {isRealValue(site.location) ? (
                  <div className="meta-pair">
                    <dt className="meta-key">Location</dt>
                    <dd className="meta-val">{site.location}</dd>
                  </div>
                ) : null}
                {isRealValue(site.availability) ? (
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
          ) : process.env.NODE_ENV === "development" && pending.length > 0 ? (
            <DevNote>
              Hidden until real values exist:{" "}
              {pending.map((field) => field.key).join(", ")}.
            </DevNote>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
