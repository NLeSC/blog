#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

const root = process.cwd();
const postsDir = join(root, 'content/posts');
const assetsDir = join(root, 'public/assets');
const requiredFrontmatter = ['title', 'author'];
const reservedTopLevelRoutes = new Set(['api', 'authors', 'posts', 'search', 'topics', 'rss.xml']);
const legacyRedirects = new Map();
const warnings = [];
const errors = [];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function add(kind, file, message) {
  kind.push(`${relative(root, file)}: ${message}`);
}

function checkImage(file, src, alt = 'html') {
  if (!alt.trim()) add(warnings, file, `image has empty alt text: ${src}`);

  if (src.startsWith('/assets/')) {
    const assetPath = join(assetsDir, src.replace('/assets/', ''));
    if (!existsSync(assetPath)) add(errors, file, `missing asset: ${src}`);
  } else if (src.startsWith('./')) {
    const assetPath = join(dirname(file), src);
    if (!existsSync(assetPath)) add(errors, file, `missing colocated asset: ${src}`);
  } else if (src.startsWith('assets/')) {
    add(errors, file, `relative asset path should start with / or ./: ${src}`);
  }
}

for (const file of walk(postsDir).filter((path) => path.endsWith('.md'))) {
  const name = basename(file);
  const postName = name === 'index.md' ? basename(dirname(file)) : name.replace(/\.md$/, '');
  if (!/^\d{4}-\d{2}-\d{2} - [^-].+$/.test(postName)) {
    add(errors, file, 'post path must use "YYYY-MM-DD - title.md" or "YYYY-MM-DD - title/index.md"');
  }

  const text = readFileSync(file, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    add(errors, file, 'missing frontmatter block');
  } else {
    for (const field of requiredFrontmatter) {
      if (!new RegExp(`^${field}:`, 'm').test(frontmatter[1])) {
        add(errors, file, `missing required frontmatter field: ${field}`);
      }
    }

    if (/^date:/m.test(frontmatter[1])) {
      add(errors, file, 'date belongs in filename, not frontmatter');
    }

    const sourceUrlMatch = frontmatter[1].match(/^source_url:\s*(.+)$/m);
    if (sourceUrlMatch) {
      const sourceUrl = sourceUrlMatch[1].trim().replace(/^['"]|['"]$/g, '');
      try {
        const legacyPath = new URL(sourceUrl).pathname.replace(/^\/+|\/+$/g, '');
        if (legacyPath) {
          const topLevel = legacyPath.split('/')[0];
          if (reservedTopLevelRoutes.has(topLevel)) {
            add(errors, file, `legacy redirect path conflicts with existing route: /${legacyPath}`);
          }

          const existing = legacyRedirects.get(legacyPath);
          if (existing) {
            add(errors, file, `duplicate legacy redirect path /${legacyPath} also used by ${relative(root, existing)}`);
          } else {
            legacyRedirects.set(legacyPath, file);
          }
        }
      } catch {
        add(errors, file, `invalid source_url: ${sourceUrl}`);
      }
    }
  }

  if (/\b(?:gratitude|thanks?)\s+to\s+for\b/i.test(text)) {
    add(errors, file, 'possible dropped imported link or mention text (found "to for")');
  }

  for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const [, alt, src] = match;
    checkImage(file, src, alt);
  }

  for (const match of text.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g)) {
    const [tag, src] = match;
    const alt = tag.match(/\balt=["']([^"']*)["']/)?.[1] || '';
    checkImage(file, src, alt);
  }
}

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length})`);
  for (const warning of warnings.slice(0, 50)) console.log(`  - ${warning}`);
  if (warnings.length > 50) console.log(`  … ${warnings.length - 50} more`);
}

if (errors.length) {
  console.error(`\nErrors (${errors.length})`);
  for (const error of errors.slice(0, 80)) console.error(`  - ${error}`);
  if (errors.length > 80) console.error(`  … ${errors.length - 80} more`);
  process.exit(1);
}

console.log('Content check passed.');
