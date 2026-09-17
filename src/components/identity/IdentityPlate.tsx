import { site } from "@/config/site";
import { getShortYear } from "@/lib/identity";

export function IdentityPlate() {
  const year = getShortYear();
  const tags = site.disciplines.join("  ·  ");

  return (
    <div className="about-visual" aria-hidden="true">
      <svg viewBox="0 0 420 460" className="h-full w-full">
        <rect width="420" height="460" fill="var(--background-secondary)" rx="22" />
        <path
          d="M-20 360 C 40 300, 90 250, 150 240 C 230 226, 270 300, 340 270 C 390 252, 430 200, 470 210"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.2"
        />
        <path
          d="M-20 300 C 50 250, 110 200, 180 196 C 250 192, 300 250, 370 228 C 410 216, 450 176, 490 184"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.2"
        />
        <path
          d="M-20 240 C 60 210, 120 164, 200 160 C 280 156, 330 214, 400 186"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.25"
          opacity="0.45"
        />
        <path
          d="M-10 180 C 80 170, 150 130, 230 136 C 310 142, 360 176, 440 150"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.1"
        />
        <ellipse
          cx="286"
          cy="214"
          rx="74"
          ry="42"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.15"
          opacity="0.4"
        />
        <g transform="translate(318 198)" stroke="var(--accent)" fill="none" strokeWidth="1.2">
          <circle r="3" />
          <path d="M-8 0h16M0 -8v16" />
        </g>
        <text
          x="28"
          y="42"
          fill="var(--accent)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="12"
          letterSpacing="2.4"
        >
          {`ID / ${year}`}
        </text>
        <text
          x="28"
          y="268"
          fill="var(--text-primary)"
          fontFamily="var(--font-sans-family), ui-sans-serif, system-ui, sans-serif"
          fontSize="92"
          fontWeight="500"
          letterSpacing="-4"
        >
          {site.initials}
        </text>
        <text
          x="30"
          y="318"
          fill="var(--text-secondary)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="11"
          letterSpacing="1.8"
        >
          {tags}
        </text>
        <rect
          x="24"
          y="402"
          width="12"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--accent)"
        />
        <text
          x="46"
          y="413"
          fill="var(--text-muted)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="11"
          letterSpacing="1.8"
        >
          {site.role}
        </text>
      </svg>
    </div>
  );
}
