# eScience Center Blog

The Netherlands eScience Center blog — articles on research software engineering, data science, digital scholarship, and open science. Originally hosted on [Medium](https://medium.com/@eScienceCenter), now a standalone Astro site.

**Live:** [blog.esciencecenter.nl](https://blog.esciencecenter.nl)

# How to use me

<details><summary>Installation (click to expand)</summary>

## Prerequisites

- **[Bun](https://bun.sh)** ≥ 1.2 — runtime, package manager, and bundler
- **Git** — version control
- **Node.js** ≥ 22.12 (Bun handles this, but some tooling may need it)

### macOS
```sh
curl -fsSL https://bun.sh/install | bash
```

### Linux
```sh
curl -fsSL https://bun.sh/install | bash
```

## Quick start

```sh
# Clone
git clone git@github.com:NLeSC/blog.git
cd blog

# Install
bun install
```
</details>

## Run daemon
```sh
# Dev server (hot reload)
bun run dev
```

Open [localhost:4321](http://localhost:4321). Changes to `.astro`, `.md`, and `.css` files reload instantly.

## Commands

| Command | What it does |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run build` | Build static site to `dist/` |
| `bun run new-post` | See [below](#adding-a-new-post) |
| `bun run preview` | Preview the production build locally |
| `bun run astro check` | Type-check `.astro` files |

# For authors

Below we show our **recommended** way of working. If you don't feel comfortable with it, you can always reach out to editors@esciencecenter.nl, and we'll assist you in the process.

## Adding a new post

### 0. Fork this repository
You'll need to work within your own branch.

### 1. Create the post directory

Use the helper command so directory names only encode the date and title; author names live in frontmatter where special characters are safe:

```sh
bun run new-post "Why We Build Tools" --author "Jesse Gonzalez" --tags "RSE,Tools,Open Source"
```

This creates `content/posts/YYYY-MM-DD - why-we-build-tools/index.md` with `published: false` for review. Keep post-specific assets, such as images or other files, in that same directory:

```text
content/posts/YYYY-MM-DD - why-we-build-tools/
├── index.md
├── why-we-build-tools-diagram.png
└── workflow.webp
```

`index.md` is the document where you'll write your article. By default it contains a template showcasing how to use it.

### 2. Frontmatter (required)

```yaml
---
title: "Why We Build Tools"
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
| `date` | no | Publication date comes from the `YYYY-MM-DD` directory prefix; use this only for imported metadata |
| `author` | yes | Full name as you want it displayed |
| `tags` | no | List of keywords. Defaults to `["uncategorized"]` if omitted |
| `source` | no | `"medium"` (default) or omit for original posts |
| `source_url` | no | Link to original if cross-posted |
| `published` | no | `false` to hide from the site entirely. Defaults to `true` |
| `unlisted` | no | `true` keeps the direct URL generated but excludes the post from homepage, search, feeds, APIs, topic pages, and author pages |
| `featured` | no | `true` makes the post eligible for the homepage featured slot. If multiple listed posts are featured, the newest by filename date wins. If none are featured, the newest listed post is used |

### 3. Body content

Write markdown, plus supported rich content when needed. Keep post-specific images next to the post Markdown and reference them with a relative path:

```markdown
![Alt text](./why-we-build-tools-diagram.png)
```

For images that need a visible caption, use a semantic HTML `<figure>` block. This is the preferred pattern for new posts because it keeps the alt text and the caption separate:

```html
<figure>
  <img src="./why-we-build-tools-diagram.png" alt="Short accessibility description of the image" />
  <figcaption>Caption shown under the image. Credit/source links are allowed.</figcaption>
</figure>
```

Caption rules:

- `alt` describes the image for screen readers; it is not the caption.
- `<figcaption>` is the visible editorial caption under the image.
- Keep captions short and factual, Medium-style.

- Put credits/source links in the caption when needed.
- Avoid the old export pattern where caption text is pasted as a normal paragraph directly after an image; use `<figure>` instead.

Supported body content includes:

- normal markdown paragraphs, headings, links, blockquotes, lists, tables, and code fences;
- inline code with backticks;
- syntax-highlighted code blocks with language fences, e.g. ```` ```python ````;
- inline math with `$...$` and block math with `$$...$$`;
- Mermaid diagrams with fenced `mermaid` blocks;
- raw HTML for small editorial elements such as `<details>` / `<summary>`;
- iframe embeds for videos or interactive figures, as long as the provider allows framing.

Example Mermaid diagram:

````markdown
```mermaid
graph LR
  Markdown --> Astro
  Astro --> HTML
  HTML --> Pages
```
````

Example embed:

```html
<iframe
  src="https://observablehq.com/embed/@d3/bar-chart/2?cells=chart"
  title="Observable D3 bar chart embed"
  loading="lazy">
</iframe>
```

Use the unlisted integration showcase post as a reference for supported content patterns:
[`content/posts/2026-06-11 - integration-showcase/index.md`](content/posts/2026-06-11%20-%20integration-showcase/index.md).

Contributors can also view the live showcase to see what is possible:
[https://blog.esciencecenter.nl/posts/2026-06-11---integration-showcase/](https://blog.esciencecenter.nl/posts/2026-06-11---integration-showcase/).

### 4. See the results

To preview locally: `bun run dev` → [localhost:4321](http://localhost:4321).

### 5. Create a draft pull request
This is your way of signalling us your blog is ready for review!

## Content rules

1. **One post per directory.** Put its Markdown in `index.md`.
2. **Keep post assets with the post.** Put images next to `index.md` and reference them with relative paths. Don't hotlink external images — download them and commit them with the post. Use descriptive filenames: `why-we-build-tools-diagram.png` not `IMG_4829.jpg`.
3. **HTML is allowed when it adds value.** Keep it minimal and purposeful: embeds, `<details>`, and small semantic elements are fine. Avoid large custom layouts inside posts unless there is a strong editorial reason.
4. **Frontmatter before body.** The `---` block must be the first thing in the file.
5. **Directory naming convention.** `YYYY-MM-DD - post-slug/index.md`. Publication date comes from the directory name; keep author names in metadata only.
6. **Alt text on every image.** Accessibility matters: `![Diagram showing why we build tools](./why-we-build-tools-diagram.png)`.
7. **Editing existing posts.** Edit its `index.md`. Rebuild and the changes go live.
8. **Deleting a post.** Remove its directory, or set `published: false` to hide without deleting.
9. **Author pages.** Author pages are auto-generated from the `author` field. Use consistent author names across posts (e.g. always "Jesse Gonzalez", never mix "Jesse Gonzalez" and "J. Gonzalez").
10. **Tags are freeform.** No controlled vocabulary — but prefer existing tags for discoverability. Check `/search` to see what's already in use.
11. **Embeds depend on provider policy.** Some websites block iframes with `X-Frame-Options` or `Content-Security-Policy`; test embeds locally before publishing.
12. **Use unlisted posts for smoke tests or private demos.** Set `unlisted: true` and keep `published: true` when a page should build and be reachable directly, but not appear in listings or feeds.
13. **Feature one post manually when needed.** Set `featured: true` to put a listed post in the homepage featured slot. Only the newest featured post is used.

## Need more information?
See [DEV.md](DEV.md) for more details.
