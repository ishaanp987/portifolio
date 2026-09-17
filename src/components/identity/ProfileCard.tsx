import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { hasContent } from "@/lib/links";
import { isSectionEnabled } from "@/lib/sections";

export function ProfileCard() {
  const projectsEnabled = isSectionEnabled("projects");

  return (
    <aside className="profile-card">
      <div className="profile-avatar" aria-hidden={!hasContent(site.avatar)}>
        {hasContent(site.avatar) ? (
          <Image
            src={site.avatar}
            alt={site.name}
            fill
            sizes="120px"
            className="object-cover"
          />
        ) : (
          <span className="profile-mono">{site.initials}</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="profile-name">{site.name}</p>
        {hasContent(site.role) ? <p className="profile-role">{site.role}</p> : null}
      </div>
      <dl className="profile-meta">
        {hasContent(site.location) ? (
          <div className="meta-pair">
            <dt className="meta-key">Loc</dt>
            <dd className="meta-val">{site.location}</dd>
          </div>
        ) : null}
        {hasContent(site.email) ? (
          <div className="meta-pair">
            <dt className="meta-key">Mail</dt>
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
      <div className="profile-actions">
        <TextLink href={projectsEnabled ? "/#projects" : "/projects"} variant="action">
          View projects
        </TextLink>
        {hasContent(site.resume) ? (
          <TextLink href={site.resume} variant="ghost">
            Résumé
          </TextLink>
        ) : hasContent(site.github) ? (
          <TextLink href={site.github} variant="ghost">
            GitHub
          </TextLink>
        ) : null}
      </div>
    </aside>
  );
}
