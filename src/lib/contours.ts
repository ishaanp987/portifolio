export function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function isolinePath({
  random,
  y,
  width,
  amplitude,
  waves = 1.35,
}: {
  random: () => number;
  y: number;
  width: number;
  amplitude: number;
  waves?: number;
}): string {
  const step = 120;
  let d = `M ${-40} ${y + (random() - 0.5) * 8}`;
  for (let x = 0; x <= width + 80; x += step) {
    const phase = (x / width) * Math.PI * waves;
    const lift = Math.sin(phase + random() * 0.4) * amplitude;
    const cx = x + step * 0.45;
    const cy = y + Math.sin(phase + 0.6) * amplitude + (random() - 0.5) * 10;
    const x2 = x + step;
    const y2 = y + lift + (random() - 0.5) * 6;
    d += ` Q ${cx} ${cy} ${x2} ${y2}`;
  }
  return d;
}

export function loopPath({
  random,
  cx,
  cy,
  rx,
  ry,
}: {
  random: () => number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}): string {
  const points = 8;
  const coords = Array.from({ length: points }, (_, i) => {
    const angle = (Math.PI * 2 * i) / points;
    const jitter = 0.82 + random() * 0.28;
    return {
      x: cx + Math.cos(angle) * rx * jitter,
      y: cy + Math.sin(angle) * ry * jitter,
    };
  });
  const first = coords[0];
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < points; i += 1) {
    const current = coords[i];
    const next = coords[(i + 1) % points];
    const cpx = (current.x + next.x) / 2;
    const cpy = (current.y + next.y) / 2;
    d += ` Q ${current.x} ${current.y} ${cpx} ${cpy}`;
  }
  return `${d} Z`;
}
