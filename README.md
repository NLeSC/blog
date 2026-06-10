# eScience Center Blog

The Netherlands eScience Center blog — 275 articles on research software engineering, data science, digital scholarship, and open science. Originally hosted on [Medium](https://blog.esciencecenter.nl), now a standalone Astro site.

**Live:** [nlesc-blogging.github.io/blog](https://nlesc-blogging.github.io/blog)

---

## Implemented features

- Astro static site generated from markdown posts.
- Medium-style homepage with featured article, image cards, and full archive feed.
- Responsive article pages with wide images, captions, reading time, tags, and source links.
- Author archive pages with bios, profile photos, and post lists.
- Topic/tag archive pages plus homepage topic discovery.
- Client-side search across posts.
- RSS feed and JSON endpoints for posts, authors, and topics.
- Dark mode support.
- GitHub Pages deployment via Actions.

---

## Adding a new post

### 1. Create the markdown file

Drop a `.md` file into `src/content/posts/`. Name it like this:

```
YYYY-MM-DD - author-slug - post-slug.md
```

Example: `2026-06-10 - jesse-gonzalez - why-we-build-tools.md`

### 2. Frontmatter (required)

```yaml
---
title: "Why We Build Tools"
date: 2026-06-10
author: Jesse Gonzalez
tags:
  - RSE
  - Tools
  - Open Source
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Wrap in quotes if it contains special characters |
| `date` | yes | `YYYY-MM-DD` format |
| `author` | yes | Full name as you want it displayed |
| `tags` | no | List of keywords. Defaults to `["uncategorized"]` if omitted |
| `source` | no | `"medium"` (default) or omit for original posts |
| `source_url` | no | Link to original if cross-posted |
| `published` | no | `false` to hide from the site. Defaults to `true` |

### 3. Body content

Write standard markdown. Images go in `public/assets/` and are referenced as:

```markdown
![Alt text](/assets/my-image.png)
```

No HTML in body content — markdown only.

### 4. Rebuild

The site rebuilds automatically on push to `main`. To preview locally: `bun run dev` → [localhost:4321](http://localhost:4321).

---

## Content rules

1. **One post per file.** No multi-post markdown files.
2. **Images in `/assets/`.** Don't hotlink external images — download them and commit to `public/assets/`. Use descriptive filenames: `why-we-build-tools-diagram.png` not `IMG_4829.jpg`.
3. **No HTML in body.** Markdown only. Astro renders it safely.
4. **Frontmatter before body.** The `---` block must be the first thing in the file.
5. **File naming convention.** `YYYY-MM-DD - author-slug - post-slug.md`. The date in the filename must match the `date` field in frontmatter.
6. **Alt text on every image.** Accessibility matters: `![Diagram showing the RSE role spectrum](/assets/rse-spectrum.png)`.
7. **Editing existing posts.** Edit the `.md` file directly. Rebuild and the changes go live.
8. **Deleting a post.** Remove the file, or set `published: false` to hide without deleting.
9. **Author pages.** Author pages are auto-generated from the `author` field. Use consistent author names across posts (e.g. always "Jesse Gonzalez", never mix "Jesse Gonzalez" and "J. Gonzalez").
10. **Tags are freeform.** No controlled vocabulary — but prefer existing tags for discoverability. Check `/search` to see what's already in use.

---

## Project structure

```
src/
├── content/posts/    ← All blog posts (markdown + frontmatter)
├── pages/            ← Route pages (index, posts/[slug], authors/[slug], search)
├── layouts/          ← Base layout (header, footer, OG metadata)
├── styles/           ← Global CSS (Tailwind + post-content typography)
└── content.config.ts ← Post schema (Zod types)
public/
├── assets/           ← Post images
├── header-banner.webp
└── favicon.svg
```

---

## Tech stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [Bun](https://bun.sh) — package manager and runtime
- GitHub Pages — hosting (via Actions)

See [DEV.md](DEV.md) for local setup and development.
