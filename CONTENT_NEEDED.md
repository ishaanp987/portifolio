# Content still needed

This file is for Ishaan (and future editors). Nothing here is rendered on the public site.

Fill values in `src/config/site.ts` and `src/data/*.ts`. Empty strings, `your-username`, `example.com`, and “Replace this…” copy are detected and hidden automatically.

## Required for a complete public site

| Field                            | File                       | What it unlocks                               |
| -------------------------------- | -------------------------- | --------------------------------------------- |
| `email`                          | `src/config/site.ts`       | Contact section, mailto button, nav Contact   |
| `github`                         | `src/config/site.ts`       | GitHub link in Contact / footer / utility nav |
| `linkedin`                       | `src/config/site.ts`       | LinkedIn link                                 |
| `resume`                         | `src/config/site.ts`       | Résumé link (URL or `/resume.pdf`)            |
| `location`                       | `src/config/site.ts`       | Location fact in hero / About                 |
| `availability`                   | `src/config/site.ts`       | Status line                                   |
| `heroImage` + `heroImageAlt`     | `src/config/site.ts`       | Photograph on the right side of the hero      |
| `avatar`                         | `src/config/site.ts`       | Portrait fallback for hero / About            |
| `currentlyBuilding`              | `src/config/site.ts`       | Optional “currently building” strip           |
| `url` or `NEXT_PUBLIC_SITE_URL`  | `src/config/site.ts` / env | Canonical URLs and Open Graph                 |
| A project with `published: true` | `src/data/projects.ts`     | Projects nav, featured work, `/projects`      |
| Real experience rows             | `src/data/experience.ts`   | Experience section and nav                    |

## Publishing a project

In `src/data/projects.ts`, add an object with at least `title`, `slug`, `description`, and:

```ts
published: true,
featured: true,
```

Then add screenshots under `public/projects/<slug>/` and set `coverImage`. Do not set `published: true` on example entries.

## About copy

Biography paragraphs live in `site.about`. If that array is empty (or only placeholder copy), About is removed from the page and from navigation.

## Images

Until a real portrait exists, the hero uses an IP brand plate in the same frame. Set `heroImage` to a public path such as `/media/portrait.webp` to replace it. Do not ship visitor-facing “image coming soon” copy.
