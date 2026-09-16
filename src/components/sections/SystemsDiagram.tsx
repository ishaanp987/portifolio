export function SystemsDiagram() {
  return (
    <svg
      viewBox="0 0 420 280"
      role="img"
      aria-label="System diagram connecting software, robotics, AI, and product."
      className="h-auto w-full max-w-[28rem]"
    >
      <rect width="420" height="280" fill="transparent" />
      <g stroke="#2b2b26" strokeWidth="1" fill="none">
        <line x1="20" y1="20" x2="20" y2="260" />
        <line x1="20" y1="260" x2="400" y2="260" />
        <line x1="16" y1="20" x2="24" y2="20" />
        <line x1="16" y1="90" x2="24" y2="90" />
        <line x1="16" y1="160" x2="24" y2="160" />
        <line x1="16" y1="230" x2="24" y2="230" />
        <line x1="20" y1="256" x2="20" y2="264" />
        <line x1="140" y1="256" x2="140" y2="264" />
        <line x1="260" y1="256" x2="260" y2="264" />
        <line x1="400" y1="256" x2="400" y2="264" />
      </g>
      <g
        fill="#7d7b71"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="9"
        letterSpacing="1.4"
      >
        <text x="28" y="23">
          00
        </text>
        <text x="28" y="93">
          01
        </text>
        <text x="28" y="163">
          02
        </text>
        <text x="28" y="233">
          03
        </text>
        <text x="132" y="276">
          X
        </text>
      </g>
      <line x1="110" y1="78" x2="210" y2="140" stroke="#8a9364" strokeWidth="1.15" />
      <line x1="210" y1="140" x2="310" y2="78" stroke="#8a9364" strokeWidth="1.15" />
      <line x1="210" y1="140" x2="210" y2="208" stroke="#8a9364" strokeWidth="1.15" />
      <rect x="72" y="52" width="92" height="36" fill="#0c0c0b" stroke="#45453c" />
      <rect x="262" y="52" width="92" height="36" fill="#0c0c0b" stroke="#45453c" />
      <rect x="164" y="122" width="92" height="36" fill="#0c0c0b" stroke="#8a9364" />
      <rect x="164" y="200" width="92" height="36" fill="#0c0c0b" stroke="#45453c" />
      <g
        fill="#eceae2"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="10"
        letterSpacing="1.6"
      >
        <text x="86" y="74">
          SOFTWARE
        </text>
        <text x="284" y="74">
          PRODUCT
        </text>
        <text x="186" y="144">
          SYSTEMS
        </text>
        <text x="196" y="222">
          ROBOTICS
        </text>
      </g>
      <circle cx="110" cy="70" r="2.2" fill="#8a9364" />
      <circle cx="310" cy="70" r="2.2" fill="#8a9364" />
      <circle cx="210" cy="140" r="2.2" fill="#eceae2" />
      <circle cx="210" cy="218" r="2.2" fill="#8a9364" />
      <text
        x="318"
        y="222"
        fill="#7d7b71"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="9"
        letterSpacing="1.5"
      >
        AI / CONTROL
      </text>
    </svg>
  );
}
