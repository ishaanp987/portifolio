# Portfolio

Personal portfolio for **Ishaan Patel** — an editorial engineering site for software, robotics, AI, physical systems, and product work.

The visual system is near-black, cool gray, off-white, and a single mint accent (`#58D68D`). Type is IBM Plex Sans for interface copy and IBM Plex Mono for indexes, dates, and specifications.

Personal information lives in typed files. Optional fields, placeholder values, and example projects are hidden from the production site. Developer guidance is limited to development builds.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS with semantic design tokens
- Server Components by default
- Lucide for interface icons

## Run locally

```bash
npm install
npm run dev
```

The app runs at [http://localhost:43211](http://localhost:43211).

```bash
npm run typecheck
npm run lint
npm run format
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to your production origin before deploying. It is used for canonical URLs, Open Graph, sitemap, and robots.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

If it is unset, the site uses `VERCEL_URL` when present, then a real `site.url`, then `http://localhost:43211`. Placeholder domains are never used as the public origin.

## Editing portfolio content

### Personal information

All of this lives in [`src/config/site.ts`](src/config/site.ts).

| You want to change                          | Field                                                        |
| ------------------------------------------- | ------------------------------------------------------------ |
| Name                                        | `name`, plus `firstName` / `lastName`                        |
| Initials used in generated icons            | `initials`                                                   |
| Role line                                   | `role`                                                       |
| Hero statement lines                        | `statement`                                                  |
| Accented phrase inside the statement        | `highlight`                                                  |
| Headline                                    | `headline`                                                   |
| Short supporting sentence / SEO description | `description`                                                |
| Focus labels in the hero                    | `focusAreas`                                                 |
| Hero photograph or still                    | `heroImage`, `heroImageAlt`                                  |
| Optional portrait fallback                  | `avatar`                                                     |
| Bio / about paragraphs                      | `bio` and `about`                                            |
| Contact headline and CTA                    | `contactHeading`, `contactCta`                               |
| Email                                       | `email`                                                      |
| Location                                    | `location`                                                   |
| GitHub                                      | `github`                                                     |
| LinkedIn                                    | `linkedin`                                                   |
| Résumé                                      | `resume` (leave empty until you have a URL or `/resume.pdf`) |
| Availability                                | `availability`                                               |
| Focus line used in generated assets         | `focus`                                                      |
| Canonical site URL                          | `url` (or `NEXT_PUBLIC_SITE_URL`)                            |

Empty strings and detected placeholders hide the related row, button, or metadata. Example: a GitHub URL that still contains `your-username` does not appear in navigation. In development, a small note lists fields that are still empty. Production never shows that note.

Social links are derived from this file in [`src/data/social.ts`](src/data/social.ts), filtered through [`src/lib/content.ts`](src/lib/content.ts).

### Projects

Projects are defined in [`src/data/projects.ts`](src/data/projects.ts). Adding one object there updates the homepage, archive, case study route, sitemap, and Open Graph image.

- **Add a project:** append an object with at least `title`, `slug`, and `description`. Use a stable kebab-case slug; the URL will be `/projects/your-slug`.
- **Remove a project:** delete the object, or set `hidden: true` if you want to keep the draft in the repo.
- **Hide a project:** `hidden: true`. Hidden projects are omitted from the homepage, `/projects`, sitemap, and public routes.
- **Mark a sample:** `sample: true` (or a title/slug starting with `example`). Sample entries are visible in development so layouts can be checked, and they are omitted from production.
- **Reorder projects:** set `order` (lower appears first). `priority` is used if `order` is missing.
- **Feature / unfeature:** `featured: true` is the candidate pool. The homepage shows at most three (`HOMEPAGE_FEATURED_LIMIT` in [`src/lib/projects.ts`](src/lib/projects.ts)). Additional featured items fall into the archive.
- **Add a case study:** fill optional fields such as `problem`, `solution`, `architecture`, `technicalDecisions`, `challenges`, `learnings`, `role`, `images`, `github`, and `demo`. Missing or placeholder fields are not rendered.
- **Change screenshots:** see [Media](#media).

### Experience

Edit [`src/data/experience.ts`](src/data/experience.ts).

- **Add experience:** append an object with `id`, `organization`, `role`, and `startDate`.
- **Remove experience:** delete the object or set `hidden: true`.
- **Samples:** template organizations are omitted from production.
- Dates accept `YYYY`, `YYYY-MM`, or `present`.

### Skills

Edit [`src/data/skills.ts`](src/data/skills.ts).

- **Add a skill:** push a string onto a category `items` array.
- **Remove a skill:** delete that string.
- **Create a category:** add `{ id, label, items }`.
- Do not add percentages. Projects should demonstrate proficiency.
- Copy that starts with “Replace with…” is omitted, and empty categories are not rendered.

### Homepage

Edit [`src/config/sections.ts`](src/config/sections.ts).

- **Hide a section:** `enabled: false`
- **Enable a section:** `enabled: true`
- **Reorder sections:** change `order` (hero should remain first)

Empty sections also hide themselves. Navigation labels and hashes live in [`src/config/navigation.ts`](src/config/navigation.ts). Keep those `href` values in sync with section ids (`/#projects`, `/#experience`, and so on). Résumé / GitHub appear only when the URL is real.

### Design

Live site tokens are in [`src/app/globals.css`](src/app/globals.css) under `:root`. Mirror the palette in [`src/config/theme.ts`](src/config/theme.ts) after changing colors (Open Graph images cannot read CSS variables).

- **Accent:** `--accent` is `#58D68D`. Use it for active navigation, important words, markers, primary buttons, timeline pips, and focus.
- **Surfaces:** near-black `--background` (`#0B0D0C`), raised `--surface` (`#131713`), cool paper `--paper` (`#F1F2ED`) for About.
- **Type:** IBM Plex Sans for headings, navigation, and body; IBM Plex Mono for project numbers, dates, and specifications. Letter-spacing stays at `0`. Type sizes are discrete rem values, not viewport-scaled.
- **Shape / space:** sharp media frames, pill buttons, `--space-gutter`, `--space-section`, `--container-wide`.

### Media

1. Create `public/projects/<slug>/`.
2. Add files such as `cover.webp`, `desktop-01.webp`, `mobile-01.webp`.
3. Set `coverImage` and `images` on the project object. Include `alt` text.

Replacing a file with the same name does not require component changes. Projects without screenshots render a quiet neutral frame — never a public “asset needed” instruction.

Hero still: set `heroImage` (preferred) or `avatar` in `src/config/site.ts`. If both are empty, the hero uses a typographic identity panel built from real site facts.

See [`public/projects/README.md`](public/projects/README.md).

## Quality checks

GitHub Actions runs typecheck, lint, and a production build on `main` and pull requests ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).
