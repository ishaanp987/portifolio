import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";
import { isRealValue, isUsableEmail, isUsableHref, mailtoHref } from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function ContactSection() {
  const emailReady = isUsableEmail(site.email);
  const resumeReady = isUsableHref(site.resume);
  const otherSocial = social.filter((item) => item.id !== "email");
  const hasAside =
    emailReady ||
    resumeReady ||
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
        <Reveal>
          <SectionHeading index={getSectionIndex("contact")} label="Contact" />
        </Reveal>
        <div className="contact-layout">
          <Reveal delay={70} className="min-w-0">
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
            ) : otherSocial[0] ? (
              <div className="mt-8">
                <TextLink href={otherSocial[0].href} variant="primary">
                  {otherSocial[0].label}
                </TextLink>
              </div>
            ) : resumeReady ? (
              <div className="mt-8">
                <TextLink href={site.resume} variant="primary">
                  Résumé
                </TextLink>
              </div>
            ) : null}
          </Reveal>
          {hasAside ? (
            <Reveal delay={140} className="min-w-0">
              <aside>
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
                {otherSocial.length > 0 || resumeReady ? (
                  <ul className="-mx-2 mt-5 flex flex-wrap items-center">
                    {otherSocial.map((item) => (
                      <li key={item.id}>
                        <TextLink href={item.href} variant="nav">
                          {item.label}
                        </TextLink>
                      </li>
                    ))}
                    {resumeReady ? (
                      <li>
                        <TextLink href={site.resume} variant="nav">
                          Résumé
                        </TextLink>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </aside>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
