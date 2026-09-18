import { site } from "@/config/site";
import { getPersonalNote, getProfileFacts, isRealValue } from "@/lib/content";

export function IdentityPanel() {
  const facts = getProfileFacts();
  const note = getPersonalNote();
  const field = facts.find((fact) => fact.label === "Field")?.value;

  return (
    <div className="identity-panel" aria-label={`${site.name} profile`}>
      <p className="identity-mono" aria-hidden="true">
        {site.initials}
      </p>
      <div className="min-w-0">
        {isRealValue(site.role) ? <p className="identity-role">{site.role}</p> : null}
        {field ? <p className="identity-meta">{field}</p> : null}
        {note ? <p className="identity-note">{note}</p> : null}
      </div>
    </div>
  );
}
