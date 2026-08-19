// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeBasePaths } from './src/lib/rehype-base-paths.mjs';

const base = '/';
const legacyRedirectPaths = loadLegacyRedirectPaths();

function loadLegacyRedirectPaths() {
  const redirects = JSON.parse(readFileSync(new URL('./src/legacy-redirects.json', import.meta.url), 'utf8'));
  return new Set(Object.keys(redirects).map((source) => new URL(source).pathname.replace(/^\/+|\/+$/g, '')));
}

/** @param {string} page */
function sitemapFilter(page) {
  const pathname = new URL(page).pathname;
  const withoutBase = base && pathname.startsWith(`${base}/`)
    ? pathname.slice(base.length + 1)
    : pathname.replace(/^\/+/, '');
  return !legacyRedirectPaths.has(withoutBase.replace(/\/+$/g, ''));
}

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.esciencecenter.nl',
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
