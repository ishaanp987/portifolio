import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";
import { getShortYear } from "@/lib/identity";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container
        width="wide"
        className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="meta m-0">
          {site.initials}
          <span className="text-muted"> / </span>
          <span className="text-accent">{getShortYear()}</span>
          <span className="text-border-strong"> · </span>
          {year}
        </p>
        <ul className="-mx-2 flex flex-wrap items-center">
          {social.map((item) => (
            <li key={item.id}>
              <TextLink href={item.href} variant="nav">
                {item.label}
              </TextLink>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
