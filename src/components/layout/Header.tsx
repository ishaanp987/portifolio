"use client";

import { useEffect, useId, useMemo, useState } from "react";
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
              className="menu-toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
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
        hidden={!open}
      >
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
    </header>
  );
}
