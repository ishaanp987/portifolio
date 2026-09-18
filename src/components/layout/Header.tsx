"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import type { NavItem } from "@/types";

type HeaderProps = {
  navigation: NavItem[];
  utilityLinks: NavItem[];
  brandName: string;
};

export function Header({ navigation, utilityLinks, brandName }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const onProjects = pathname.startsWith("/projects");
  const [sectionActive, setSectionActive] = useState("");
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const navRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const active = onProjects ? "projects" : sectionActive;
  const sectionIds = useMemo(
    () =>
      navigation
        .map((item) => item.href.split("#")[1])
        .filter((id): id is string => Boolean(id)),
    [navigation],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (onProjects) return;

    const update = () => {
      const marker = Math.round(window.innerHeight * 0.28);
      let current = "";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= marker) current = id;
      }
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      if (atBottom && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }
      setSectionActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, onProjects, sectionIds]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const place = () => {
      const activeLink = nav.querySelector('[data-active="true"]') as HTMLElement | null;
      if (!activeLink) {
        setIndicator((current) => ({ ...current, ready: false, width: 0 }));
        return;
      }
      const navBox = nav.getBoundingClientRect();
      const linkBox = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkBox.left - navBox.left + 11,
        width: Math.max(linkBox.width - 22, 12),
        ready: true,
      });
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, navigation]);

  return (
    <header className="site-header">
      <Container width="wide">
        <div className="header-bar">
          <TextLink
            href="/"
            variant="plain"
            className="brand-mark"
            ariaLabel={`${brandName}, home`}
            onClick={() => setOpen(false)}
          >
            {brandName}
          </TextLink>

          <nav aria-label="Primary" className="desktop-nav">
            <div className="relative" ref={navRef}>
              <span
                className={indicator.ready ? "nav-indicator is-ready" : "nav-indicator"}
                style={{ left: indicator.left, width: indicator.width }}
                aria-hidden="true"
              />
              <ul className="nav-list">
                {navigation.map((item) => {
                  const id = item.href.split("#")[1] ?? item.id;
                  return (
                    <li key={item.id}>
                      <TextLink href={item.href} variant="nav" active={active === id}>
                        {item.label}
                      </TextLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="header-end">
            <div className="header-utils">
              {utilityLinks.map((item) => (
                <TextLink key={item.id} href={item.href} variant="nav">
                  {item.label}
                </TextLink>
              ))}
            </div>
            <button
              type="button"
              className="menu-toggle md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              hidden={navigation.length === 0 && utilityLinks.length === 0}
            >
              {open ? (
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <div
        id={menuId}
        className={open ? "mobile-nav is-open" : "mobile-nav"}
        inert={!open}
      >
        <div className="mobile-nav-inner">
          <Container width="wide">
            <nav aria-label="Mobile" onClick={() => setOpen(false)}>
              {navigation.map((item) => {
                const id = item.href.split("#")[1] ?? item.id;
                return (
                  <TextLink
                    key={item.id}
                    href={item.href}
                    variant="mobile"
                    active={active === id}
                    className="w-full"
                  >
                    {item.label}
                  </TextLink>
                );
              })}
              {utilityLinks.map((item) => (
                <TextLink
                  key={item.id}
                  href={item.href}
                  variant="mobile"
                  className="w-full"
                >
                  {item.label}
                </TextLink>
              ))}
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
