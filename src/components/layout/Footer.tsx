import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta m-0">
          {site.name}
          <span className="text-border-strong"> / </span>
          {year}
        </p>
        <ul className="flex flex-wrap items-center -mx-2">
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
