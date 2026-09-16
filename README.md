# Portfolio

Personal portfolio for **Ishaan Patel** — an engineering workstation turned into a dark, documentation-inspired site for software, robotics, AI, and product work.

The public copy currently includes **placeholder content** on purpose. Edit the files below; you should not need to hunt through React components to change personal information.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS with semantic design tokens
- Server Components by default

## Run locally

```bash
npm install
npm run dev
```

The app runs at [http://localhost:43211](http://localhost:43211).

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to your production origin before deploying. It is used for canonical URLs, Open Graph, sitemap, and robots.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

If it is unset, the site falls back to `site.url` in `src/config/site.ts`.

## Editing Portfolio Content

### Personal information

All of this lives in [`src/config/site.ts`](src/config/site.ts).

| You want to change                          | Field                                                        |
| ------------------------------------------- | ------------------------------------------------------------ |
| Name                                        | `name`, plus `firstName` / `lastName` for the stacked hero   |
| Initials / brand mark                       | `initials` (renders as `IP / 26`)                            |
| Headline                                    | `headline`                                                   |
| Short supporting sentence / SEO description | `description`                                                |
| Discipline stack in the hero                | `disciplines`                                                |
| Systems board node labels                   | `focusAreas`                                                 |
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

Empty strings hide the related action. Example: an empty `resume` removes the Résumé link from navigation. Social links are derived from this file in [`src/data/social.ts`](src/data/social.ts).

### Projects

Projects are defined in [`src/data/projects.ts`](src/data/projects.ts). Adding one object there updates the homepage, archive, case study route, sitemap, and Open Graph image.

- **Add a project:** append an object with at least `title`, `slug`, and `description`. Use a stable kebab-case slug; the URL will be `/projects/your-slug`.
- **Remove a project:** delete the object, or set `hidden: true` if you want to keep the draft in the repo.
- **Hide a project:** `hidden: true`. Hidden projects are omitted from the homepage, `/projects`, sitemap, and public routes.
- **Reorder projects:** set `order` (lower appears first). `priority` is used if `order` is missing.
- **Feature / unfeature:** `featured: true` places it in the editorial homepage set. Unfeatured visible projects appear in the archive index.
- **Add a case study:** fill optional fields such as `problem`, `solution`, `architecture`, `technicalDecisions`, `challenges`, `learnings`, `role`, `images`, `github`, and `demo`. Missing fields are not rendered.
- **Change screenshots:** see [Media](#media).

`featured` should stay a short list (about 3–5). Everything else belongs in the archive.

### Experience

Edit [`src/data/experience.ts`](src/data/experience.ts).

- **Add experience:** append an object with `id`, `organization`, `role`, and `startDate`.
- **Remove experience:** delete the object or set `hidden: true`.
- Dates accept `YYYY`, `YYYY-MM`, or `present`.

### Skills

Edit [`src/data/skills.ts`](src/data/skills.ts).

- **Add a skill:** push a string onto a category `items` array.
- **Remove a skill:** delete that string.
- **Create a category:** add `{ id, label, items }`.
- Do not add percentages. Projects should demonstrate proficiency.

### Homepage

Edit [`src/config/sections.ts`](src/config/sections.ts).

- **Hide a section:** `enabled: false`
- **Enable a section:** `enabled: true`
- **Reorder sections:** change `order` (hero should remain first)

Navigation labels and hashes live in [`src/config/navigation.ts`](src/config/navigation.ts). Keep those `href` values in sync with section ids (`/#projects`, `/#experience`, and so on).

### Design

Live site tokens are in [`src/app/globals.css`](src/app/globals.css) under `:root`.

- **Olive accent:** change `--accent`, then `--accent-muted`, `--accent-hover`, `--accent-border` if contrast needs a tweak. Olive is a signal (rail, indexes, active nav, rules), not a wash.
- **Other colors:** `--background`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, and the surface tokens.
- **Typography:** `--text-hero`, `--text-display`, `--text-project`, `--text-page`, `--text-body`, `--text-meta`, plus Geist and IBM Plex Mono in [`src/app/layout.tsx`](src/app/layout.tsx).
- **Spacing / layout:** `--space-gutter`, `--space-section`, `--container-main`, `--container-wide`.

Open Graph images and the Apple icon cannot read CSS variables. After changing the palette, update the matching values in [`src/config/theme.ts`](src/config/theme.ts).

### Media

1. Create `public/projects/<slug>/`.
2. Add files such as `cover.webp`, `desktop-01.webp`, `mobile-01.webp`.
3. Set `coverImage` and `images` on the project object. Include `alt` text.

Replacing a file with the same name does not require component changes. Projects without screenshots use a generated schematic cover so the layout never shows a broken image.

See [`public/projects/README.md`](public/projects/README.md).

## Quality checks

GitHub Actions runs typecheck, lint, and a production build on `main` and pull requests ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).
