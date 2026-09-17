# Architecture

This is a content-driven portfolio. Personal data lives in typed files; components render those files. Six months from now, change `src/config/site.ts` and `src/data/*.ts` first.

## Directory structure

```text
src/
  app/                  Routes, metadata, sitemap, robots, Open Graph
  components/
    ui/                 Links, labels, meta lists
    identity/           Profile badge and focus panel
    layout/             Frame, field background, header, footer, container
    sections/           Homepage sections
    projects/           Featured rows, archive index, case study
  config/               Site, navigation, sections, OG color mirror
  data/                 Projects, experience, skills, social
  lib/                  Filtering, sorting, validation
  types/                Shared TypeScript models
public/projects/        Screenshots keyed by project slug
```

## Content flow

1. Edit objects in `src/data` or `src/config`.
2. `src/lib/projects.ts` and `src/lib/experience.ts` validate required fields at import time and throw a clear error on duplicates or missing slugs.
3. Homepage sections read filtered lists (`getFeaturedProjects`, `getVisibleExperience`, …).
4. `/projects/[slug]` resolves a visible project by slug. Hidden projects 404.

Components should not contain names, bios, or project copy.

## Design tokens

`:root` in `src/app/globals.css` is the source of truth for color, type, space, radius, motion, and containers. Tailwind maps those variables in `@theme inline`, so utilities such as `text-accent` and `bg-background` stay semantic.

`src/config/theme.ts` duplicates the palette only for `ImageResponse` assets (Open Graph, Apple icon).

The visual identity is a dark technical workspace: a field-line atmosphere, a compact identity badge, conversational hero type, and `#4BD183` as a 15% signal (indexes, active nav, links, outlines). Surfaces sit in three layers — page, panel, elevated — with a small radius scale.

## Project rendering

- **Featured:** editorial rows on the homepage. Layout alternates by index (image end, image start, stacked) using container queries so split-screen widths reflow from available width, not only viewport breakpoints.
- **Archive:** a document register, not a card grid. The homepage shows a preview; `/projects` lists every visible project.
- **Covers:** `coverImage` uses `next/image`. If it is omitted, `SchematicCover` draws a deterministic diagram from the slug.

## Dynamic routes

`src/app/projects/[slug]/page.tsx` uses `generateStaticParams` from visible projects and `dynamicParams = false`. URLs are slug-based (`/projects/example-systems-workspace`) so order changes do not break links.

Each case study renders optional blocks (problem, solution, architecture, decisions, challenges, technologies, figures, lessons) only when content exists.

## Section configuration

`src/config/sections.ts` is a flat list of `{ id, enabled, order }`. `src/app/page.tsx` maps ids to section components and skips anything disabled. Navigation is separate so a hidden section can also be removed from `src/config/navigation.ts`.

## Other decisions

- **No UI kit.** Custom CSS keeps the identity specific and the dependency surface small.
- **Almost no client JavaScript.** `Header` is a client component so it can track the active section. Everything else on the happy path is a Server Component. `error.tsx` is the other client exception.
- **Dark theme only.** Tokens are named so a second theme could be added later without rewriting components.
- **Capability-based CSS.** Hover motion is gated by `(hover: hover) and (pointer: fine)`. `prefers-reduced-motion` disables transitions. Touch targets stay at least 44px.
- **Validation without Zod.** A small assert in `lib` is enough: malformed data should fail loudly for the developer, not silently in the UI.
