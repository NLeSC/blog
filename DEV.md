# Development

Local development setup for the eScience Center Blog.

## Prerequisites

- **[Bun](https://bun.sh)** ≥ 1.2 — runtime, package manager, and bundler
- **Git** — version control
- **Node.js** ≥ 22.12 (Bun handles this, but some tooling may need it)

macOS:
```sh
curl -fsSL https://bun.sh/install | bash
```

Linux:
```sh
curl -fsSL https://bun.sh/install | bash
```

## Quick start

```sh
# Clone
git clone git@github.com:nlesc-blogging/blog.git
cd blog

# Install
bun install

# Dev server (hot reload)
bun run dev
```

Open [localhost:4321](http://localhost:4321). Changes to `.astro`, `.md`, and `.css` files reload instantly.

## Commands

| Command | What it does |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run build` | Build static site to `dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run astro check` | Type-check `.astro` files |

## Project overview

```
.
├── src/
│   ├── pages/             ← Astro route pages
│   │   ├── index.astro    ← Homepage (hero + feed)
│   │   ├── posts/[slug]/  ← Single post template
│   │   ├── authors/[slug]/← Author archive pages
│   │   └── search.astro   ← Full-text search (Pagefind)
│   ├── layouts/           ← BaseLayout (HTML shell, header, footer)
│   ├── styles/            ← global.css (Tailwind + post typography)
│   └── content.config.ts  ← Zod schema for post frontmatter
├── content/posts/         ← Markdown posts with YAML frontmatter
├── public/
│   ├── assets/            ← Post images (committed to repo)
│   ├── header-banner.webp
│   └── favicon.svg
└── .github/workflows/
    └── deploy.yml         ← GitHub Pages deploy action
```

## Adding a new post

See [README.md](README.md) for full content guidelines. Quick version:

1. Create `content/posts/YYYY-MM-DD - author-slug - post-slug.md`
2. Add frontmatter: `title`, `date`, `author`, `tags`
3. Write body in markdown
4. Images go in `public/assets/`, referenced as `/assets/filename.png`
5. `bun run dev` to preview

## Building for production

```sh
bun run build     # outputs to dist/
bun run preview   # serves dist/ at localhost:4321
```

The build generates:
- 309 static HTML pages (253 posts + index + search + author pages + RSS)
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap-index.xml`
- Pagefind search index at `/pagefind/`

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`:
1. Builds with Bun
2. Uploads `dist/` as a Pages artifact
3. Deploys to GitHub Pages

The repo must be **public** for GitHub Pages to work on free plans.

Manual deploy (if Actions is unavailable):
```sh
bun run build
# Upload dist/ to any static host (Vercel, Netlify, S3, etc.)
```

## Styling

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- Custom theme colors in `src/styles/global.css`:
  - `--color-escience-blue`: `#003388`
  - `--color-medium-green`: `#1A8917`
  - Post content uses Source Serif 4 (body) + Inter (headings)
- Post body images expand beyond the text column on desktop (Medium-style wide images)

## Search

Powered by [Pagefind](https://pagefind.app). The search index is generated during `bun run build`. It indexes post titles, author names, and body text. The index is ~1MB and loads on demand.

## Troubleshooting

### `bun: command not found`
Bun isn't on your PATH. Use the full path: `~/.bun/bin/bun`, or add `~/.bun/bin` to your PATH.

### Dev server crashes after editing a post
The content loader reloads all 253 posts on any file change in `content/posts/`. Give it a moment — it usually recovers. If it doesn't, restart with `bun run dev`.

### Images not showing in dev
Images must be in `public/assets/` and referenced with a leading slash: `/assets/filename.png`. Relative paths like `./assets/` or `assets/` won't resolve.

### Build fails with out-of-memory
The build processes 309 pages. If you run into memory issues, increase Node's memory limit:
```sh
NODE_OPTIONS="--max-old-space-size=4096" bun run build
```
