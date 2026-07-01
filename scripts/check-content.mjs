#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const postsDir = join(root, 'content/posts');
const assetsDir = join(root, 'public/assets');
const requiredFrontmatter = ['title', 'author'];
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

for (const file of walk(postsDir).filter((path) => path.endsWith('.md'))) {
  const name = relative(postsDir, file);
  if (!/^\d{4}-\d{2}-\d{2} - [^/]+\.md$/.test(name)) {
    add(errors, file, 'filename must use "YYYY-MM-DD - post-slug.md"');
  }
  if (/^\d{4}-\d{2}-\d{2} - .+ - .+\.md$/.test(name)) {
    add(errors, file, 'filename should not include author; keep author in frontmatter only');
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
      add(errors, file, 'date belongs in the filename, not frontmatter');
    }
  }

  if (/\b(?:gratitude|thanks?)\s+to\s+for\b/i.test(text)) {
    add(errors, file, 'possible dropped imported link or mention text (found "to for")');
  }

  for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const [, alt, src] = match;
    if (!alt.trim()) add(warnings, file, `image has empty alt text: ${src}`);

    if (src.startsWith('/assets/')) {
      const assetPath = join(assetsDir, src.replace('/assets/', ''));
      if (!existsSync(assetPath)) add(errors, file, `missing asset: ${src}`);
    } else if (src.startsWith('assets/')) {
      add(errors, file, `relative asset path should start with /: ${src}`);
    }
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
