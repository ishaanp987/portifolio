import { site } from "@/config/site";

export function IdentityPanel() {
  return (
    <div className="identity-panel" aria-hidden="true">
      <p className="identity-mark">{site.role}</p>
      <p className="identity-name">
        <span>{site.firstName}</span>
        <span>{site.lastName}</span>
      </p>
      <p className="identity-meta">{site.disciplines.join(" · ")}</p>
    </div>
  );
}
