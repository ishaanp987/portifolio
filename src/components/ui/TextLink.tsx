import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { isExternalHref } from "@/lib/links";

function LinkMark({ external }: { external: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return <Icon className="link-mark" size={16} strokeWidth={1.75} aria-hidden="true" />;
}

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "underline"
    | "action"
    | "ghost"
    | "nav"
    | "plain"
    | "primary"
    | "secondary"
    | "mobile";
  ariaLabel?: string;
  active?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  variant = "underline",
  ariaLabel,
  active = false,
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
            : variant === "primary"
              ? "btn btn-primary"
              : variant === "secondary"
                ? "btn btn-secondary"
                : variant === "mobile"
                  ? "mobile-link"
                  : "text-link";

  const classes = [variantClass, className].filter(Boolean).join(" ");
  const extra = {
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    ...(active ? { "data-active": "true", "aria-current": "true" as const } : {}),
  };

  const mark =
    variant === "action" ? (
      <>
        <span className="action-rule" aria-hidden="true" />
        <LinkMark external={httpExternal} />
      </>
    ) : variant === "primary" || variant === "secondary" || variant === "mobile" ? (
      <LinkMark external={httpExternal} />
    ) : httpExternal ? (
      <LinkMark external />
    ) : null;

  if (httpExternal || mail) {
    const rel = mail ? undefined : "noopener noreferrer";
    const target = mail ? undefined : "_blank";
    return (
      <a href={href} className={classes} target={target} rel={rel} {...extra}>
        {children}
        {mark}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...extra}>
      {children}
      {variant === "underline" || variant === "plain" || variant === "nav" ? null : mark}
    </Link>
  );
}
