# Why Astro instead of Medium?

The aim is not only to clone Medium's visual style. The aim is to turn the eScience Center Blog into an institution-owned research software knowledge base.

## What we gain

### Ownership

Posts live as Markdown in Git. Images live in repository-managed assets. URLs, metadata, redirects, and archive structure are under our control instead of Medium's product decisions.

### Better institutional identity

The site can keep a clean, readable publication style while clearly belonging to the Netherlands eScience Center: people, projects, topics, software, and research domains can all become first-class parts of the archive.

### Structured discovery

Medium has tags. This site can turn tags into proper topic pages, author pages, related posts, search indexes, and reusable archive data.

### Technical extensibility

Because the site is code, we can add features Medium will not realistically support:

- rich topic collections;
- author profiles with expertise maps;
- links to GitHub repositories, Zenodo DOIs, RSD entries, papers, datasets, and projects;
- custom search and faceted archive navigation;
- interactive scientific demos and visualizations;
- reproducible article pipelines from notebooks, Quarto, or generated figures;
- automated checks for links, images, metadata, and accessibility;
- JSON APIs for posts, topics, and authors;
- semantic search or RAG over the archive.

### Better performance and control

Astro outputs static HTML with minimal JavaScript. We can control page weight, metadata, accessibility, responsive images, dark mode, and browser behavior directly.

## What Medium still does better

Medium has a smoother casual editor, easy image paste, built-in discovery, and almost no maintenance burden. To make this migration work, the Astro site needs good contributor documentation, image workflows, previews, and quality checks.

## Current killer features implemented

- `/topics` and `/topics/[slug]`: topic collection pages generated from post metadata.
- Author pages now show an author's main topics and archive/search links.
- Post pages link tags to topic pages and recommend related posts by shared topics.
- `/api/posts.json`, `/api/authors.json`, and `/api/topics.json`: reusable structured archive data.
- `bun run check:content`: content/image/frontmatter quality checks.

These are examples of why this is more than a Medium clone: the archive is becoming queryable, connected, and reusable.
