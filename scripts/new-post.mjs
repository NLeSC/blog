#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function usage() {
  console.error('Usage: bun run new-post "Post title" --author "Author Name" [--date YYYY-MM-DD] [--tags tag1,tag2]');
  process.exit(1);
}

const args = process.argv.slice(2);
const title = args.find((arg) => !arg.startsWith('--'));
if (!title) usage();

function option(name, fallback = '') {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] || fallback : fallback;
}

const author = option('author');
if (!author) usage();

const date = option('date', new Date().toISOString().slice(0, 10));
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('--date must use YYYY-MM-DD');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 90);

const tags = option('tags')
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean);

const postsDir = join(process.cwd(), 'content', 'posts');
mkdirSync(postsDir, { recursive: true });
const filePath = join(postsDir, `${date} - ${slug}.md`);
if (existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`);
  process.exit(1);
}

const tagLines = tags.length ? tags.map((tag) => `  - ${tag}`).join('\n') : '  - uncategorized';
const content = `---\nlayout: post\ntitle: "${title.replaceAll('"', '\\"')}"\ndate: ${date}\nauthor: ${author}\npublished: false\ntags:\n${tagLines}\n---\n\nWrite the introduction here.\n\n<!--\nImage with caption pattern:\n\n<figure>\n  <img src="/assets/descriptive-file-name.png" alt="Short accessibility description of the image" />\n  <figcaption>Short visible caption. Add credit/source links here when needed.</figcaption>\n</figure>\n\nUse alt text for accessibility; use figcaption for the visible caption.\n-->\n`;

writeFileSync(filePath, content);
console.log(filePath);
