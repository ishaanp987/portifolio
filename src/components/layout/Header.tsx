import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { navigation, utilityLinks } from "@/config/navigation";
import { site } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95">
      <Container className="flex flex-col gap-1 py-2 lg:h-[3.65rem] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-0">
        <div className="flex min-h-11 items-center justify-between gap-4">
          <TextLink
            href="/"
            variant="plain"
            className="inline-flex min-h-11 items-center font-sans text-[0.95rem] tracking-[-0.03em] text-foreground"
            ariaLabel={`${site.name}, home`}
          >
            {site.name}
          </TextLink>
          <div className="flex lg:hidden">
            {utilityLinks.map((item) => (
              <TextLink key={item.id} href={item.href} variant="nav">
                {item.label}
              </TextLink>
            ))}
          </div>
        </div>
        <nav aria-label="Primary" className="min-w-0">
          <ul className="-mx-2 flex flex-wrap items-center">
            {navigation.map((item) => (
              <li key={item.id}>
                <TextLink href={item.href} variant="nav">
                  {item.label}
                </TextLink>
              </li>
            ))}
            {utilityLinks.map((item) => (
              <li key={item.id} className="hidden lg:list-item">
                <TextLink href={item.href} variant="nav">
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
