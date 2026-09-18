import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { social } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container
        width="wide"
        className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="m-0 text-[0.95rem] text-secondary">
          {site.name}
          <span className="meta"> · {year}</span>
        </p>
        {social.length > 0 ? (
          <ul className="-mx-2 flex flex-wrap items-center">
            {social.map((item) => (
              <li key={item.id}>
                <TextLink href={item.href} variant="nav">
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </footer>
  );
}
