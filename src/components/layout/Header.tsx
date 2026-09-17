"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TextLink } from "@/components/ui/TextLink";
import { navigation, utilityLinks } from "@/config/navigation";
import { site } from "@/config/site";
import { getShortYear } from "@/lib/identity";

const sectionIds = navigation
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

export function Header() {
  const pathname = usePathname();
  const onProjects = Boolean(pathname?.startsWith("/projects"));
  const [sectionActive, setSectionActive] = useState(pathname === "/" ? "index" : "");
  const [observedPath, setObservedPath] = useState(pathname);

  if (pathname !== observedPath) {
    setObservedPath(pathname);
    setSectionActive(pathname === "/" ? "index" : "");
  }

  const active = onProjects ? "projects" : sectionActive;

  useEffect(() => {
    if (onProjects) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSectionActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.18, 0.4, 0.7] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [pathname, onProjects]);

  return (
    <header className="site-header">
      <TextLink
        href="/"
        variant="plain"
        className="brand-mark"
        ariaLabel={`${site.name}, home`}
      >
        <span>{site.initials}</span>
        <span className="text-muted"> / </span>
        <span className="text-accent">{getShortYear()}</span>
      </TextLink>
      <nav aria-label="Primary" className="header-nav">
        <ul className="nav-list">
          {navigation.map((item) => {
            const id = item.href.split("#")[1] ?? item.id;
            const isActive = item.id === "home" ? active === "index" : active === id;
            return (
              <li key={item.id}>
                <TextLink href={item.href} variant="nav" active={isActive}>
                  {item.label}
                </TextLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="header-utils">
        {utilityLinks.map((item) => (
          <TextLink key={item.id} href={item.href} variant="nav">
            {item.label}
          </TextLink>
        ))}
      </div>
    </header>
  );
}
