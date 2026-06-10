// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://macbook-air-3.tail33436f.ts.net',
  integrations: [sitemap()],
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
