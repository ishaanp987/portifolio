import { RegistrationMark } from "@/components/media/RegistrationMark";

type SectionHeadingProps = {
  index: string;
  label: string;
  id?: string;
  className?: string;
};

export function SectionHeading({ index, label, id, className }: SectionHeadingProps) {
  return (
    <div
      className={["section-kicker mb-10 md:mb-12", className].filter(Boolean).join(" ")}
    >
      <p id={id} className="m-0">
        <span className="kicker-index">{index}.00</span>
        <span className="text-muted"> / </span>
        <span>{label}</span>
      </p>
      <span className="section-kicker-rule" aria-hidden="true" />
      <RegistrationMark />
    </div>
  );
}
