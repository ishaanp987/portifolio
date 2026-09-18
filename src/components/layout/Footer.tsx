import { ArrowUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { RegistrationMark } from "@/components/media/RegistrationMark";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import type { NavItem } from "@/types";

type FooterProps = {
  navigation: NavItem[];
};

export function Footer({ navigation }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container width="wide" className="footer-grid">
        <p className="footer-wordmark">
          <span className="footer-first">{site.firstName}</span>
          <span className="footer-last">{site.lastName}</span>
        </p>
        <div className="footer-meta">
          <p className="footer-index meta m-0">
            <RegistrationMark />
            <span>
              {site.initials} / {year}
            </span>
          </p>
          <nav className="footer-nav" aria-label="Footer">
            {navigation.map((item) => (
              <TextLink key={item.id} href={item.href} variant="nav">
                {item.label}
              </TextLink>
            ))}
            <TextLink href="#index" variant="plain" className="footer-top">
              <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
              Top
            </TextLink>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
