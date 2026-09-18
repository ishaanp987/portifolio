type RegistrationMarkProps = {
  className?: string;
  title?: string;
};

export function RegistrationMark({ className, title }: RegistrationMarkProps) {
  return (
    <svg
      className={["reg-mark", className].filter(Boolean).join(" ")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
