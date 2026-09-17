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
  const pathname = usePathname() ?? "/";
  const onProjects = pathname.startsWith("/projects");
  const [sectionActive, setSectionActive] = useState("index");
  const active = onProjects ? "projects" : sectionActive;

  useEffect(() => {
    if (onProjects) return;

    const update = () => {
      const marker = Math.round(window.innerHeight * 0.22);
      let current = "index";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= marker) current = id;
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
