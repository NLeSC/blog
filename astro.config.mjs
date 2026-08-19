// @ts-check
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeBasePaths } from './src/lib/rehype-base-paths.mjs';

const base = '/blog';
const legacyRedirectPaths = loadLegacyRedirectPaths();

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function loadLegacyRedirectPaths() {
  const postsDir = join(process.cwd(), 'src/content/posts');
  if (!existsSync(postsDir)) return new Set();

  const paths = new Set();
  for (const file of walk(postsDir).filter((path) => path.endsWith('.md'))) {
    const text = readFileSync(file, 'utf8');
    const sourceUrlMatch = text.match(/^source_url:\s*(.+)$/m);
    if (!sourceUrlMatch) continue;

    try {
      const sourceUrl = sourceUrlMatch[1].trim().replace(/^["']|["']$/g, '');
      const legacyPath = new URL(sourceUrl).pathname.replace(/^\/+|\/+$/g, '');
      if (legacyPath) paths.add(legacyPath);
    } catch {
      // Invalid source URLs are reported by npm run check:content.
    }
  }
  return paths;
}

function sitemapFilter(page) {
  const pathname = new URL(page).pathname;
  const withoutBase = base && pathname.startsWith(`${base}/`)
    ? pathname.slice(base.length + 1)
    : pathname.replace(/^\/+/, '');
  return !legacyRedirectPaths.has(withoutBase.replace(/\/+$/g, ''));
}

// https://astro.build/config
export default defineConfig({
  site: 'https://nlesc.github.io',
  base,
  integrations: [sitemap({ filter: sitemapFilter })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, [rehypeBasePaths, { base }]],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  server: {
    allowedHosts: ['macbook-air-3.tail33436f.ts.net', '.tail33436f.ts.net'],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
