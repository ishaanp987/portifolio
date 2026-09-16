"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
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
  const [sectionActive, setSectionActive] = useState("");
  const [observedPath, setObservedPath] = useState(pathname);

  if (pathname !== observedPath) {
    setObservedPath(pathname);
    setSectionActive("");
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
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [pathname, onProjects]);

  return (
    <header className="site-header sticky top-0 z-30 border-b border-border">
      <Container
        width="wide"
        className="flex flex-col gap-0 lg:h-14 lg:flex-row lg:items-center lg:gap-10"
      >
        <div className="flex min-h-11 items-center justify-between gap-4 lg:min-h-0">
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
          <div className="flex lg:hidden">
            {utilityLinks.map((item) => (
              <TextLink key={item.id} href={item.href} variant="nav">
                {item.label}
              </TextLink>
            ))}
          </div>
        </div>
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 items-center lg:justify-between"
        >
          <ul className="nav-list -mx-2 lg:mx-0 lg:overflow-visible">
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
          {utilityLinks.length > 0 ? (
            <ul className="hidden lg:flex">
              {utilityLinks.map((item) => (
                <li key={item.id}>
                  <TextLink href={item.href} variant="nav">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
      </Container>
    </header>
  );
}
