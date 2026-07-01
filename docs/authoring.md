# Authoring and image workflow

This blog is an Astro site backed by Markdown. The goal is to keep the reading experience Medium-like while making the archive durable, searchable, and reusable.

## Add or edit a post

Posts live in:

```txt
content/posts/
```

Each post is an `index.md` file inside its own dated folder:

```txt
content/posts/2026-06-10 - my-post-title/
  index.md
  figure-1.webp
```

The `index.md` file contains frontmatter:

```md
---
title: My post title
date: 2026-06-10
author: Jane Doe
tags:
  - research software
  - reproducibility
published: true
# Optional: pin this post to the homepage featured slot.
featured: true
---

Post body here.
```

Set `featured: true` only when a post should appear in the homepage featured slot. If multiple listed posts are marked, the newest by filename date wins. If no listed post is marked, the newest listed post is featured automatically.

## Add images

Store images next to the post `index.md` and reference them with relative paths:

```md
![Short descriptive alt text](./my-image.webp)
```

Do **not** use bare relative paths such as `assets/my-image.webp`; use `./my-image.webp` for colocated assets.

## Recommended image rules

- Prefer `.webp` or optimized `.jpg` for photos.
- Prefer `.png` only for screenshots/diagrams that need crisp edges.
- Use descriptive alt text unless the image is purely decorative.
- Keep images under ~1 MB when possible.
- Store durable images in the repo, not as pasted GitHub issue assets.

GitHub paste is convenient for comments, but not ideal for this blog: it usually creates externally hosted GitHub asset URLs instead of clean repository-owned assets.

## Quality check

Run this before publishing larger edits:

```bash
bun run check:content
```

The check flags:

- missing required frontmatter;
- Markdown images without alt text;
- `/assets/...` image references whose files do not exist;
- `./...` image references whose colocated files do not exist;
- bare relative `assets/...` image paths.

## Why this is better than Medium for contributors

Medium is still easier for casual writing, but this workflow gives us:

- reviewable pull requests;
- version history and rollback;
- local assets owned by the archive;
- topic pages and author pages generated from metadata;
- reusable JSON archive data;
- future room for richer demos, CI checks, and semantic search.
