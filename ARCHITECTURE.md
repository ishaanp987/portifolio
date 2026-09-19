# Architecture

This is a content-driven portfolio. Personal data lives in typed files; components render those files. Six months from now, change `src/config/site.ts` and `src/data/*.ts` first.

## Directory structure

```text
src/
  app/                  Routes, metadata, sitemap, robots, Open Graph
  components/
    ui/                 Links, labels, meta lists
    media/              Hero still and quiet frames for project covers without screenshots
    motion/             IntersectionObserver section reveals
    layout/             Frame, header, footer, container
    sections/           Homepage sections
    projects/           Featured bands, archive index, case study
  config/               Site, navigation, sections, OG color mirror
  data/                 Projects, experience, skills, social
  lib/                  Filtering, sorting, validation, placeholder detection
  types/                Shared TypeScript models
public/projects/        Screenshots keyed by project slug
```

## Content flow

1. Edit objects in `src/data` or `src/config`.
2. `src/lib/projects.ts` and `src/lib/experience.ts` validate required fields at import time and throw a clear error on duplicates or missing slugs.
3. `src/lib/content.ts` decides which emails, URLs, and facts are real versus placeholder.
4. Homepage sections read filtered lists (`getHomepageFeatured`, `getVisibleExperience`, …).
5. `/projects/[slug]` resolves a visible project by slug. Hidden and sample projects 404.

Components should not contain names, bios, or project copy.

The public UI omits unpublished projects (`published !== true`), template experience, placeholder skills, unused contact methods, and empty sections.

## Design tokens

`:root` in `src/app/globals.css` is the source of truth for color, type, space, radius, motion, and containers. Tailwind maps those variables in `@theme inline`, so utilities such as `text-accent` and `bg-background` stay semantic.

`src/config/theme.ts` duplicates the palette only for `ImageResponse` assets (Open Graph, Apple icon).

The visual identity is a personal engineering portfolio: compact top navigation, a two-column name-led hero with a single media frame, a methods index, a dark-green About band, and `#5AD68C` as a signal rather than a theme.

## Project rendering

- **Featured:** at most three editorial bands on the homepage. Layout alternates by index (media end, media start, media top).
- **Archive:** a document register, not a card grid. The homepage shows a preview; `/projects` lists every visible project, or redirects home if none are published.
- **Covers:** `coverImage` uses `next/image`. If it is omitted, `QuietFrame` renders a restrained empty surface.

## Dynamic routes

`src/app/projects/[slug]/page.tsx` uses `generateStaticParams` from visible projects and `dynamicParams = false`. URLs are slug-based (`/projects/your-slug`) so order changes do not break links.

Each case study renders optional blocks (problem, solution, architecture, decisions, challenges, contribution, technologies, figures, lessons) only when real content exists.

## Section configuration

`src/config/sections.ts` is a flat list of `{ id, enabled, order }`. `src/app/page.tsx` maps ids to section components and skips anything disabled or empty. Navigation is filtered in `src/lib/navigation.ts` so Projects, Experience, and Contact disappear when they have nothing useful to open.

## Other decisions

- **No UI kit.** Custom CSS keeps the identity specific. Lucide is the only icon dependency.
- **Almost no client JavaScript.** `Header` and `Reveal` are the client components on the happy path. Everything else is a Server Component. `error.tsx` is the other client exception.
- **Dark throughout.** Surface depth comes from `#090C0A` / `#101511` / `#151B16`, borders, and type — not a paper inversion.
- **Capability-based CSS.** Hover motion is gated by `(hover: hover) and (pointer: fine)`. `prefers-reduced-motion` disables transforms, stagger, and smooth scrolling. Touch targets stay at least 44px.
- **Validation without Zod.** A small assert in `lib` is enough: malformed data should fail loudly for the developer, not silently in the UI.
