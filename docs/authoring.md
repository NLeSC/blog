# Authoring and image workflow

This blog is an Astro site backed by Markdown. The goal is to keep the reading experience Medium-like while making the archive durable, searchable, and reusable.

## Add or edit a post

Posts live in:

```txt
content/posts/
```

Each post is a Markdown file with frontmatter:

```md
---
title: My post title
date: 2026-06-10
author: Jane Doe
tags:
  - research software
  - reproducibility
published: true
---

Post body here.
```

## Add images

Imported images currently live in:

```txt
public/assets/
```

Reference them from Markdown with root-absolute paths:

```md
![Short descriptive alt text](/assets/my-image.webp)
```

Do **not** use relative paths such as `assets/my-image.webp` in Markdown. Astro's content asset plugin treats those as module imports from the post directory and the build can fail.

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
- relative `assets/...` image paths that should be root-absolute.

## Why this is better than Medium for contributors

Medium is still easier for casual writing, but this workflow gives us:

- reviewable pull requests;
- version history and rollback;
- local assets owned by the archive;
- topic pages and author pages generated from metadata;
- reusable JSON archive data;
- future room for richer demos, CI checks, and semantic search.
