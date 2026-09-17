import {
  hashString,
  isolinePath,
  loopPath,
  mulberry32,
} from "@/lib/contours";

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
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 70 + i * 58 + (random() - 0.5) * 16;
    return isolinePath({
      random,
      y,
      width,
      amplitude: 22 + random() * 28,
      waves: 1.1 + random() * 0.8,
    });
  });
  const loops = [
    loopPath({
      random,
      cx: 280 + random() * 80,
      cy: 230 + random() * 40,
      rx: 90 + random() * 30,
      ry: 54 + random() * 18,
    }),
    loopPath({
      random,
      cx: 640 + random() * 90,
      cy: 340 + random() * 50,
      rx: 110 + random() * 36,
      ry: 62 + random() * 20,
    }),
  ];
  const marks = Array.from({ length: 4 }, () => ({
    x: 90 + random() * 780,
    y: 90 + random() * 420,
  }));
  const accentIndex = Math.floor(random() * lines.length);

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
      {lines.map((d, i) => (
        <path
          key={`line-${i}`}
          d={d}
          fill="none"
          stroke={i === accentIndex ? "var(--accent)" : "var(--border-strong)"}
          strokeWidth={i === accentIndex ? 1.35 : 1.1}
          opacity={i === accentIndex ? 0.55 : 0.55 + (i % 3) * 0.08}
        />
      ))}
      {loops.map((d, i) => (
        <path
          key={`loop-${i}`}
          d={d}
          fill="none"
          stroke={i === 0 ? "var(--accent)" : "var(--border-strong)"}
          strokeWidth="1.2"
          opacity={i === 0 ? 0.45 : 0.7}
        />
      ))}
      {marks.map((mark, i) => (
        <g
          key={`mark-${i}`}
          transform={`translate(${mark.x} ${mark.y})`}
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        >
          <circle r="3.2" />
          <path d="M-7 0h14M0 -7v14" />
        </g>
      ))}
      <rect
        x="22"
        y="20"
        width="196"
        height="36"
        rx="8"
        fill="var(--background)"
        stroke="var(--accent-border)"
      />
      <text
        x="38"
        y="43"
        fill="var(--accent)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="13"
        letterSpacing="2.2"
      >
        {code ?? "FIG"} / FIELD
      </text>
    </svg>
  );
}
