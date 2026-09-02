# Developers' readme

## Commands

| Command | What it does |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run build` | Build static site to `dist/` |
| `bun run new-post` | See [below](#adding-a-new-post) |
| `bun run preview` | Preview the production build locally |
| `bun run astro check` | Type-check `.astro` files |

## Project overview

```
.
├── content/posts/         ← Post directories with index.md and local assets
├── src/
│   ├── pages/             ← Astro route pages
│   │   ├── index.astro    ← Homepage (hero + feed)
│   │   ├── posts/[slug]/  ← Single post template
│   │   ├── authors/[slug]/← Author archive pages
│   │   └── search.astro   ← Full-text search (Pagefind)
│   ├── layouts/           ← BaseLayout (HTML shell, header, footer)
│   ├── styles/            ← global.css (Tailwind + post typography)
│   └── content.config.ts  ← Zod schema for post frontmatter
├── public/
│   ├── assets/            ← Shared site assets
│   ├── header-banner.webp
│   └── favicon.svg
└── .github/workflows/
    └── deploy.yml         ← GitHub Pages deploy action
```

## Tech stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [Bun](https://bun.sh) — package manager and runtime
- GitHub Pages — hosting (via Actions)

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
- Rich technical writing support in post bodies:
  - standard markdown: headings, links, blockquotes, lists, tables, code blocks, and inline code;
  - images kept alongside the Markdown for each post;
  - raw HTML for editorial affordances such as `<details>` / `<summary>`;
  - iframe embeds for videos and interactive content, including YouTube and Observable-style embeds;
  - math notation via inline and block LaTeX;
  - Mermaid diagrams from fenced `mermaid` code blocks.
- Unlisted direct-link posts for integration/showcase pages that build but stay out of public listings, RSS, APIs, topics, authors, and search.

## Building for production

```sh
bun run build     # outputs to dist/
bun run preview   # serves dist/ at localhost:4321
```

The build generates:
- Static post, homepage, search, author, topic, feed, and redirect pages
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

## Legacy Medium stuff
In order to make our blog backwards compatible with our previous Medium one, we had to implement a couple of tweaks.

### Duplicated RSS feed
The rss feed has copies in two places, namely:

```sh
{home}/rss.xml # The standard, recommended place for an RSS feed
{home}/feed    # So our Medium subscribers don't need to re-subscribe
```

### Content redirects
`src/legacy-redirects.json` is the DNS-cutover map from `blog.esciencecenter.nl` to Astro routes. It includes post URLs, Medium aliases, tag archives, `/about`, and `/archive`.

Refresh it against Medium's sitemap before cutover:

```sh
node scripts/generate-legacy-redirect-map.mjs
bun run check:content
bun run build
```

## Troubleshooting

### `bun: command not found`
Bun isn't on your PATH. Use the full path: `~/.bun/bin/bun`, or add `~/.bun/bin` to your PATH.

### Dev server crashes after editing a post
The content loader reloads all posts on any file change in `content/posts/`. Give it a moment — it usually recovers. If it doesn't, restart with `bun run dev`.

### Images not showing in dev
Keep post images beside that post's `index.md` and use a relative path such as `./filename.png`. Reserve `public/assets/` for shared site assets.

### Build fails with out-of-memory
If a build runs out of memory, increase Node's memory limit:
```sh
NODE_OPTIONS="--max-old-space-size=4096" bun run build
```
