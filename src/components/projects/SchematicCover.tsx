function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type SchematicCoverProps = {
  seed: string;
  title: string;
  code?: string;
  className?: string;
};

export function SchematicCover({ seed, title, code, className }: SchematicCoverProps) {
  const random = mulberry32(hashString(seed));
  const width = 960;
  const height = 600;
  const padX = 96;
  const padY = 88;
  const cols = 12;
  const rows = 8;
  const cellX = width / cols;
  const cellY = height / rows;

  const modules = [
    { x: padX + random() * 40, y: padY + random() * 24, w: 220, h: 120 },
    { x: 380 + random() * 50, y: padY + 16 + random() * 20, w: 200, h: 108 },
    { x: 640 + random() * 30, y: 210 + random() * 30, w: 188, h: 132 },
    { x: padX + 40 + random() * 40, y: 330 + random() * 20, w: 260, h: 116 },
  ];

  const centers = modules.map((mod) => ({
    x: mod.x + mod.w / 2,
    y: mod.y + mod.h / 2,
  }));

  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 2],
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={title}
      className={["schematic-media block h-full w-full", className]
        .filter(Boolean)
        .join(" ")}
    >
      <rect width={width} height={height} fill="var(--background-secondary)" />
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={i * cellX}
          y1={0}
          x2={i * cellX}
          y2={height}
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * cellY}
          x2={width}
          y2={i * cellY}
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}
      <line
        x1={padX - 24}
        y1={padY - 24}
        x2={padX - 24}
        y2={height - 48}
        stroke="var(--border-strong)"
        strokeWidth="1"
      />
      <line
        x1={padX - 24}
        y1={height - 48}
        x2={width - 48}
        y2={height - 48}
        stroke="var(--border-strong)"
        strokeWidth="1"
      />
      {modules.map((mod, i) => (
        <g key={`m-${i}`}>
          <rect
            x={mod.x}
            y={mod.y}
            width={mod.w}
            height={mod.h}
            fill="var(--background)"
            stroke={i === 1 ? "var(--accent)" : "var(--border-strong)"}
            strokeWidth="1.25"
            rx="10"
          />
          <text
            x={mod.x + 14}
            y={mod.y + 28}
            fill="var(--text-muted)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fontSize="12"
            letterSpacing="1.6"
          >
            {`BLK ${String(i + 1).padStart(2, "0")}`}
          </text>
        </g>
      ))}
      {links.map(([a, b], i) => (
        <line
          key={`link-${i}`}
          x1={centers[a].x}
          y1={centers[a].y}
          x2={centers[b].x}
          y2={centers[b].y}
          stroke="var(--accent)"
          strokeWidth="1.25"
        />
      ))}
      {centers.map((center, i) => (
        <rect
          key={`n-${i}`}
          x={center.x - 4}
          y={center.y - 4}
          width="8"
          height="8"
          rx="2"
          fill="var(--background)"
          stroke="var(--text-primary)"
          strokeWidth="1"
        />
      ))}
      <text
        x="28"
        y="36"
        fill="var(--accent)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="14"
        letterSpacing="2.4"
      >
        {code ?? "FIG"} / COVER
      </text>
      <text
        x="28"
        y={height - 22}
        fill="var(--text-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="13"
        letterSpacing="1.8"
      >
        SCHEMATIC PLACEHOLDER
      </text>
    </svg>
  );
}
