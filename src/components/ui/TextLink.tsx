import Link from "next/link";
import { isExternalHref } from "@/lib/links";

function LinkMark({ external }: { external: boolean }) {
  if (external) {
    return (
      <svg
        className="link-mark"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <path
          d="M2 1.5h6.5V8M8.5 1.5 1.5 8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  return (
    <svg
      className="link-mark"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      aria-hidden="true"
    >
      <path
        d="M1 5h9.5M7.5 1.75 11 5 7.5 8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "underline" | "action" | "ghost" | "nav" | "plain";
  ariaLabel?: string;
};

export function TextLink({
  href,
  children,
  className,
  variant = "underline",
  ariaLabel,
}: TextLinkProps) {
  const httpExternal = isExternalHref(href);
  const mail = href.startsWith("mailto:");
  const variantClass =
    variant === "action"
      ? "action-link"
      : variant === "ghost"
        ? "ghost-link"
        : variant === "nav"
          ? "nav-link"
          : variant === "plain"
            ? "text-inherit no-underline"
            : "text-link";

  const classes = [variantClass, className].filter(Boolean).join(" ");
  const extra = {
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
  };

  const mark =
    httpExternal || variant === "action" ? (
      <LinkMark external={httpExternal} />
    ) : null;

  if (httpExternal || mail) {
    const rel = mail ? undefined : "noopener noreferrer";
    const target = mail ? undefined : "_blank";
    return (
      <a href={href} className={classes} target={target} rel={rel} {...extra}>
        {children}
        {httpExternal ? mark : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...extra}>
      {children}
      {variant === "action" ? mark : null}
    </Link>
  );
}
