# AGENTS.md

## Project

- Repository: `https://github.com/NLeSC/blog`
- Live site: `https://blog2.esciencecenter.nl/`
- Purpose: Netherlands eScience Center blog and institutional archive, migrated from Medium.
- Default branch: `main`
- Release work is tracked in the GitHub `Release` milestone.

This is a static Astro site. Posts are Markdown stored in Git, while Astro builds the homepage, post pages, author and topic archives, search, feeds, APIs, redirects, and social metadata.

## Stack

- Astro 7 with strict TypeScript
- Bun for dependency management and scripts
- Tailwind CSS 4
- Astro Content Collections with Zod frontmatter validation
- Pagefind for client-side search
- Markdown extensions for KaTeX math and Mermaid diagrams
- GitHub Actions and GitHub Pages for deployment

Node.js must be at least 22.12. Use Bun for project commands and do not add another package manager lockfile.

## Repository Layout

- `content/posts/`: Markdown posts and co-located post assets
- `src/content.config.ts`: post collection and frontmatter schema
- `src/pages/`: Astro routes and generated endpoints
- `src/layouts/`: shared page layouts
- `src/lib/`: archive, URL, author, Markdown, and metadata helpers
- `src/styles/`: global styles and post typography
- `public/`: site-wide static assets
- `scripts/check-content.mjs`: content validation
- `scripts/new-post.mjs`: post creation helper
- `scripts/migrate-post-assets.mjs`: asset migration helper
- `.github/workflows/deploy.yml`: GitHub Pages deployment
- `README.md`: authoring and content rules
- `DEV.md`: local development details

## Commands

```sh
bun install
bun run dev
bun run check:content
bun run astro check
bun run build
bun run preview
```

Use `bun run new-post "Title" --author "Full Name" --tags "Tag One,Tag Two"` to create a post.

## Working Rules

- Make the smallest change that solves the issue; reuse existing helpers and patterns.
- Preserve the established Astro and Tailwind implementation unless a task explicitly calls for a redesign.
- Keep the site static. Do not introduce server-only behavior without a hosting decision because GitHub Pages cannot run it.
- The deployed site uses the root path. Generate internal links and asset URLs with existing URL helpers rather than hard-coding deployment assumptions.
- Keep dependencies minimal. Prefer Astro, browser, and Node/Bun capabilities already present.
- Do not edit generated directories: `dist/`, `.astro/`, or `node_modules/`.
- Do not rewrite migrated prose merely for style. Content corrections should be traceable to the original source or explicit editorial direction.
- Do not remove legacy URL behavior without checking Medium source URLs and redirects.
- Preserve accessibility basics: semantic HTML, keyboard behavior, visible focus, useful image alt text, and captions separate from alt text.
- Keep responsive behavior working on mobile and desktop.

## Content Conventions

- Follow `README.md` for the full authoring contract.
- Post paths use `content/posts/YYYY-MM-DD - post-slug.md` or a directory containing `index.md` and its assets.
- Author names belong in frontmatter, not filenames.
- New posts should start unpublished for review unless explicitly requested otherwise.
- `published: false` hides a post completely.
- `unlisted: true` keeps a direct URL but excludes the post from listings, feeds, APIs, topics, authors, and search.
- `featured: true` makes a listed post eligible for the homepage feature; the newest featured post wins.
- Prefer co-located assets referenced relatively from a post. Existing shared assets in `public/assets/` may remain there.
- Every meaningful image needs useful alt text. Use `<figure>` and `<figcaption>` when a visible caption is required.
- Preserve valid Markdown constructs, code fences, math, Mermaid, raw editorial HTML, and supported embeds.

## Validation

For content-only changes, run:

```sh
bun run check:content
bun run build
```

For application or configuration changes, also run:

```sh
bun run astro check
```

Treat content-check errors and build failures as blockers. Existing warnings should not increase without a documented reason. For visual or interaction changes, verify the built page in a real browser at mobile and desktop widths.

## Deployment And Release

Pushes to `main` deploy through `.github/workflows/deploy.yml` to GitHub Pages. Do not trigger migration-day operations automatically: repository transfer, DNS changes, production-domain changes, and analytics verification require explicit authorization. Keep repository and production URL constants easy to update if the repository moves again.

When working on an issue, read the complete issue and discussion first. Check for an existing pull request before implementing overlapping work, and reference the issue in the resulting pull request.
