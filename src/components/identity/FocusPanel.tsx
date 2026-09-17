import { site } from "@/config/site";

export function FocusPanel() {
  return (
    <aside className="focus-panel">
      <p className="meta m-0 text-accent">Focus</p>
      <ol className="focus-list">
        {site.focusAreas.map((area, index) => (
          <li key={area}>
            <span className="focus-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="focus-label">{area}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
