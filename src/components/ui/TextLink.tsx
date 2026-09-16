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
  const external = isExternalHref(href) || href.startsWith("mailto:");
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
    ...(external ? { "data-external": "true" } : {}),
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
  };

  if (external) {
    const rel = href.startsWith("mailto:") ? undefined : "noopener noreferrer";
    const target = href.startsWith("mailto:") ? undefined : "_blank";
    return (
      <a href={href} className={classes} target={target} rel={rel} {...extra}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...extra}>
      {children}
    </Link>
  );
}
