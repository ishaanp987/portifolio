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
  const cols = 12;
  const rows = 8;
  const cellX = width / cols;
  const cellY = height / rows;

  const nodes = Array.from({ length: 6 }, (_, i) => ({
    x: Math.floor(random() * (cols - 2) + 1) * cellX,
    y: Math.floor(random() * (rows - 2) + 1) * cellY,
    r: i % 3 === 0 ? 18 : 4,
  }));

  const lines = nodes.slice(0, -1).map((node, i) => ({
    x1: node.x,
    y1: node.y,
    x2: nodes[i + 1].x,
    y2: nodes[i + 1].y,
  }));

  const boxes = Array.from({ length: 2 }, () => {
    const x = Math.floor(random() * 7 + 1) * cellX;
    const y = Math.floor(random() * 4 + 1) * cellY;
    return {
      x,
      y,
      w: Math.floor(random() * 3 + 2) * cellX,
      h: Math.floor(random() * 2 + 1) * cellY,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={title}
      className={["schematic-media block h-full w-full", className]
        .filter(Boolean)
        .join(" ")}
    >
      <rect width={width} height={height} fill="#121211" />
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={i * cellX}
          y1={0}
          x2={i * cellX}
          y2={height}
          stroke="#2b2b26"
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
          stroke="#2b2b26"
          strokeWidth="1"
        />
      ))}
      {boxes.map((box, i) => (
        <rect
          key={`box-${i}`}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          fill="none"
          stroke="#45453c"
          strokeWidth="1.25"
        />
      ))}
      {lines.map((line, i) => (
        <line
          key={`l-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#8a9364"
          strokeWidth="1.25"
        />
      ))}
      {nodes.map((node, i) =>
        node.r > 8 ? (
          <circle
            key={`n-${i}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="none"
            stroke="#8a9364"
            strokeWidth="1.25"
          />
        ) : (
          <rect
            key={`n-${i}`}
            x={node.x - 3.5}
            y={node.y - 3.5}
            width="7"
            height="7"
            fill="#0c0c0b"
            stroke="#eceae2"
            strokeWidth="1"
          />
        ),
      )}
      <text
        x="28"
        y="36"
        fill="#8a9364"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="14"
        letterSpacing="2.4"
      >
        {code ?? "FIG"} / COVER
      </text>
      <text
        x="28"
        y={height - 24}
        fill="#7d7b71"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="13"
        letterSpacing="1.8"
      >
        SCHEMATIC PLACEHOLDER
      </text>
    </svg>
  );
}
