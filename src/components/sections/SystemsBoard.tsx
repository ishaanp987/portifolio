import { site } from "@/config/site";
import { hasContent } from "@/lib/links";

const AREAS = site.focusAreas;

function coreIndex(areas: readonly string[]): number {
  const named = areas.findIndex((area) => area.toLowerCase() === "engineering");
  if (named >= 0) return named;
  return Math.min(3, Math.max(0, areas.length - 1));
}

export function SystemsBoard() {
  const core = coreIndex(AREAS);

  return (
    <div className="board">
      <div className="flex items-baseline justify-between gap-4">
        <p className="meta m-0 text-accent">Current focus</p>
        <p className="meta m-0">SYS-01 · NTS</p>
      </div>

      <ol className="board-spine md:hidden">
        {AREAS.map((area, index) => (
          <li key={area} className={index === core ? "is-core" : undefined}>
            <span className="meta m-0 text-accent">{String(index).padStart(2, "0")}</span>
            <span>{area}</span>
          </li>
        ))}
      </ol>

      <div
        className="board-canvas hidden md:block"
        role="img"
        aria-label={`System map of ${AREAS.join(", ")}.`}
      >
        {AREAS.length === 5 ? (
          <FiveSystemMap areas={AREAS} core={core} />
        ) : (
          <SpineSystemMap areas={AREAS} core={core} />
        )}
      </div>

      <dl className="mt-4 grid gap-2 border-t border-border pt-3">
        {hasContent(site.availability) ? (
          <div className="meta-pair">
            <dt className="meta-key">Status</dt>
            <dd className="meta-val">{site.availability}</dd>
          </div>
        ) : null}
        {hasContent(site.location) ? (
          <div className="meta-pair">
            <dt className="meta-key">Loc</dt>
            <dd className="meta-val">{site.location}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

function FiveSystemMap({ areas, core }: { areas: readonly string[]; core: number }) {
  const nodes = [
    { x: 58, y: 36, w: 118, h: 38 },
    { x: 244, y: 36, w: 118, h: 38 },
    { x: 58, y: 128, w: 118, h: 38 },
    { x: 244, y: 128, w: 118, h: 38 },
    { x: 151, y: 212, w: 118, h: 38 },
  ];
  const links: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 4],
  ];

  return (
    <svg viewBox="0 0 420 276" className="h-auto w-full">
      <Axis />
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x + nodes[a].w / 2}
          y1={nodes[a].y + nodes[a].h / 2}
          x2={nodes[b].x + nodes[b].w / 2}
          y2={nodes[b].y + nodes[b].h / 2}
          stroke="var(--accent)"
          strokeWidth="1.15"
        />
      ))}
      {nodes.map((node, index) => (
        <Node key={areas[index]} {...node} label={areas[index]} core={index === core} />
      ))}
    </svg>
  );
}

function SpineSystemMap({ areas, core }: { areas: readonly string[]; core: number }) {
  const startY = 36;
  const step = 48;
  const height = startY + areas.length * step;
  const x = 86;
  const w = 168;
  const h = 36;

  return (
    <svg viewBox={`0 0 420 ${height}`} className="h-auto w-full">
      <Axis height={height} />
      {areas.map((area, index) => {
        const y = startY + index * step;
        return (
          <g key={area}>
            {index > 0 ? (
              <line
                x1={x + w / 2}
                y1={y - step + h}
                x2={x + w / 2}
                y2={y}
                stroke="var(--accent)"
                strokeWidth="1.15"
              />
            ) : null}
            <Node x={x} y={y} w={w} h={h} label={area} core={index === core} />
          </g>
        );
      })}
    </svg>
  );
}

function Axis({ height = 276 }: { height?: number }) {
  return (
    <g>
      <g stroke="var(--border)" strokeWidth="1" fill="none">
        <line x1="18" y1="12" x2="18" y2={height - 18} />
        <line x1="18" y1={height - 18} x2="400" y2={height - 18} />
        <line x1="14" y1="12" x2="22" y2="12" />
        <line x1="14" y1={height / 3} x2="22" y2={height / 3} />
        <line x1="14" y1={(height * 2) / 3} x2="22" y2={(height * 2) / 3} />
        <line x1="14" y1={height - 18} x2="22" y2={height - 18} />
      </g>
      <g
        fill="var(--text-muted)"
        fontFamily="var(--font-mono-family), ui-monospace, monospace"
        fontSize="9"
        letterSpacing="1.6"
      >
        <text x="28" y="16">
          00
        </text>
        <text x="28" y={height / 3 + 4}>
          01
        </text>
        <text x="28" y={(height * 2) / 3 + 4}>
          02
        </text>
        <text x="392" y={height - 6}>
          X
        </text>
      </g>
    </g>
  );
}

function Node({
  x,
  y,
  w,
  h,
  label,
  core,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  core: boolean;
}) {
  return (
    <g className="board-hotspot">
      <rect
        className={["board-node", core ? "is-core" : ""].filter(Boolean).join(" ")}
        x={x}
        y={y}
        width={w}
        height={h}
      />
      <text className="board-label" x={x + 12} y={y + h / 2 + 4}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}
