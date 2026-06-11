// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeBasePaths } from './src/lib/rehype-base-paths.mjs';

const base = '/blog';

// https://astro.build/config
export default defineConfig({
  site: 'https://nlesc-blogging.github.io',
  base,
  integrations: [sitemap()],
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
