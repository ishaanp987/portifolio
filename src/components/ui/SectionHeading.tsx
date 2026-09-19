type SectionHeadingProps = {
  label: string;
  id?: string;
  className?: string;
};

export function SectionHeading({ label, id, className }: SectionHeadingProps) {
  return (
    <div
      className={["section-kicker mb-8 md:mb-10", className].filter(Boolean).join(" ")}
    >
      <p id={id} className="section-kicker-label m-0">
        {label}
      </p>
      <span className="section-kicker-rule" aria-hidden="true" />
    </div>
  );
}
