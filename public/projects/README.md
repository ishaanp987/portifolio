# Project media

Put screenshots and diagrams in a folder named after the project slug:

```text
public/projects/<project-slug>/
  cover.webp
  desktop-01.webp
  mobile-01.webp
```

Then point `coverImage` and `images` in `src/data/projects.ts` at those files.

Recommended:

- WebP or AVIF for photographs and UI captures
- SVG for diagrams
- Descriptive `alt` text on every image

Projects with no `coverImage` render a labeled media slot that names this path, so missing screenshots never look like finished artwork.
