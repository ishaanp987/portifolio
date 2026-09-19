import { ArrowUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
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
      <Container width="wide" className="footer-bar">
        <div className="footer-identity">
          <p className="footer-name">
            <span className="footer-initials" aria-hidden="true">
              {site.initials}
            </span>
            <span>{site.name}</span>
          </p>
          <p className="footer-year">{year}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {navigation.map((item) => (
            <TextLink key={item.id} href={item.href} variant="nav">
              {item.label}
            </TextLink>
          ))}
          <TextLink
            href="#top"
            variant="plain"
            className="footer-top"
            ariaLabel="Back to top"
          >
            <ArrowUp size={18} strokeWidth={1.75} />
          </TextLink>
        </nav>
      </Container>
    </footer>
  );
}
