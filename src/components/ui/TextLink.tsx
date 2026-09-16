import Link from "next/link";
import { isExternalHref } from "@/lib/links";

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
      <span className="link-mark font-mono" aria-hidden="true">
        {httpExternal ? "↗" : "→"}
      </span>
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
